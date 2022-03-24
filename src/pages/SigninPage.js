import React from 'react';
import SigninButton from '../components/SigninButton';
import {Link} from 'react-router-dom';


function SigninPage() {
    return (
        <div id="signin-page">
            <div>
                <h2>Signin</h2>
                <SigninButton/>
                <Link id="back" to="/"> Back </Link>
            </div>
        </div>
    )
}

export default SigninPage;