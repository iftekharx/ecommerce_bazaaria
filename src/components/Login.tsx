import React, { useState } from 'react'
import {
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Alert,
  Button,
  FormGroup,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigate('/products')
        console.log(user.email)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setMessage(errorMessage)
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            maxWidth: 'md',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffff',
            border: '2px solid black',
          }}
        >
          <Typography component="h1" variant="h5" color={'black'}>
            Login
          </Typography>
          <Grid
            container
            component="form"
            onSubmit={(event: React.FormEvent) => {
              onLogin(event)
            }}
            spacing={5}
            sx={{ mt: 1, p: 5 }}
          >
            <Grid item xs={12} md={12}>
              <Alert severity="info">{message}</Alert>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                id="email"
                type="email"
                label="email"
                value={email}
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: 'white' }}
                InputLabelProps={{
                  style: { color: 'darkblue' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Password: "
                type="password"
                value={password}
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                sx={{ backgroundColor: 'white' }}
                InputLabelProps={{
                  style: { color: 'darkblue' },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'darkred', mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/login">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: 'darkgrey', mt: 3, mb: 2 }}
                >
                  Go Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Grid item xs={12} md={4}>
          <Link to="/signup">
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: 'orange', mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Container>
    </div>
  )
}

export default Login
