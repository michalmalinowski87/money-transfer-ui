'use client';

import { 
  Box, 
  Typography, 
  Stack,
  Divider
} from '@mui/material';

import Button from '../../../components/atoms/Button/Button';
import { PAYMENT_METHODS, COUNTRIES } from '../../../lib/constants';
import { getFormattedAmount } from '../../../lib/utils';

const Review = ({ paymentData, onBack, onSubmit }) => (
  <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>
      Review Payment
    </Typography>
    
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Payment Amount
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          {getFormattedAmount({ amount: paymentData.basicInfo.amount, currency: paymentData.basicInfo.currency })}
        </Typography>
        {paymentData.basicInfo.description && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {paymentData.basicInfo.description}
          </Typography>
        )}
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Recipient
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {paymentData.recipient.name}
        </Typography>
        {paymentData.recipient.email && (
          <Typography variant="body2">
            {paymentData.recipient.email}
          </Typography>
        )}
        <Typography variant="body2">
          {paymentData.recipient.country}
        </Typography>
      </Box>
      
      <Divider />
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Payment Method
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {paymentData.paymentMethod.type === PAYMENT_METHODS.BANK_TRANSFER && 'Bank Transfer'}
          {paymentData.paymentMethod.type === PAYMENT_METHODS.CREDIT_CARD && 'Credit Card'}
          {paymentData.paymentMethod.type === PAYMENT_METHODS.PAYPAL && 'PayPal'}
        </Typography>
        
        {paymentData.paymentMethod.type === PAYMENT_METHODS.BANK_TRANSFER && (
          <Box sx={{ mt: 1 }}>
            {paymentData.recipient.country === COUNTRIES.UK ? (
              <>
                <Typography variant="body2">
                  Account Name: {paymentData.paymentMethod.data.accountName}
                </Typography>
                <Typography variant="body2">
                  Account Number: {paymentData.paymentMethod.data.accountNumber}
                </Typography>
                <Typography variant="body2">
                  Sort Code: {paymentData.paymentMethod.data.sortCode}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2">
                  Account Name: {paymentData.paymentMethod.data.accountName}
                </Typography>
                <Typography variant="body2">
                  IBAN: {paymentData.paymentMethod.data.iban}
                </Typography>
                <Typography variant="body2">
                  BIC/SWIFT: {paymentData.paymentMethod.data.bicSwift}
                </Typography>
              </>
            )}
          </Box>
        )}
        
        {paymentData.paymentMethod.type === PAYMENT_METHODS.CREDIT_CARD && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              Cardholder: {paymentData.paymentMethod.data.cardholderName}
            </Typography>
            <Typography variant="body2">
              Card Number: ••••{' '}
              {paymentData.paymentMethod.data.cardNumber 
                ? paymentData.paymentMethod.data.cardNumber.slice(-4) 
                : ''}
            </Typography>
          </Box>
        )}
        
        {paymentData.paymentMethod.type === PAYMENT_METHODS.PAYPAL && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              PayPal Email: {paymentData.paymentMethod.data.paypalEmail}
            </Typography>
            {paymentData.paymentMethod.data.reference && (
              <Typography variant="body2">
                Reference: {paymentData.paymentMethod.data.reference}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Stack>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Button 
        variant="secondary" 
        onClick={onBack}
      >
        Back
      </Button>
      <Box>
        <Button 
          variant="secondary" 
          onClick={() => onSubmit(true)}
          sx={{ mr: 2 }}
        >
          Save as Draft
        </Button>
        <Button 
          onClick={() => onbeforeinputSubmit(false)}
        >
          Submit for Approval
        </Button>
      </Box>
    </Box>
  </Box>
);

export default Review;
