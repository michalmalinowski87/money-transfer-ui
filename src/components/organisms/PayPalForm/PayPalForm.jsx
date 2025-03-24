import { Email } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';

import { PAYMENT_METHODS } from '../../../lib/constants';
import { isValidEmail } from '../../../lib/validation';
import Button from '../../atoms/Button/Button';
import FormField from '../../atoms/FormField/FormField';
import FormLayout from '../../molecules/FormLayout/FormLayout';

// Import shared validation utilities

/**
 * PayPal payment method organism
 * Collects PayPal email and reference information
 * 
 * @component
 */
const PayPalForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  disabled = false,
  currency
}) => {
  // Local form state
  const [formData, setFormData] = useState({
    paypalEmail: '',
    reference: '',
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
    
    // Validate field immediately
    validateField(field, newValue);
    
    // Update local state
    setFormData(updatedData);
  };
  
  // Validate a single field
  const validateField = (field, value) => {
    let isValid = true;
    let errorMsg = '';
    
    switch (field) {
      case 'paypalEmail':
        isValid = isValidEmail(value);
        errorMsg = isValid ? '' : 'Enter a valid email address';
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
    
    if (!isValidEmail(formData.paypalEmail)) {
      newErrors.paypalEmail = 'Enter a valid email address';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        type: PAYMENT_METHODS.PAYPAL,
        data: { ...formData }
      });
    }
  };
  const handleCancel = () => onCancel({
    type: PAYMENT_METHODS.PAYPAL,
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
      title="PayPal Details"
      subtitle={`Enter the PayPal email for your ${currency} payment`}
      actions={actionButtons}
    >
      <Alert severity="info" sx={{ mb: 3 }}>
        An email will be sent to the recipient with instructions to claim the payment
      </Alert>
      
      <FormField 
        label="PayPal Email" 
        placeholder="recipient@example.com" 
        type="email" 
        value={formData.paypalEmail}
        onChange={handleChange('paypalEmail')}
        error={!!errors.paypalEmail}
        helperText={errors.paypalEmail}
        required
        disabled={disabled}
        InputProps={{
          startAdornment: <Email color="action" sx={{ mr: 1 }} />,
        }}
      />
      
      <FormField 
        label="Payment Reference" 
        placeholder="Invoice #12345" 
        value={formData.reference}
        onChange={handleChange('reference')}
        disabled={disabled}
      />
    </FormLayout>
  );
};

export default PayPalForm;