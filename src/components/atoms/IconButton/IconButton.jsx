import { IconButton as MuiIconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

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
          sx={{ color: muiColor }}
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

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  actionType: PropTypes.oneOf([
    'view',
    'download',
    'copy',
    'edit',
    'notify',
    'approve',
    'accept',
    'delete',
    'cancel',
    'reject'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
};

export default IconButton;