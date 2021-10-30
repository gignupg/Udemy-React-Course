import React, { useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, TextField, Button, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';
import authContext from '../../context/auth/authContext';

export default function Login() {

    const { setToken, setUser } = useContext(authContext);

    const theme = useTheme();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async e => {
        e.preventDefault();

        const { email, password } = input;

        if (!email.trim() || !password.trim()) return setError("Fields can not be left empty!");

        try {
            const response = await axiosClient.post('/api/auth/login', { email, password });
            const { token, user } = response.data;

            setToken(token);
            setUser(user);

        } catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <Box height="100vh" bgcolor="primary.main" display="flex" justifyContent="center" alignItems="center">
            <Paper style={{ width: "400px" }} elevation={3}>
                <form onSubmit={submitHandler} style={{ margin: 0 }}>
                    <Grid container direction="column" alignItems="center" spacing={4}>
                        <Grid item className="my-3">
                            <Typography variant="h4" color="primary">Start Session</Typography>
                        </Grid>
                        {error && <Typography
                            color="error"
                            style={{ marginBottom: theme.spacing() * 2, marginTop: -theme.spacing() * 2 }}
                        >{error}</Typography>}
                        <TextField
                            type="email"
                            className="col-8"
                            label="Email"
                            name="email"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            onChange={changeHandler}
                        />
                        <TextField
                            type="password"
                            className="col-8"
                            label="Password"
                            name="password"
                            variant="outlined"
                            color="primary"
                            style={{ width: "80%", marginBottom: theme.spacing() * 2 }}
                            onChange={changeHandler}
                        />
                        <Grid item>
                            <Button type="submit" color="primary" size="large" variant="contained">Log in</Button>
                        </Grid>
                        <Grid container item justify="flex-start" className="ml-3 mb-2">
                            <Link to={'/registration'} color='primary'>
                                Create a new Account
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
