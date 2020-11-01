// login.js

// Material UI components
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import firebase from "firebase"
import config from '../util/config'



const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progess: {
        position: 'absolute'
    }
});




class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false,

        };
    }



  /*  componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }*/

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

   handleGoogleLogin= async (event)=> {
        event.preventDefault();

    try {
        this.setState({loading: true});




       await firebase.initializeApp(config);
        const provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider)
            .then((response) => {
                console.log('successfull loged in ', response.user.displayName);
                var id_token = response.user.getIdToken();
                localStorage.setItem('AuthToken', `Bearer ${response.credential.accessToken}`);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((error) => { console.error('there was an error signing in:', error)
                return null;})

    }
       catch (error) {
            console.error(error);

        }
    }


    googleSignout = () => {
        console.log("in signout");
        firebase.auth().signOut()
            .then(() => {
                    console.log('logout successful');

                }
            )
            .catch((error) => console.error("there was an error signin out"));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post('https://us-central1-youcanvote-5be45.cloudfunctions.net/api/login', userData)
            .then((response) => {

                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                if(error.response  && error.response.data){
                this.setState({
                    errors: error.response.data,
                    loading: false
                });}
                else { console.log( error)}
            });
    };




    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Button variant="contained"  color="primary"  onClick={this.handleGoogleLogin}>sign in with Google</Button>
                    <Button variant="contained"  color="secondary"  onClick={() => this.googleSignout}> sign out with Google</Button>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            disabled={loading || !this.state.email || !this.state.password}
                        >
                            Sign In
                            {loading && <CircularProgress size={30} className={classes.progess} />}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                    </form>
                </div>
            </Container>
        );
    }
}


export default withStyles(styles)(login);
