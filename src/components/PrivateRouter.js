import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleAuthProvider";

const PrivateRouter = ({component: Component, ...rest}) => {
    const { isSignedIn, isInitialized } = useGoogleAuth();
    return (
        isInitialized && (
        <Route {...rest} render={props => (
            isSignedIn ?
                <Component {...props} />
            : <Redirect to="/Signin" />
        )} />
        )
    );
};

export default PrivateRouter;