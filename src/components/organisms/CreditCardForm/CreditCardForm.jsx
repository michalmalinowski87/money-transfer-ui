import React, { useState, useEffect } from 'react';
import { Grid, Alert } from '@mui/material';
import { CreditCard, Lock } from '@mui/icons-material';
import FormField from '../../atoms/FormField/FormField';
import Button from '../../atoms/Button/Button';
import FormLayout from '../../molecules/FormLayout/FormLayout';

// Import shared validation utilities
import { 
  isNotEmpty,
  isValidCardNumber,
  isValidExpiryDate,
  isValidCVV
} from '../../../lib/validation';
import { PAYMENT_METHODS } from '../../../lib/constants';

/**
 * Credit Card payment method organism
 * Collects and validates credit card information
 * 
 * @component
 */
const CreditCardForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  disabled = false,
  currency
}) => {
  // Local form state
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    ...initialData
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Update local state when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);
  
  // Handle form field changes
  const handleChange = (field) => (e) => {
    const newValue = e.target.value;
    const updatedData = { ...formData, [field]: newValue };
    
    // Special formatting for card number
    if (field === 'cardNumber') {
      // Remove non-digits
      const digitsOnly = newValue.replace(/\D/g, '');
      // Add spaces after every 4 digits
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
      updatedData[field] = formatted;
    }
    
    // Special formatting for expiry date
    if (field === 'expiryDate') {
      // Remove non-digits
      const digitsOnly = newValue.replace(/\D/g, '');
      
      // Format as MM/YY
      if (digitsOnly.length > 2) {
        updatedData[field] = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`;
      } else {
        updatedData[field] = digitsOnly;
      }
    }
    
    // Validate field immediately
    validateField(field, updatedData[field]);
    
    // Update local state
    setFormData(updatedData);
  };
  
  // Validate a single field
  const validateField = (field, value) => {
    let isValid = true;
    let errorMsg = '';
    
    switch (field) {
      case 'cardholderName':
        isValid = isNotEmpty(value);
        errorMsg = isValid ? '' : 'Cardholder name is required';
        break;
        
      case 'cardNumber':
        isValid = isValidCardNumber(value);
        errorMsg = isValid ? '' : 'Enter a valid card number';
        break;
        
      case 'expiryDate':
        isValid = isValidExpiryDate(value);
        errorMsg = isValid ? '' : 'Enter a valid expiry date (MM/YY)';
        break;
        
      case 'cvv':
        isValid = isValidCVV(value);
        errorMsg = isValid ? '' : 'Enter a valid CVV (3 or 4 digits)';
        break;
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [field]: !isValid ? errorMsg : ''
    }));
    
    return isValid;
  };
  
  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!isNotEmpty(formData.cardholderName)) {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    }
    
    if (!isValidCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Enter a valid card number';
      isValid = false;
    }
    
    if (!isValidExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
      isValid = false;
    }
    
    if (!isValidCVV(formData.cvv)) {
      newErrors.cvv = 'Enter a valid CVV (3 or 4 digits)';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        type: PAYMENT_METHODS.CREDIT_CARD,
        data: { ...formData }
      });
    }
  };
  const handleCancel = () => onCancel({
    type: PAYMENT_METHODS.CREDIT_CARD,
    data: { ...formData }
  });
  
  // Action buttons
  const actionButtons = (
    <>
      <Button 
        variant="secondary" 
        onClick={handleCancel}
        disabled={disabled || isLoading}
      >
        Back
      </Button>
      <Button 
        onClick={handleSubmit}
        disabled={disabled || isLoading}
      >
        Continue
      </Button>
    </>
  );
  
  return (
    <FormLayout
      title="Credit Card Details"
      subtitle={`Enter your credit card details for your ${currency} payment`}
      actions={actionButtons}
    >
      <Alert severity="info" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Lock sx={{ mr: 1 }} /> Your card details are securely encrypted
      </Alert>
      
      <FormField 
        label="Cardholder Name" 
        placeholder="John Doe" 
        value={formData.cardholderName}
        onChange={handleChange('cardholderName')}
        error={!!errors.cardholderName}
        helperText={errors.cardholderName}
        required
        disabled={disabled}
      />
      
      <FormField 
        label="Card Number" 
        placeholder="4111 1111 1111 1111" 
        value={formData.cardNumber}
        onChange={handleChange('cardNumber')}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber}
        required
        disabled={disabled}
        InputProps={{
          startAdornment: <CreditCard color="action" sx={{ mr: 1 }} />,
        }}
      />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Expiry Date" 
            placeholder="MM/YY" 
            value={formData.expiryDate}
            onChange={handleChange('expiryDate')}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="CVV" 
            placeholder="123" 
            type="password" 
            value={formData.cvv}
            onChange={handleChange('cvv')}
            error={!!errors.cvv}
            helperText={errors.cvv}
            required
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default CreditCardForm;