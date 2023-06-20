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

const Signup = () => {
  const [message, setMessage] = useState('...')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message
        setMessage(errorMessage)
        // ..
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
            Sign up
          </Typography>
          <Grid
            container
            component="form"
            onSubmit={(event: React.FormEvent) => {
              handleSubmit(event)
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
                value={pass}
                autoComplete="password"
                onChange={(e) => setPass(e.target.value)}
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
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/">
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
      </Container>
    </div>
  )
}

export default Signup
