import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './Style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { signin, signup } from '../../actions/auth.js';

const initialState = { firstName: '', lastName: '', password: '', confirmPassword: '' };

export const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setformData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            console.log("done dispatching");
            dispatch(signin(formData, history))

        }
    };
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {

        const result = res.profileObj;
        const token = res.tokenId;
        try {
            console.log("success");
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("google Sign in was unsuccessful");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }

                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="607215780357-1i0o0ji2o8pitifpg0798hae5i19b9g4.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained" >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"

                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
