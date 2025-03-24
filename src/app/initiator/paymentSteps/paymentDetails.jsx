'use client';

import { 
  Box, 
  Typography, 
  Grid
} from '@mui/material';
import { useState } from 'react';

import Button from '../../../components/atoms/Button/Button';
import FormField from '../../../components/atoms/FormField/FormField';
import { CURRENCY_OPTIONS } from '../../../lib/constants';

export default function PaymentDetails({ paymentData, onNext }) {
  const [amount, setAmount] = useState(paymentData.basicInfo.amount);
  const [currency, setCurrency] = useState(paymentData.basicInfo.currency);
  const [description, setDescription] = useState(paymentData.basicInfo.description);
  const validate = () => amount && parseFloat(amount) > 0;
  const handleNext = () => {
    onNext({
      amount: parseFloat(amount).toFixed(2),
      currency,
      description,
    });
  };
  
  return (
    <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Amount" 
            placeholder="1000.00" 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Currency" 
            type="select" 
            selectOptions={CURRENCY_OPTIONS.map(c => c.value)} 
            optionLabels={Object.fromEntries(CURRENCY_OPTIONS.map(c => [c.value, c.label]))}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Grid>
      </Grid>
      <FormField 
        label="Payment Description" 
        placeholder="Supplier payment - Invoice #12345" 
        fullWidth 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button 
          onClick={handleNext}
          disabled={!validate()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}