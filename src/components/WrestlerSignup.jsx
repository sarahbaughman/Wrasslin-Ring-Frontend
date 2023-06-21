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
// import SwitchLabel from './SwitchLabel'
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

function WrestlerSignup() {
    const { user, setUser } = useContext(UserContext);

    const submitNewUser = (event) => {
        event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newUser = {
        name: data.get('name'),
        regions: data.get('regions'),
        weight: data.get('weight'),
        phone: data.get('phone'),
        email: data.get('email'),
        instagram: data.get('instagram'),
        payment: data.get('payment'),
        username: data.get('username'),
        password: data.get('password'),
        image: data.get('image'),
        role: "wrestler"
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
            {/* <SwitchLabel/> */}
            <Typography component="h1" variant="h5">
                Wrestler Sign Up
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

                <Grid item xs={12}>
                    <TextField
                    // required
                    fullWidth
                    name="instagram"
                    label="Instagram @"
                    type="instagram"
                    id="instagram"
                    autoComplete="instagram"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    // required
                    fullWidth
                    name="regions"
                    label="Regions Where You Wrestle"
                    type="regions"
                    id="regions"
                    autoComplete="new-password"
                    />
                </Grid>
            
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="weight"
                    label="Weight (lbs)"
                    type="weight"
                    id="weight"
                    autoComplete="new-password"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="image"
                    label="Wrestler Image (provide weblink)"
                    type=""
                    id="image"
                    autoComplete="image"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="payment"
                    label="Payment (enter Venmo, Cashapp, etc. Username)"
                    type=""
                    id="payment"
                    autoComplete="payment"
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

export default WrestlerSignup