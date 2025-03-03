import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  type = 'button',
  ...props
}) => {
  // Map our variant names to MUI colors and variants
  const getConfig = () => {
    switch (variant) {
      case 'primary':
        return { color: 'primary', muiVariant: 'contained' };
      case 'secondary':
        return { color: 'secondary', muiVariant: 'outlined' };
      case 'info':
        return { color: 'info', muiVariant: 'contained' };
      case 'success':
        return { color: 'success', muiVariant: 'contained' };
      case 'danger':
        return { color: 'error', muiVariant: 'contained' };
      default:
        return { color: 'primary', muiVariant: 'contained' };
    }
  };

  const { color, muiVariant } = getConfig();

  return (
    <MuiButton
      variant={muiVariant}
      color={color}
      size={size}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      disableElevation
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;