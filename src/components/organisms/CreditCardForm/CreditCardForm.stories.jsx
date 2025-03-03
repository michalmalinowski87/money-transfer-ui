import React from 'react';
import CreditCardForm from './CreditCardForm';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';

export default {
  title: 'Organisms/CreditCardForm',
  component: CreditCardForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    onDataChange: { action: 'dataChanged' },
    currency: { control: 'text' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <CreditCardForm 
      {...args} 
      onSubmit={action('submitted')}
      onCancel={action('cancelled')}
      onDataChange={action('dataChanged')}
    />
  </Box>
);

export const WithData = Template.bind({});
WithData.args = {
  currency: '$1,250.00',
  initialData: {
    cardholderName: 'John Smith',
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123'
  },
  isLoading: false,
  disabled: false
};

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  currency: '€750.50',
  initialData: {},
  isLoading: false,
  disabled: false
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  currency: '£2,000.00',
  initialData: {
    cardholderName: 'Jane Doe',
    cardNumber: '5555 5555 5555 4444',
    expiryDate: '06/26',
    cvv: '321'
  },
  isLoading: false,
  disabled: true
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  currency: '$3,500.00',
  initialData: {
    cardholderName: 'Alex Johnson',
    cardNumber: '3782 822463 10005',
    expiryDate: '09/28',
    cvv: '1234'
  },
  isLoading: true,
  disabled: false
};