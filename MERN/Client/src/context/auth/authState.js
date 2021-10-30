import React, { useState, useEffect } from 'react';
import authContext from './authContext';
import axiosClient from '../../config/axios';
import tokenInHeader from '../../config/tokenInHeader';

const ProjectState = props => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const getAuthenticatedUser = async () => {
        try {
            await axiosClient.get('/api/auth/user-info');

        } catch (err) {
            console.log(err);
            setToken("");
            setUser(null);
        }
    };

    useEffect(() => {
        localStorage.setItem('token', token);
        tokenInHeader(token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <authContext.Provider
            value={{
                token,
                user,
                setToken,
                setUser,
                getAuthenticatedUser
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default ProjectState;