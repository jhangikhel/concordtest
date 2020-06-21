import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from './TreeStructure';
import { Snackbar } from '@material-ui/core';
import { users } from './Users';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();
    let history = useHistory();
    const [account, setAccount] = useState({ userName: '', password: '', isValid: false });
    const [openSnack, setOpenSanck] = React.useState(false);
    const validateUser = (e) => {
        if (account.userName && account.password) {
            const result = users.some(user => user.userName.toLowerCase() === account.userName && user.password === account.password);
            if (result) {
                setAccount({ ...account, isValid: true, message: "Redirect to Tree View" });
                localStorage.setItem("userName", account.userName);
                history.push('/treeView');
            }
            else {
                setAccount({ ...account, isValid: false, message: "User and Password Cant be Matched" });
            }
        }
        else if (!account.userName) {
            setAccount({ ...account, isValid: false, message: "User Name can't be empty" });
        }
        else {
            setAccount({ ...account, isValid: false, message: "Password can't be empty" });
        }
        handleSnackClick();
        e.preventDefault();
    }
    const onChangeHandler = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }
    const handleSnackClick = () => {
        setOpenSanck(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSanck(false);
    };
    return (
        <Grid container component="main" className={classes.root}>
            <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={account.isValid ? "success" : "error"} >
                    {account.message}
                </Alert>

            </Snackbar>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                            value={account.userName}
                            onChange={onChangeHandler}
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
                            value={account.password}
                            onChange={onChangeHandler}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={validateUser}
                        >
                            Sign In
            </Button>

                    </form>
                </div>
            </Grid>
        </Grid>
    );
}