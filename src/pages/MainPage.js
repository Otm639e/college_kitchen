import React from 'react';
import Navbar from '../components/Navbar1';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useGoogleAuth } from "../components/GoogleAuthProvider";

function MainPage() {
    const { isSignedIn } = useGoogleAuth();
    if (isSignedIn) {
        return (
            <div className="mainpage">
            <div className="button-space">
                <p id="signed-in-text">Signed in</p>
            </div>
            <Navbar/>
            <Footer/>
        </div>
        )
    }
    return(
        <div className="mainpage">
            <div className="button-space">
                <Link to="/Signin" id="sign-in">Login</Link>
            </div>
            <Navbar/>
            <Footer/>
        </div>
    )
};

export default MainPage;