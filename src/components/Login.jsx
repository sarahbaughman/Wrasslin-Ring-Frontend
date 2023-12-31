import React, { useState, useContext } from "react";
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Redirect} from 'react-router-dom'
import { Link} from 'react-router-dom';
import './login.css'
// import Header from "./Header"


import { UserContext } from './../context/UserContext';

// function Copyright(props) {
//     return (
//       <div >
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" to = "https://mui.com/" href="https://mui.com/">
//           Wrasslin' Ring
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//       </div>
//     );
//   }

const defaultTheme = createTheme();

function Login() {
    const { user, setUser} = useContext(UserContext);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const submitLogin = (event) => {
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({username, password}),   
        })
        .then(r => r.json())
        .then(user => setUser(user))

        const data = new FormData(event.currentTarget);
    };

    if (user){
        return <Redirect to='/dashboard'/>
    }


return (
  <div className = 'sign-in-div'>

    {/* <ThemeProvider theme={defaultTheme}> */}
        <Container className = 'signup-container' component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={submitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              className = 'text-field'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className = 'text-field'
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link  style = {{color:'white'}}to='/createnewaccount' href="createnewaccount" variant="body2">
                  {"Don't have an account? Click to Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    {/* </ThemeProvider> */}
    
    </div>
  );
}

export default Login