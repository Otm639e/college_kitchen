import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Navbar1() {
    const [id, setId] = useState("navbarState1");
    const newId = ()=> {
        if (id === "navbarState1") {
            return "navbar1";
        } else {
            return "navbarState1";
        }
    };
    return (
        <nav id={id}>
                <Link to="/" className="title"><h1>College Kitchen</h1></Link>              
                <Link to="/About">About</Link>              
                <Link to="/Home">Menu</Link>
                <div onClick={() => setId(newId())}> </div>
        </nav>
    );
}

export default Navbar1;