import React from 'react';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';

const IconButton = ({
  icon,
  tooltip,
  onClick,
  color,
  actionType,
  size = 'small',
  disabled = false,
  ...props
}) => {
  // Map action types to MUI colors
  const getMuiColor = () => {
    if (!actionType) return color || 'default';
    
    // Map action types to appropriate colors
    switch (actionType) {
      case 'view':
      case 'download':
      case 'copy':
        return 'default'; // Grey
      case 'edit':
      case 'notify':
        return 'info'; // Blue
      case 'approve':
      case 'accept':
        return 'success'; // Green
      case 'delete':
      case 'cancel':
      case 'reject':
        return 'error'; // Red
      default:
        return color || 'default';
    }
  };

  const muiColor = getMuiColor();

  // If no tooltip is provided, just return the icon button
  if (!tooltip) {
    return (
      <MuiIconButton
        color={muiColor}
        size={size}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {icon}
      </MuiIconButton>
    );
  }

  return (
    <Tooltip title={tooltip} arrow>
      <span>
        <MuiIconButton
          color={muiColor}
          size={size}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          {icon}
        </MuiIconButton>
      </span>
    </Tooltip>
  );
};

export default IconButton;