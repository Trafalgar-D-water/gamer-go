import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import Page from '../../components/Page';
import { setCredentials } from '../../redux/slices/authSlice';

// ... (RootStyle and ContentStyle remain the same)
const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    padding: theme.spacing(6),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#36393F',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }));

export default function EmailVerification() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    console.log('Extracted Token:', token);

    if (token) {
      console.log('This is my token from front end', token);
      
      axios
        .get(`http://localhost:3004/api/user/verify-email?token=${token}`)
        .then((response) => {
          console.log('This is my response', response);
          const { user, token: jwtToken } = response.data;
          console.log('This is my token from backend', jwtToken);
          localStorage.setItem('jwtToken', jwtToken);

          dispatch(setCredentials({ user, token: jwtToken }));
          
          setMessage('Email verified successfully! Redirecting to dashboard...');
          setLoading(false);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        })
        .catch((error) => {
          setMessage(
            error.response ? error.response.data.message : 'Verification failed.'
          );
          setLoading(false);
        });
    } else {
      setMessage('Invalid verification link.');
      setLoading(false);
    }
  }, [location.search, navigate, dispatch]);

  return (
    <Page title="Email Verification | Discord">
      <RootStyle>
        <ContentStyle>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h6" color="#FFFFFF">
              {message}
            </Typography>
          )}
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}









