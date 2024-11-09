import Navbar from "./Components/Navbar/Navbar";

function Home() {
    return(
        
        <div>
            
            <Navbar></Navbar>

            <main style={{ marginTop: '80px' }}> {/* Adjust this value based on your navbar height */}
        <h1>Home Page</h1>
        
      </main>
            
        </div>
    );
}
export default Home;