const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://webprojectdbemail:YinkTfON31NwxG0k@webprojectcluster.tjary.mongodb.net/ultimatetodolistDB?retryWrites=true&w=majority&appName=webprojectcluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Test MongoDB connection
app.get('/ping', async (req, res) => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    res.status(200).json({ message: 'MongoDB connected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to connect to MongoDB' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    //connect to the db
    const db = client.db('ultimatetodolistDB');
    const usersCollection = db.collection('users');

    //check if user with the same email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //hash the password w bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the new user document
    const newUser = {
      email,
      password: hashedPassword,
    };

    //insert the new user into the users collection
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

//login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = client.db('ultimatetodolistDB');
    const usersCollection = db.collection('users');

    //find the user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //generate a JWT - valid for 2 hours
    const token = jwt.sign({ userId: user._id, email: user.email }, 'secret_jwt_secret', { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

//addtask endpoint
app.post('/addTask', async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    console.log(token); 
    if(!token){
      return req.status(401).json({message: ' Authentication token is missing'});
    }

    const decode = jwt.verify(token, 'secret_jwt_secret' );
    console.log('Decoded Token', decode);
    const userId = decode.userId;
    console.log('extracted userID', userId);
    const { name, desc, end, priority, reminder } = req.body;

    //connect to the db
    const db = client.db('ultimatetodolistDB');
    const tasksCollection = db.collection('tasks');

    //task doc
    const newTask = {
      name,
      desc,
      end, 
      priority, 
      reminder, 
      createdBy: userId
    };

    //insert the new user into the users collection
    await tasksCollection.insertOne(newTask);

    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add Task:(' });
  }
});

//get user tasks endpoint
app.get('/getUserTasks', async (req, res) => {
  try{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token ){
      return res.status(401).json({ message: 'Authentication token is missing'});
    }

    const decode = jwt.verify(token, 'secret_jwt_secret'); 
    const userId = decode.userId;


    const db = client.db('ultimatetodolistDB');
    const tasksCollection = db.collection('tasks');

    const userTasks = await tasksCollection.find({ createdBy: userId}).toArray(); 

    res.status(200).json(userTasks);



  } catch{
    console.error('Error fetching user tasks:', error);
    res.status(500).json({message: 'Failed to fetch tasks.'});
  }
})

//delete endpoint
app.delete('/deleteTask/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decode = jwt.verify(token, 'secret_jwt_secret');
    const userId = decode.userId;
    const taskId = req.params.id;

    const db = client.db('ultimatetodolistDB');
    const tasksCollection = db.collection('tasks');

    // Ensure the task belongs to the authenticated user
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId), createdBy: userId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete the task' });
  }
});

//edit task endpoint
app.put('/editTask/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, 'secret_jwt_secret');
    const userId = decoded.userId;
    const taskId = req.params.id;

    const { name, desc, end, priority } = req.body;

    const db = client.db('ultimatetodolistDB');
    const tasksCollection = db.collection('tasks');

    //ensure the task belongs to the authenticated user
    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(taskId), createdBy: userId },
      {
        $set: {
          name,
          desc,
          end,
          priority,
        },
      }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ message: 'Failed to edit the task' });
  }
});


