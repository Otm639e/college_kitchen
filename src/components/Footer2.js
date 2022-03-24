import React from 'react';
import SignoutButton from './SignoutButton';
import {Link} from 'react-router-dom';

function Footer2 () {

    return (
        <div id="footer2">
            <Link to="/Home">Home</Link>
            <Link to="/About">About</Link>
            <Link to="/">MainPage</Link>
            <Link to="/#footer">Contact</Link>
            <Link to="/">Terms of use</Link>
            <Link to="/">Private Policy</Link>
            <SignoutButton/>
        </div>
    );
}


export default Footer2;