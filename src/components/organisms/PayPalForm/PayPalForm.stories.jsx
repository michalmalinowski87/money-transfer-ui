import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';

import PayPalForm from './PayPalForm';

const PayPalFormStories = {
  title: 'Organisms/PayPalForm',
  component: PayPalForm,
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

export default PayPalFormStories;

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <PayPalForm 
      {...args} 
      onSubmit={action('submitted')}
      onCancel={action('cancelled')}
      onDataChange={action('dataChanged')}
    />
  </Box>
);

export const WithData = Template.bind({});
WithData.args = {
  currency: '$950.00',
  initialData: {
    paypalEmail: 'recipient@example.com',
    reference: 'Invoice #12345'
  },
  isLoading: false,
  disabled: false
};

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  currency: '€500.00',
  initialData: {},
  isLoading: false,
  disabled: false
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  currency: '£1,200.00',
  initialData: {
    paypalEmail: 'finance@example.org',
    reference: 'Q1-2025-SERVICES'
  },
  isLoading: false,
  disabled: true
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  currency: '$2,500.00',
  initialData: {
    paypalEmail: 'payments@supplier.com',
    reference: 'ANNUAL-2025'
  },
  isLoading: true,
  disabled: false
};