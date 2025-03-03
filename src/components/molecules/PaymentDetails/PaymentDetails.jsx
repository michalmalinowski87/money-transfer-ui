import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ThumbUp, 
  ThumbDown, 
  Edit 
} from '@mui/icons-material';
import Button from '../../atoms/Button/Button';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgb(249, 250, 251)',
  borderRadius: '8px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const DetailBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  border: '1px solid rgb(229, 231, 235)',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const DetailRow = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.primary,
}));

// Action button configurations
const ACTION_BUTTONS = {
  approve: {
    label: 'Approve',
    icon: <ThumbUp fontSize="small" />,
    variant: 'success',
  },
  reject: {
    label: 'Reject',
    icon: <ThumbDown fontSize="small" />,
    variant: 'danger',
  },
  edit: {
    label: 'Edit Details',
    icon: <Edit fontSize="small" />,
    variant: 'secondary',
  },
};

const PaymentDetails = ({
  id,
  paymentItem,
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
    <StyledPaper elevation={0} {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="h6" fontWeight={500} mb="0">
            {paymentItem.recipient || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Initiated by {paymentItem.initiator || 'N/A'} on {paymentItem.date || 'N/A'}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={600}>
          {paymentItem.amount || 'N/A'}
        </Typography>
      </Box>
      
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Payment Method
          </Typography>
          <Typography variant="body1">
            {paymentItem.method || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Reference
          </Typography>
          <Typography variant="body1">
            {paymentItem.reference || 'N/A'}
          </Typography>
        </Grid>
      </Grid>
      {Object.entries(paymentItem.details).length > 0 && (
        <DetailBox>
          <SectionTitle>Payment Details</SectionTitle>
          {Object.entries(paymentItem.details).map(([key, value]) => (
            <DetailRow container key={key}>
              <Grid item xs={6}>
                <DetailLabel>{key}:</DetailLabel>
              </Grid>
              <Grid item xs={6}>
                <DetailValue>{value}</DetailValue>
              </Grid>
            </DetailRow>
          ))}
        </DetailBox>
      )}
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
            >
              {config.label}
            </Button>
          );
        })}
      </Stack>
    </StyledPaper>
  );
};

export default PaymentDetails;