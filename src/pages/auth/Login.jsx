import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Link, Checkbox, FormControlLabel } from '@mui/material';
import Page from '../../components/Page';

const RootStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  padding: theme.spacing(6),
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const InputStyle = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <Page title="Login | Discord">
      <RootStyle>
        <ContentStyle>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5 }}>
            Welcome back!
          </Typography>

          <Typography variant="body2" align="center" sx={{ mb: 5 }}>
            We're so excited to see you again!
          </Typography>

          <form onSubmit={handleSubmit}>
            <InputStyle
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputStyle
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link href="#" variant="body2" sx={{ mb: 2, display: 'inline-block' }}>
              Forgot your password?
            </Link>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 3 }}
            >
              Log In
            </Button>

            <FormControlLabel
              control={<Checkbox />}
              label="Keep me logged in"
              sx={{ mb: 3 }}
            />

            <Typography variant="body2" align="center">
              Need an account? <Link href="/register">Register</Link>
            </Typography>
          </form>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}