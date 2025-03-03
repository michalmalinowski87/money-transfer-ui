'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/atoms/Button/Button';
import FormField from '../../components/atoms/FormField/FormField';
import Card from '../../components/atoms/Card/Card';

const LoginForm = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const LoadingButton = styled(Button)(({ theme }) => ({
  position: 'relative',
}));

const SpinnerWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
}));

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!username) {
      setError('Please select a user type');
      return;
    }
    setIsLoading(true);
    
    try {
      // Adding a slight delay to simulate network request
      // In a real app, this would be the actual login API call time
      setTimeout(() => {
        const success = login(username, password);
        
        if (!success) {
          setError('Invalid credentials');
          setIsLoading(false);
        }
        // No need to reset loading state on success since we'll redirect
      }, 1000);
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <LockOutlined fontSize="large" sx={{ color: 'white' }} />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography color="textSecondary" variant="body2" align="center" sx={{ mt: 1 }}>
            Select your user role to access the payments application
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
            {error}
          </Alert>
        )}
        <LoginForm component="form" onSubmit={handleSubmit} noValidate>
          <FormField
            id="user-type"
            label="User Type"
            type="select"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            selectOptions={['', 'initiator', 'approver', 'receiver']}
            optionLabels={{
              '': 'Select a user type',
              'initiator': 'Payment Initiator',
              'approver': 'Payment Approver',
              'receiver': 'Payment Receiver'
            }}
            required
            fullWidth
            disabled={isLoading}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Any password will work for this demo"
            required
            fullWidth
            disabled={isLoading}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="primary"
            sx={{ mt: 3, mb: 2, minHeight: '37px' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerWrapper>
                <CircularProgress size={24} color="inherit" />
              </SpinnerWrapper>
            ) : 'Sign In'}
          </LoadingButton>
        </LoginForm>
      </Card>
    </Container>
  );
}