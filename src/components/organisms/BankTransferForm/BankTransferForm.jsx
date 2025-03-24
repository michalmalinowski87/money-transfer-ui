import { Grid, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

import { COUNTRIES, PAYMENT_METHODS } from '../../../lib/constants';
import { 
  isNotEmpty, 
  isValidAccountNumber, 
  isValidSortCode, 
  isValidIBAN, 
  isValidBICSwift 
} from '../../../lib/validation';
import Button from '../../atoms/Button/Button';
import FormField from '../../atoms/FormField/FormField';
import FormLayout from '../../molecules/FormLayout/FormLayout';

// Import shared utilities

/**
 * Bank Transfer payment method component
 * Collects bank details based on the recipient country
 * 
 * @component
 */
const BankTransferForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  disabled = false,
  currency,
  recipient
}) => {
  // Extract country from recipient data
  const country = recipient?.country || COUNTRIES.UK;
  
  // Local form state
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    sortCode: '',
    iban: '',
    bicSwift: '',
    bankName: '',
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
      case 'accountName':
        isValid = isNotEmpty(value);
        errorMsg = isValid ? '' : 'Account name is required';
        break;
        
      case 'accountNumber':
        if (country === COUNTRIES.UK) {
          isValid = isValidAccountNumber(value);
          errorMsg = isValid ? '' : 'Enter a valid 8-digit account number';
        }
        break;
        
      case 'sortCode':
        if (country === COUNTRIES.UK) {
          isValid = isValidSortCode(value);
          errorMsg = isValid ? '' : 'Enter a valid sort code (e.g., 12-34-56)';
        }
        break;
        
      case 'iban':
        if (country !== COUNTRIES.UK) {
          isValid = isValidIBAN(value);
          errorMsg = isValid ? '' : 'Enter a valid IBAN';
        }
        break;
        
      case 'bicSwift':
        if (country !== COUNTRIES.UK) {
          isValid = isValidBICSwift(value);
          errorMsg = isValid ? '' : 'Enter a valid BIC/SWIFT code';
        }
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
    
    // Common fields
    if (!isNotEmpty(formData.accountName)) {
      newErrors.accountName = 'Account name is required';
      isValid = false;
    }
    
    // UK-specific validation
    if (country === COUNTRIES.UK) {
      if (!isValidAccountNumber(formData.accountNumber)) {
        newErrors.accountNumber = 'Enter a valid 8-digit account number';
        isValid = false;
      }
      
      if (!isValidSortCode(formData.sortCode)) {
        newErrors.sortCode = 'Enter a valid sort code (e.g., 12-34-56)';
        isValid = false;
      }
    } 
    // EU/International validation
    else {
      if (!isValidIBAN(formData.iban)) {
        newErrors.iban = 'Enter a valid IBAN';
        isValid = false;
      }
      
      if (!isValidBICSwift(formData.bicSwift)) {
        newErrors.bicSwift = 'Enter a valid BIC/SWIFT code';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        type: PAYMENT_METHODS.BANK_TRANSFER,
        data: { ...formData, country }
      });
    }
  };
  const handleCancel = () => onCancel({
    type: PAYMENT_METHODS.BANK_TRANSFER,
    data: { ...formData, country }
  });
  
  // Render the appropriate form based on country
  const renderUKForm = () => (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Account Name" 
            placeholder="John Doe or Company Name" 
            value={formData.accountName}
            onChange={handleChange('accountName')}
            error={!!errors.accountName}
            helperText={errors.accountName}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField 
            label="Sort Code" 
            placeholder="12-34-56" 
            value={formData.sortCode}
            onChange={handleChange('sortCode')}
            error={!!errors.sortCode}
            helperText={errors.sortCode}
            required
            disabled={disabled}
          />
        </Grid>
      </Grid>
      <FormField 
        label="Account Number" 
        placeholder="12345678" 
        value={formData.accountNumber}
        onChange={handleChange('accountNumber')}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber}
        required
        disabled={disabled}
      />
      <FormField 
        label="Bank Name" 
        placeholder="HSBC, Barclays, etc." 
        value={formData.bankName}
        onChange={handleChange('bankName')}
        disabled={disabled}
      />
      <FormField 
        label="Payment Reference" 
        placeholder="Invoice #12345" 
        value={formData.reference}
        onChange={handleChange('reference')}
        disabled={disabled}
      />
    </>
  );
  
  const renderEUForm = () => (
    <>
      <FormField 
        label="Account Name" 
        placeholder="John Doe or Company Name" 
        value={formData.accountName}
        onChange={handleChange('accountName')}
        error={!!errors.accountName}
        helperText={errors.accountName}
        required
        disabled={disabled}
      />
      <FormField 
        label="IBAN" 
        placeholder="DE89 3704 0044 0532 0130 00" 
        value={formData.iban}
        onChange={handleChange('iban')}
        error={!!errors.iban}
        helperText={errors.iban}
        required
        disabled={disabled}
      />
      <FormField 
        label="BIC/SWIFT" 
        placeholder="COBADEFFXXX" 
        value={formData.bicSwift}
        onChange={handleChange('bicSwift')}
        error={!!errors.bicSwift}
        helperText={errors.bicSwift}
        required
        disabled={disabled}
      />
      <FormField 
        label="Bank Name" 
        placeholder="Deutsche Bank, BNP Paribas, etc." 
        value={formData.bankName}
        onChange={handleChange('bankName')}
        disabled={disabled}
      />
      <FormField 
        label="Payment Reference" 
        placeholder="Invoice #12345" 
        value={formData.reference}
        onChange={handleChange('reference')}
        disabled={disabled}
      />
    </>
  );
  
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
      title="Bank Transfer Details"
      subtitle={`Enter the bank account details for your ${currency} payment`}
      actions={actionButtons}
    >
      <Alert severity="info" sx={{ mb: 2 }}>
        {country === COUNTRIES.UK 
          ? "This payment will be processed as a UK bank transfer" 
          : "This payment will be processed as an international bank transfer"}
      </Alert>
      
      {country === COUNTRIES.UK ? renderUKForm() : renderEUForm()}
    </FormLayout>
  );
};

export default BankTransferForm;