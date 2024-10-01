import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Link, Checkbox, FormControlLabel ,Alert} from '@mui/material';
import Page from '../../components/Page';
import { signup ,clearSignupSuccess , setCredentials} from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const RootStyle = styled('div')(({ theme }) => ({
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
  backgroundColor: theme.palette.background.default,
}));

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

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error  , emailSent,signupSuccess ,isAuthenticated} = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => {
      dispatch(clearSignupSuccess());
    };
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    let intervalId;
    if (emailSent) {
      intervalId = setInterval(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          dispatch(setCredentials({ token }));
          clearInterval(intervalId);
        }
      }, 5000); // Check every 5 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [emailSent, dispatch]);

  const handleSubmit = (e) => {
    console.log(username, email, password, dob)
    e.preventDefault();
    if (agreeTerms) {
      dispatch(signup({ username, email, password, dob }))

    } else {
      // Handle case where user hasn't agreed to terms
      console.log('Please agree to the terms and conditions');
    }
  };

  if (emailSent) {
    return (
      <Page title="Check Your Email | Discord">
        <RootStyle>
          <ContentStyle>
            <Alert severity="success">
              Signup successful! Please check your email to verify your account.
              Once verified, you'll be automatically redirected to the dashboard.
            </Alert>
          </ContentStyle>
        </RootStyle>
      </Page>
    );
  }

  return (
    <Page title="Create an account | Discord">
      <RootStyle>
        <ContentStyle>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5, color: 'text.primary' }}>
            Create an account
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <InputStyle
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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

            <InputStyle
              fullWidth
              type="date"
              label="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            <FormControlLabel
              control={
                <Checkbox 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{ color: 'grey.500', '&.Mui-checked': { color: 'primary.main' } }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  I have read and agree to Discord's Terms of Service and Privacy Policy
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={loading || !agreeTerms}
              sx={{ mt: 2, mb: 3, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {loading ? 'Signing up...' : 'Continue'}
            </Button>

            <Link href="/login" variant="body2" sx={{ mb: 2, display: 'inline-block', color: 'primary.main' }}>
              Already have an account?
            </Link>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
              By registering, you agree to Discord's Terms of Service and Privacy Policy.
            </Typography>
          </form>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}