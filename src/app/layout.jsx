'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container, 
  CssBaseline,
  ThemeProvider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LogoutOutlined, Person } from '@mui/icons-material';
import Image from 'next/image';
import { AuthProvider } from '../contexts/AuthContext';
import theme from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #f44336 0%, #ff7043 100%)',
  boxShadow: 'none',
}));

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  marginTop: 'auto',
  backgroundColor: theme.palette.grey[900],
  color: 'white',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const Header = () => {
  const { user, logout } = useAuth();

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  return (
    <GradientAppBar position="static">
      <Toolbar>
        <LogoContainer sx={{ flexGrow: 1 }}>
          <Image
            src="/images/logo.svg"
            alt="Vitesse Payments"
            width={201}
            height={30}
            priority
          />
        </LogoContainer>
        {user && (
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={handleUserMenuOpen}
              color="inherit"
              size="large"
              edge="end"
              aria-label="user account"
              aria-haspopup="true"
            >
              <Person />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                <Typography variant="body2">
                  Logged in as: <strong>{user?.name}</strong>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </GradientAppBar>
  );
};

// Footer component
const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2025 Vitesse Payments. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1, color: 'grey.500' }}>
          Trusted by the world's leading insurance companies
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Vitesse Payments System</title>
        <meta name="description" content="Faster payments, safer capital, smarter treasury" />
        <link href="https://cdn.prod.website-files.com/65f186b3e59bbc5818e7cc63/65f18a1411724e22bdbc27de_Vitesse-Favicon.png" rel="shortcut icon" type="image/x-icon"></link>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'grey.50',
              }}
            >
              <Header />
              <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {children}
              </Container>
              <Footer />
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}