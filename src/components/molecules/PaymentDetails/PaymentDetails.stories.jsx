import React from 'react';
import PaymentDetails from './PaymentDetails';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';

export default {
  title: 'Molecules/PaymentDetails',
  component: PaymentDetails,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onActionClick: { action: 'actionClicked' },
  },
};

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <PaymentDetails {...args} onActionClick={action('actionClicked')} />
  </Box>
);

export const BankTransfer = Template.bind({});
BankTransfer.args = {
  id: '1',
  paymentItem: {
    recipient: 'Tech Solutions Inc',
    initiator: 'John Doe',
    amount: '$3,450.00',
    date: 'Feb 26, 2025',
    method: 'Bank Transfer',
    reference: 'Invoice #TS-2025-0342',
    details: {
      'Account Name': 'Tech Solutions Inc',
      'Account Number': '12345678',
      'Sort Code': '12-34-56',
      'Bank': 'Chase Bank',
      'Address': '123 Tech Street, New York, NY 10001',
    }
  },
  actions: ['approve', 'reject', 'edit'],
};

export const PayPal = Template.bind({});
PayPal.args = {
  id: '2',
  paymentItem: {
    recipient: 'Marketing Partners',
    initiator: 'Jane Smith',
    amount: '£1,800.00',
    date: 'Feb 25, 2025',
    method: 'PayPal',
    reference: 'Contract MP-2025-Q1',
    details: {
      'PayPal Email': 'payments@marketingpartners.com',
      'Payment Type': 'Service',
      'Description': 'Q1 2025 Marketing Services',
    }
  },
  actions: ['approve', 'reject'],
};

export const CreditCard = Template.bind({});
CreditCard.args = {
  id: '3',
  paymentItem: {
    recipient: 'Office Supplies Co',
    initiator: 'Alex Johnson',
    amount: '€1,250.75',
    date: 'Feb 18, 2025',
    method: 'Credit Card',
    reference: 'PO-2025-0087',
    details: {
      'Cardholder Name': 'Alex Johnson',
      'Card Type': 'Visa',
      'Card Number': '•••• •••• •••• 4242',
      'Expiry Date': '12/27',
      'Billing Address': '456 Corporate Ave, London, UK',
    }
  },
  actions: ['approve', 'reject', 'edit'],
};

export const InternationalWire = Template.bind({});
InternationalWire.args = {
  id: '4',
  paymentItem: {
    recipient: 'Global Manufacturing Ltd',
    initiator: 'Sarah Parker',
    amount: '$8,750.00',
    date: 'Feb 20, 2025',
    method: 'International Wire',
    reference: 'INV-GLM-2025-0023',
    details: {
      'Recipient Name': 'Global Manufacturing Ltd',
      'IBAN': 'DE89 3704 0044 0532 0130 00',
      'BIC/SWIFT': 'COBADEFFXXX',
      'Bank Name': 'Commerzbank',
      'Bank Address': '123 Finance St, Berlin, Germany',
      'Routing Number': '250-490-12',
      'Purpose of Payment': 'Manufacturing Equipment',
    }
  },
  actions: ['approve', 'reject', 'edit'],
};

export const ViewOnly = Template.bind({});
ViewOnly.args = {
  id: '5',
  paymentItem: {
    recipient: 'Software Services Ltd',
    initiator: 'Michael Brown',
    amount: '$5,000.00',
    date: 'Feb 20, 2025',
    method: 'Bank Transfer',
    reference: 'LIC-2025-ENT-001',
    details: {
      'Account Name': 'Software Services Ltd',
      'Account Number': '87654321',
      'Sort Code': '98-76-54',
      'Bank': 'National Bank',
      'Description': 'Enterprise License Renewal',
    }
  },
  actions: [], // No actions, view only
};

export const WithMinimalDetails = Template.bind({});
WithMinimalDetails.args = {
  id: '6',
  paymentItem: {
    recipient: 'Cloud Hosting Provider',
    initiator: 'David Wilson',
    amount: '$450.00',
    date: 'Feb 22, 2025',
    method: 'Credit Card',
    reference: 'SUB-2025-02',
    details: {
      'Description': 'Monthly Cloud Hosting Subscription',
      'Billing Period': 'February 2025',
    }
  },
  actions: ['approve', 'reject'],
};