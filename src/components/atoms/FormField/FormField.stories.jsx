import { 
  Search,
  Email,
  Lock,
  CreditCard
} from '@mui/icons-material';
import { Box, Grid, Paper } from '@mui/material';
import { useState } from 'react';

import FormField from './FormField';

const FormFieldStories = {
  title: 'Atoms/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Input properties
    label: { 
      control: 'text',
      description: 'Field label text',
    },
    placeholder: { 
      control: 'text', 
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'select'],
      description: 'Input field type',
    },
    value: {
      control: 'text',
      description: 'Field value',
    },
    // Field properties
    required: { 
      control: 'boolean',
      description: 'Whether the field is required (shows orange asterisk)',
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    error: { 
      control: 'boolean',
      description: 'Whether the field has an error state',
    },
    helperText: { 
      control: 'text',
      description: 'Helper text shown below the field',
    }
  },
  args: {
    // Default values for all stories
    label: 'Field Label',
    placeholder: 'Enter value...',
    type: 'text',
    required: false,
    disabled: false,
    error: false,
    fullWidth: true,
    helperText: '',
  },
};

// Our template needs to handle state for controlled components
const Template = (args) => {
  const [value, setValue] = useState(args.value || '');
  
  const handleChange = (e) => {
    setValue(e.target.value);
    if (args.onChange) {
      args.onChange(e);
    }
  };
  
  return (
    <Box sx={{ width: 300 }}>
      <FormField {...args} value={value} onChange={handleChange} />
    </Box>
  );
};

// Basic text field
export const Text = Template.bind({});
Text.args = {
  label: 'Name',
  placeholder: 'Enter your name',
  type: 'text',
};

// Required field with asterisk
export const Required = Template.bind({});
Required.args = {
  label: 'Email Address',
  placeholder: 'Enter your email',
  type: 'email',
  required: true,
};

// Field with error state
export const WithError = Template.bind({});
WithError.args = {
  label: 'Password',
  placeholder: 'Enter password',
  type: 'password',
  error: true,
  helperText: 'Password must be at least 8 characters',
};

// Disabled field
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Username',
  placeholder: 'Enter username',
  value: 'johndoe',
  disabled: true,
};

// Number field
export const Number = Template.bind({});
Number.args = {
  label: 'Amount',
  placeholder: '0.00',
  type: 'number',
};

// Select field
export const Select = Template.bind({});
Select.args = {
  label: 'Country',
  type: 'select',
  selectOptions: ['USA', 'UK', 'EU', 'Canada', 'Australia'],
  placeholder: 'Select a country',
};

// Select with option labels and required
export const SelectWithLabelsRequired = Template.bind({});
SelectWithLabelsRequired.args = {
  label: 'Payment Method',
  type: 'select',
  selectOptions: ['bank', 'card', 'paypal', 'check'],
  optionLabels: {
    bank: 'Bank Transfer',
    card: 'Credit Card',
    paypal: 'PayPal',
    check: 'Check',
  },
  placeholder: 'Select payment method',
  required: true,
};

// With icon
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Search',
  placeholder: 'Search payments...',
  InputProps: {
    startAdornment: <Search color="action" sx={{ mr: 1 }} />,
  },
};

// Field demonstration in a form layout
export const FormLayout = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cardNumber: '',
    country: '',
  });

  const handleChange = (field) => (e) => {
    setValues({
      ...values,
      [field]: e.target.value,
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="First Name"
              placeholder="Enter first name"
              value={values.firstName}
              onChange={handleChange('firstName')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Last Name"
              placeholder="Enter last name"
              value={values.lastName}
              onChange={handleChange('lastName')}
              required
            />
          </Grid>
        </Grid>
        
        <FormField
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          required
          InputProps={{
            startAdornment: <Email color="action" sx={{ mr: 1 }} />,
          }}
        />
        
        <FormField
          label="Password"
          placeholder="Create a password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          required
          helperText="Password must be at least 8 characters"
          InputProps={{
            startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
          }}
        />
        
        <FormField
          label="Card Number"
          placeholder="4111 1111 1111 1111"
          value={values.cardNumber}
          onChange={handleChange('cardNumber')}
          InputProps={{
            startAdornment: <CreditCard color="action" sx={{ mr: 1 }} />,
          }}
        />
        
        <FormField
          label="Country"
          type="select"
          selectOptions={['USA', 'UK', 'EU', 'Canada', 'Australia']}
          value={values.country}
          onChange={handleChange('country')}
          placeholder="Select your country"
        />
      </Box>
    </Paper>
  );
};
FormLayout.parameters = {
  controls: { disable: true },
};

export default FormFieldStories;