const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

