import { 
  Visibility,
  Edit,
  Delete,
  Cancel,
  Download,
  ContentCopy,
  Notifications
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import IconButton from '../../atoms/IconButton/IconButton';
import StatusBadge from '../../atoms/StatusBadge/StatusBadge';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgb(249, 250, 251)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const PaymentDetailsStyled = styled(Box)(() => ({
  flexGrow: 1,
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
}));

// Action button configurations with semantic action types
const ACTION_CONFIG = {
  view: {
    icon: <Visibility fontSize="small" />,
    tooltip: 'View Details',
    actionType: 'view'
  },
  edit: {
    icon: <Edit fontSize="small" />,
    tooltip: 'Edit',
    actionType: 'edit'
  },
  delete: {
    icon: <Delete fontSize="small" />,
    tooltip: 'Delete',
    actionType: 'delete'
  },
  cancel: {
    icon: <Cancel fontSize="small" />,
    tooltip: 'Cancel',
    actionType: 'cancel'
  },
  download: {
    icon: <Download fontSize="small" />,
    tooltip: 'Download',
    actionType: 'download'
  },
  copy: {
    icon: <ContentCopy fontSize="small" />,
    tooltip: 'Copy Reference',
    actionType: 'copy'
  },
  notify: {
    icon: <Notifications fontSize="small" />,
    tooltip: 'Get Notified',
    actionType: 'notify'
  }
};

const PaymentItem = ({
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{paymentItem.recipient || paymentItem.sender || 'N/A'}</Typography>
          <StatusBadge status={paymentItem.status} />
        </Box>
        <PaymentDetailsStyled>
          <SecondaryText>
            {paymentItem.amount || 'N/A'} • {paymentItem.date || 'N/A'}
          </SecondaryText>
          {paymentItem.reference && <SmallText>Ref: {paymentItem.reference}</SmallText>}
          {paymentItem.method && <SmallText>Via: {paymentItem.method}</SmallText>}
          {paymentItem.approver && <SmallText>Approved by: {paymentItem.approver}</SmallText>}
          {paymentItem.reason && <SmallText>Reason: {paymentItem.reason}</SmallText>}
        </PaymentDetailsStyled>
      </Box>
      <Stack direction="row" spacing={0} alignItems="center">
        <Stack direction="row" spacing={0.5}>
          {actions.map((action) => {
            const config = ACTION_CONFIG[action];
            if (!config) return null;
            
            return (
              <IconButton
                key={action}
                icon={config.icon}
                tooltip={config.tooltip}
                actionType={config.actionType}
                onClick={() => handleAction(action)}
                size="small"
              />
            );
          })}
        </Stack>
      </Stack>
    </StyledPaper>
  );
};

PaymentItem.propTypes = {
  id: PropTypes.string.isRequired,
  paymentItem: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  onActionClick: PropTypes.func,
};

export default PaymentItem;