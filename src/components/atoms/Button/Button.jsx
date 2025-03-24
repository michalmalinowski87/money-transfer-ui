import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

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

  const { muiVariant } = getConfig();

  const StyledButton = styled(MuiButton)(({ theme, color }) => ({
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    minWidth: '120px',
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
        sx: { color: color }
      },
    },
  }));

  return (
    <StyledButton
      variant={muiVariant}
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
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;