import React from 'react';
import { useGoogleAuth } from './GoogleAuthProvider';

const SignoutButton = () => {
    const { signOut } = useGoogleAuth();

    return (
        <h6 onClick={signOut} id="signoutbtn">Logout</h6>
      );
};

export default SignoutButton;