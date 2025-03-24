'use client';

import { 
  Box, 
  Typography, 
  Grid
} from '@mui/material';
import { useState } from 'react';

import Button from '../../../components/atoms/Button/Button';
import FormField from '../../../components/atoms/FormField/FormField';
import { COUNTRIES } from '../../../lib/constants';

export default function RecipientInformation({ paymentData, onNext, onBack }) {
  const [recipientName, setRecipientName] = useState(paymentData.recipient.name);
  const [recipientEmail, setRecipientEmail] = useState(paymentData.recipient.email);
  const [recipientCountry, setRecipientCountry] = useState(paymentData.recipient.country);
  const handleNext = () => onNext({
    recipientName,
    recipientEmail,
    recipientCountry
  });
  const handleBack = () => onBack({
    recipientName,
    recipientEmail,
    recipientCountry
  });

  const validate = () => recipientName && recipientName.trim() !== '';
  
  return (
    <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Recipient Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Recipient Name" 
            placeholder="Acme Corp" 
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Email" 
            placeholder="payments@acme.com" 
            type="email" 
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField 
            label="Country" 
            type="select" 
            selectOptions={[COUNTRIES.UK, COUNTRIES.EU, COUNTRIES.US]} 
            value={recipientCountry}
            onChange={(e) => setRecipientCountry(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button 
          variant="secondary" 
          onClick={handleBack}
        >
          Back
        </Button>
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