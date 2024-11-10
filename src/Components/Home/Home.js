import React from "react";
import {Link} from 'react-router-dom';
import './Home.css'
import Navbar from "../Navbar/Navbar";

function Home(){
    return (
        <div className="home-container">
            <Navbar />
            <div className="button-continer">
                <div className="button-group">
                    <p className="button-label"> New User?</p>
                    <Link to="/register" className="home-button primary"> Register</Link>
                </div>
                <div className="button-group">
                    <p className="button-label"> Already have an account?</p>
                    <Link to= "/login" className="home-button primary">Log-In</Link>
                </div>
            </div>
        </div>
    );
}
export default Home;