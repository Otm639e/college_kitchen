import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleAuthProvider";

const PublicRouter = ({component: Component, restricted, ...rest}) => {
    const { isSignedIn, isInitialized } = useGoogleAuth();
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isInitialized && (
            isSignedIn && restricted ?
                <Redirect to="/Home" />
            : <Component {...props} />
            )
        )} />
    );
};

export default PublicRouter;