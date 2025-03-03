import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Stack
} from '@mui/material';
import { 
  Check, 
  Notifications,
  AccessTime 
} from '@mui/icons-material';

import Button from '../../atoms/Button/Button';
import StatusBadge from '../../atoms/StatusBadge/StatusBadge';

// Action button configurations
const ACTION_BUTTONS = {
  notify: {
    label: 'Notify Me on Arrival',
    icon: <Notifications fontSize="small" />,
    variant: 'secondary',
  }
};

const PaymentTracking = ({
  id,
  sender,
  amount,
  initiatedDate,
  expectedDate,
  reference,
  status,
  statusTimeline = [],
  actions = [],
  onActionClick,
  ...props
}) => {
  // Helper function to handle action button clicks
  const handleAction = (actionType) => {
    if (onActionClick) {
      onActionClick(actionType, id);
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        bgcolor: 'rgb(249, 250, 251)', 
        borderRadius: 2 
      }} 
      {...props}
    >
      {/* Header section with payment info */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            {sender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Initiated on {initiatedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expected arrival: {expectedDate}
          </Typography>
          {reference && (
            <Typography variant="body2" color="text.secondary">
              Ref: {reference}
            </Typography>
          )}
        </Box>
        <Box textAlign="right">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {amount}
          </Typography>
          <StatusBadge status={status} />
        </Box>
      </Box>
      
      {/* Timeline section - rebuilt to match screenshot */}
      <Box 
        sx={{ 
          bgcolor: 'white', 
          border: '1px solid rgb(229, 231, 235)', 
          borderRadius: 2,
          p: 3,
          mb: 2 
        }}
      >
        <Typography 
          sx={{ 
            fontSize: '16px',
            fontWeight: 500,
            color: 'text.primary',
            mb: 3
          }}
        >
          Payment Timeline
        </Typography>
        
        {/* Custom timeline implementation */}
        <Box sx={{ position: 'relative' }}>
          {statusTimeline.map((step, index) => {
            const isLast = index === statusTimeline.length - 1;
            
            return (
              <Box key={index} sx={{ position: 'relative' }}>
                {/* Timeline vertical line */}
                {!isLast && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      left: '11px',
                      top: '24px',
                      width: '2px',
                      height: '54px', // Fixed height between nodes
                      bgcolor: step.completed ? '#10b981' : '#d1d5db'
                    }}
                  />
                )}
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: isLast ? 0 : 4,
                    ml: 0
                  }}
                >
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: step.completed ? '#10b981' : '#d1d5db',
                      color: 'white',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    {step.completed ? <Check fontSize="small" /> : <AccessTime fontSize="small" />}
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary">
                      {step.date}
                    </Typography>
                    <Typography variant="body1" fontWeight={500} mt={0.5}>
                      {step.status}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      
      {/* Action buttons */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {actions.map((action) => {
          const config = ACTION_BUTTONS[action];
          if (!config) return null;
          
          return (
            <Button
              key={action}
              variant={config.variant}
              startIcon={config.icon}
              onClick={() => handleAction(action)}
              sx={{
                color: '#f44336',
                borderColor: '#f44336',
                '&:hover': {
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  bgcolor: 'rgba(244, 67, 54, 0.04)'
                }
              }}
            >
              {config.label}
            </Button>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default PaymentTracking;