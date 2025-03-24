'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';

// Root page - redirects to appropriate dashboard or login
export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If not loading and we have a user, redirect to their dashboard
    if (!loading) {
      if (user) {
        router.push(`/${user.role}`);
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Show loading spinner while redirecting
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Redirecting...</Typography>
    </Box>
  );
}