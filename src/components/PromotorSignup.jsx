import React, {useContext} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SettingsBackupRestoreRounded } from "@mui/icons-material";
import { UserContext } from '../context/UserContext';
import {Redirect} from 'react-router-dom'




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Wrasslin' Ring
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
    }

const defaultTheme = createTheme();

function PromotorSignup() {
    const { user, setUser } = useContext(UserContext);

    const submitNewUser = (event) => {
        event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newUser = {
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        username: data.get('username'),
        password: data.get('password'),
        role: "promotor"
    }

        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON. stringify(newUser),
        })
        .then (r => r.json())
        .then(user => setUser(user))
    };

    console.log("Current user")
    console.log(user)

    if (user){
            return <Redirect to='/dashboard'/>
        }
    
    return (

        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
                Promotor Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={submitNewUser} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Wrestler Name"
                    autoFocus
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    // required
                    fullWidth
                    name="phone"
                    label="Phone (Format: xxx-xxx-xxxx )"
                    type="phone"
                    id="phone"
                    autoComplete="phone"
                    />
                </Grid>


                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
    );
}

export default PromotorSignup