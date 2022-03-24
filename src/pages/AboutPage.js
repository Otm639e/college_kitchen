import React from 'react';
import Navbar from '../components/Navbar1';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useGoogleAuth } from "../components/GoogleAuthProvider";

function AboutPage() {
    const { isSignedIn } = useGoogleAuth();
    if (isSignedIn) {
        return (
            <div className="aboutpage">
            <div className="button-space">
                <p id="signed-in-text">Signed in</p>
            </div>
            <div id="my-reason">
                <h1> Share your culinary talents to the world </h1>
                <div>
                    <p> As a college student, I know how stressful studying alone can be. Now imagine not knowing how to cook and not being able to afford a meal plan (That’s Me)! This is why I ask anyone who would be willing to provide affordable and delicious food recipes to please help out! </p>
                </div>
            </div>
            <Navbar/>
            <Footer/>
        </div>
        )
    }
    return (
        <div className="aboutpage">
            <div className="button-space">
                <Link to="/Signin" id="sign-in">Login</Link>
            </div>
            <div id="my-reason">
                <h1> Share your culinary talents to the world </h1>
                <div>
                    <p> As a college student, I know how stressful studying alone can be. Now imagine not knowing how to cook and not being able to afford a meal plan (That’s Me)! This is why I ask anyone who would be willing to provide affordable and delicious food recipes to please help out! </p>
                </div>
            </div>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default AboutPage;