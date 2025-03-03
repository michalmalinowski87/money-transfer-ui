import React from 'react';
import BankTransferForm from './BankTransferForm';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';
import { COUNTRIES } from '../../../lib/constants';

export default {
  title: 'Organisms/BankTransferForm',
  component: BankTransferForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    onDataChange: { action: 'dataChanged' },
    currency: { control: 'text' },
    recipient: { control: 'object' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <BankTransferForm 
      {...args} 
      onSubmit={action('submitted')}
      onCancel={action('cancelled')}
      onDataChange={action('dataChanged')}
    />
  </Box>
);

export const UKBankTransfer = Template.bind({});
UKBankTransfer.args = {
  currency: '$1,500.00',
  recipient: {
    name: 'Acme Corp',
    email: 'payments@acme.com',
    country: COUNTRIES.UK
  },
  initialData: {
    accountName: 'Acme Corporation',
    accountNumber: '12345678',
    sortCode: '12-34-56',
    bankName: 'HSBC',
    reference: 'INV-2025-0001'
  },
  isLoading: false,
  disabled: false
};

export const EUBankTransfer = Template.bind({});
EUBankTransfer.args = {
  currency: '€2,000.00',
  recipient: {
    name: 'Tech Solutions GmbH',
    email: 'finance@techsolutions.de',
    country: COUNTRIES.EU
  },
  initialData: {
    accountName: 'Tech Solutions GmbH',
    iban: 'DE89370400440532013000',
    bicSwift: 'DEUTDEFF',
    bankName: 'Deutsche Bank',
    reference: 'PRJ-2025-Q1'
  },
  isLoading: false,
  disabled: false
};

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  currency: '$3,000.00',
  recipient: {
    name: 'New Vendor Ltd',
    country: COUNTRIES.UK
  },
  initialData: {},
  isLoading: false,
  disabled: false
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  currency: '£500.00',
  recipient: {
    name: 'Supplier Inc',
    country: COUNTRIES.UK
  },
  initialData: {
    accountName: 'Supplier Incorporated',
    accountNumber: '87654321',
    sortCode: '98-76-54'
  },
  isLoading: false,
  disabled: true
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  currency: '$750.00',
  recipient: {
    name: 'Partner Co',
    country: COUNTRIES.UK
  },
  initialData: {
    accountName: 'Partner Company Ltd',
    accountNumber: '11223344',
    sortCode: '11-22-33'
  },
  isLoading: true,
  disabled: false
};