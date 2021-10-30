import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PublicRoute = ({ component: Component }) => {

    const { user } = useContext(authContext);

    return (
        <Route render={() => user ? (
            <Redirect to="/" />
        ) : (
                <Component />
            )} />
    );
};

export default PublicRoute;

