'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Stepper,
  Step,
  
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import Card from '../../components/atoms/Card/Card';
import { PAYMENT_METHODS, COUNTRIES } from '../../lib/constants';

import PaymentDetails from './paymentSteps/paymentDetails';
import PaymentMethod from './paymentSteps/paymentMethod';
import RecipientInformation from './paymentSteps/recipientInformation';
import Review from './paymentSteps/review';

// Wizard steps
const WIZARD_STEPS = [
  'Payment Information',
  'Recipient Details',
  'Payment Method',
  'Review & Submit'
];

// Styled components
const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export default function InitiatorDashboard() {
  const [wizardStep, setWizardStep] = useState(0);
  const [paymentData, setPaymentData] = useState({
    // Step 1: Payment Information
    basicInfo: {
      amount: '',
      currency: 'USD',
      description: ''
    },
    // Step 2: Recipient Details
    recipient: {
      name: '',
      email: '',
      country: COUNTRIES.UK
    },
    // Step 3: Payment Method
    paymentMethod: {
      type: PAYMENT_METHODS.BANK_TRANSFER,
      data: {}
    }
  });
  const handleNext = () => setWizardStep(prev => prev + 1);
  const handleBack = () => setWizardStep(prev => prev - 1);
  
  // Submit form data
  const handleSubmit = (isDraft = false) => {
    const formattedData = {
      ...paymentData,
      status: isDraft ? 'draft' : 'pending',
      date: new Date().toISOString(),
      id: `payment-${Date.now()}`
    };
    
    // eslint-disable-next-line no-console
    console.log(`Payment ${isDraft ? 'saved as draft' : 'submitted for approval'}:`, formattedData);
    
    // In a real app, this would send data to an API and redirect or show success
    // Reset wizard and form
    setWizardStep(0);
    setPaymentData({
      basicInfo: {
        amount: '',
        currency: 'USD',
        description: ''
      },
      recipient: {
        name: '',
        email: '',
        country: COUNTRIES.UK
      },
      paymentMethod: {
        type: PAYMENT_METHODS.BANK_TRANSFER,
        data: {}
      }
    });
  };

  const handlePaymentDetailsNext = ({ amount, currency, description }) => {
    setPaymentData(prev => ({
      ...prev,
      basicInfo: {
        amount,
        currency,
        description
      }
    }));
    handleNext();
  };

  const handleUpdateRecipientInformation = ({ recipientName, recipientEmail, recipientCountry }) => { 
    let paymentMethod = paymentData.paymentMethod;
    // Clear payment method data if recipient country changes
    if (recipientCountry !== paymentData.recipient.country) {
      paymentMethod = { type: PAYMENT_METHODS.BANK_TRANSFER, data: {} };
    }

    setPaymentData(prev => ({
      ...prev,
      recipient: {
        name: recipientName,
        email: recipientEmail,
        country: recipientCountry
      },
      paymentMethod
    }))
  };
  const handleRecipientInformationNext = ({ recipientName, recipientEmail, recipientCountry }) => {
    handleUpdateRecipientInformation({ recipientName, recipientEmail, recipientCountry});
    handleNext();
  };
  const handleRecipientInformationBack = ({ recipientName, recipientEmail, recipientCountry }) => {
    handleUpdateRecipientInformation({ recipientName, recipientEmail, recipientCountry});
    handleBack();
  };
  const handlePaymentMethodChange = (methodType) => setPaymentData(prev => ({
    ...prev,
    paymentMethod: {
      type: methodType,
      data: {} // Reset method-specific data when changing methods
    }
  }));
  const handleUpdatePaymentMethod = ({ type, data }) => setPaymentData(prev => ({
    ...prev,
    paymentMethod: { type, data }
  }));
  const handlePaymentMethodSubmit = ({ type, data }) => {
    handleUpdatePaymentMethod({ type, data });
    handleNext();
  };
  const handlePaymentMethodCancel = ({ type, data }) => {
    handleUpdatePaymentMethod({ type, data });
    handleBack();
  };

  // Render the appropriate step content
  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0:
        return (
          <PaymentDetails paymentData={paymentData} onNext={handlePaymentDetailsNext} />
        );
      case 1:
        return (
          <RecipientInformation paymentData={paymentData} 
            onNext={handleRecipientInformationNext} 
            onBack={handleRecipientInformationBack} 
          />
        );
      case 2:
        return (
          <PaymentMethod paymentData={paymentData} 
            onPaymentMethodChange={handlePaymentMethodChange} 
            onNext={handlePaymentMethodSubmit} 
            onBack={handlePaymentMethodCancel} 
          />
        );
      case 3:
        return (
          <Review paymentData={paymentData} onBack={handleBack} onSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <PageHeader>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Initiator Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Create and manage international money transfers
        </Typography>
      </PageHeader>
      <Card>
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={wizardStep} alternativeLabel>
            {WIZARD_STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderWizardStep()}
      </Card>
    </Container>
  );
}