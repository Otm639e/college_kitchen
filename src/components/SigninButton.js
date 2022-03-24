import React from 'react';
import { useGoogleAuth } from './GoogleAuthProvider';

const SigninButton = () => {

    const { signIn } = useGoogleAuth();

    return (
        <button onClick={signIn}></button>
      );
};

export default SigninButton;









//const clientID = "811899914639-fvblag6irfcvgoeel9fo4e3dkrcl21l9.apps.googleusercontent.com";
