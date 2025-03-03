import React from 'react';
import { Chip } from '@mui/material';
import { 
  CheckCircle,
  Error,
  HourglassEmpty,
  Edit,
  WarningAmber
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Status configurations
const STATUS_CONFIG = {
  completed: {
    icon: <CheckCircle fontSize="small" />,
    color: 'success',
    label: 'Completed'
  },
  pending: {
    icon: <HourglassEmpty fontSize="small" />,
    color: 'warning',
    label: 'Pending'
  },
  processing: {
    icon: <HourglassEmpty fontSize="small" />,
    color: 'info',
    label: 'Processing'
  },
  approved: {
    icon: <CheckCircle fontSize="small" />,
    color: 'success',
    label: 'Approved'
  },
  rejected: {
    icon: <Error fontSize="small" />,
    color: 'error',
    label: 'Rejected'
  },
  draft: {
    icon: <Edit fontSize="small" />,
    color: 'default',
    label: 'Draft'
  }
};

const StyledChip = styled(Chip)(({ theme, statuscolor }) => ({
  fontWeight: 500,
  fontSize: '12px',
  '& .MuiChip-icon': {
    marginLeft: theme.spacing(0.5),
  }
}));

const StatusBadge = ({ 
  status, 
  customLabel, 
  size = 'small',
  ...props 
}) => {
  // Get status configuration or use default
  const config = STATUS_CONFIG[status] || {
    icon: <WarningAmber fontSize="small" />,
    color: 'default',
    label: status
  };
  
  // Use custom label if provided
  const label = customLabel || config.label;
  
  return (
    <StyledChip
      icon={config.icon}
      label={label}
      color={config.color}
      size={size}
      statuscolor={status}
      {...props}
    />
  );
};

export default StatusBadge;