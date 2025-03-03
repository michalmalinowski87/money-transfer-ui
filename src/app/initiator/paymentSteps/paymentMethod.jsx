'use client';

import React, { lazy, Suspense } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import { PAYMENT_METHODS } from '../../../lib/constants';
import { getFormattedAmount } from '../../../lib/utils';

// Dynamically import payment method organisms (for code splitting)
const BankTransferForm = lazy(() => import('../../../components/organisms/BankTransferForm'));
const CreditCardForm = lazy(() => import('../../../components/organisms/CreditCardForm'));
const PayPalForm = lazy(() => import('../../../components/organisms/PayPalForm'));

// Loading fallback for lazy-loaded components
const LoadingComponent = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      py: 4 
    }}
  >
    <CircularProgress />
  </Box>
);

export default function PaymentMethod({ paymentData, onPaymentMethodChange, onNext, onBack }) {
  // Handle payment method form submission
  const handlePaymentMethodSubmit = (data) => onNext({ type: data.type, data: data.data });
  const handlePaymentMethodCancel = (data) => onBack({ type: data.type, data: data.data });
  const selectPaymentMethod = (methodType) => onPaymentMethodChange(methodType);

  // TODO: This should be removed when refactoring is done
  const updatePaymentMethodData = (methodData) => {
    setPaymentData(prev => ({
      ...prev,
      paymentMethod: {
        ...prev.paymentMethod,
        data: methodData
      }
    }));
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Select Payment Method
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Box 
            onClick={() => selectPaymentMethod(PAYMENT_METHODS.BANK_TRANSFER)}
            sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: paymentData.paymentMethod.type === PAYMENT_METHODS.BANK_TRANSFER ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              backgroundColor: paymentData.paymentMethod.type === PAYMENT_METHODS.BANK_TRANSFER ? 'rgba(255, 112, 67, 0.05)' : 'white',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle1">Bank Transfer</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box 
            onClick={() => selectPaymentMethod(PAYMENT_METHODS.CREDIT_CARD)}
            sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: paymentData.paymentMethod.type === PAYMENT_METHODS.CREDIT_CARD ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              backgroundColor: paymentData.paymentMethod.type === PAYMENT_METHODS.CREDIT_CARD ? 'rgba(255, 112, 67, 0.05)' : 'white',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle1">Credit Card</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box 
            onClick={() => selectPaymentMethod(PAYMENT_METHODS.PAYPAL)}
            sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: paymentData.paymentMethod.type === PAYMENT_METHODS.PAYPAL ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              backgroundColor: paymentData.paymentMethod.type === PAYMENT_METHODS.PAYPAL ? 'rgba(255, 112, 67, 0.05)' : 'white',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle1">PayPal</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Suspense fallback={<LoadingComponent />}>
        {paymentData.paymentMethod.type === PAYMENT_METHODS.BANK_TRANSFER && (
          <BankTransferForm
            initialData={paymentData.paymentMethod.data}
            onSubmit={handlePaymentMethodSubmit}
            onCancel={handlePaymentMethodCancel}
            currency={getFormattedAmount({ amount: paymentData.basicInfo.amount, currency: paymentData.basicInfo.currency })}
            recipient={paymentData.recipient}
          />
        )}
        {paymentData.paymentMethod.type === PAYMENT_METHODS.CREDIT_CARD && (
          <CreditCardForm
            initialData={paymentData.paymentMethod.data}
            onSubmit={handlePaymentMethodSubmit}
            onCancel={handlePaymentMethodCancel}
            currency={getFormattedAmount({ amount: paymentData.basicInfo.amount, currency: paymentData.basicInfo.currency })}
          />
        )}
        {paymentData.paymentMethod.type === PAYMENT_METHODS.PAYPAL && (
          <PayPalForm
            initialData={paymentData.paymentMethod.data}
            onSubmit={handlePaymentMethodSubmit}
            onCancel={handlePaymentMethodCancel}
            currency={getFormattedAmount({ amount: paymentData.basicInfo.amount, currency: paymentData.basicInfo.currency })}
          />
        )}
      </Suspense>
    </Box>
  );
}