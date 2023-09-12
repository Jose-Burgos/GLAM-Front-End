import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

interface SignUpForm {
  username: string
  first_name: string
  last_name: string
  identification: string
  email: string
  password: string
}

export const SignUp = () => {
  const init_form: SignUpForm = {
    username: '',
    first_name: '',
    last_name: '',
    identification: '',
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(init_form)

  const handleChange = (e: any) => {
    const { name: key, value } = e.target
    // console.log(key, value)
    setFormData((prevData: SignUpForm) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, first_name, last_name, identification, email, password } = formData
    console.log(formData)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name,
          last_name,
          identification,
        },
      },
    })

    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                name="first_name"
                variant="outlined"
                fullWidth
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                name="last_name"
                variant="outlined"
                fullWidth
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="DNI"
                name="identification"
                variant="outlined"
                fullWidth
                required
                value={formData.identification}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body2" align="center">
          Already have an account? <a href="/login">Log In</a>
        </Typography>
      </Grid>
    </Grid>
  )
}
