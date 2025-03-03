import React from 'react';
import PaymentItem from './PaymentItem';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';

export default {
  title: 'Molecules/PaymentItem',
  component: PaymentItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['completed', 'pending', 'processing', 'approved', 'rejected', 'draft'],
    },
    onActionClick: { action: 'actionClicked' },
  },
};

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <PaymentItem {...args} onActionClick={action('actionClicked')} />
  </Box>
);

export const OutgoingPayment = Template.bind({});
OutgoingPayment.args = {
  id: '1',
  paymentItem: {
    recipient: 'Acme Corp',
    amount: '$1,250.00',
    date: 'Feb 24, 2025',
    status: 'completed',
    method: 'Bank Transfer',
    reference: 'INV-2025-0124',
  },
  actions: ['view', 'download'],
};

export const IncomingPayment = Template.bind({});
IncomingPayment.args = {
  id: '2',
  paymentItem: {
    sender: 'Global Supplies Ltd',
    amount: '€2,780.50',
    date: 'Feb 22, 2025',
    status: 'pending',
    method: 'Credit Card',
    reference: 'ORD-2025-0087'
  },
  actions: ['view', 'copy'],
};

export const DraftPayment = Template.bind({});
DraftPayment.args = {
  id: '3',
  paymentItem: {
    recipient: 'Tech Solutions Inc',
    amount: '$3,450.00',
    date: 'Feb 26, 2025',
    status: 'draft',
    method: 'Bank Transfer'
  },
  actions: ['edit', 'delete'],
};

export const PendingPayment = Template.bind({});
PendingPayment.args = {
  id: '4',
  paymentItem: {
    recipient: 'Marketing Partners',
    amount: '£1,800.00',
    date: 'Feb 25, 2025',
    status: 'pending',
    method: 'PayPal',
    reference: 'CON-2025-Q1'
  },
  actions: ['view', 'cancel'],
};

export const RejectedPayment = Template.bind({});
RejectedPayment.args = {
  id: '5',
  paymentItem: {
    recipient: 'Questionable Vendor',
    amount: '$12,000.00',
    date: 'Feb 15, 2025',
    status: 'rejected',
    method: 'Bank Transfer',
    approver: 'Jane Smith',
    reason: 'Suspicious transaction amount'
  },
  actions: ['view'],
};

export const WithMultipleActions = Template.bind({});
WithMultipleActions.args = {
  id: '6',
  paymentItem: {
    recipient: 'Office Supplies Co',
    amount: '€1,250.75',
    date: 'Feb 18, 2025',
    status: 'completed',
    method: 'Credit Card',
  },
  actions: ['view', 'copy', 'download'],
};

export const PaymentCollection = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <PaymentItem
        id="1"
        paymentItem={{
          recipient: 'Acme Corp',
          amount: '$1,250.00',
          date: 'Feb 24, 2025',
          status: 'completed',
          method: 'Bank Transfer',
        }}
        actions={['view', 'download']}
        onActionClick={action('actionClicked')}
        sx={{ mb: 2 }}
      />
      <PaymentItem
        id="2"
        paymentItem={{
          recipient: 'Tech Solutions Inc',
          amount: '$3,450.00',
          date: 'Feb 26, 2025',
          status: 'pending',
          method: 'Bank Transfer',
        }}
        actions={['view', 'edit', 'cancel']}
        onActionClick={action('actionClicked')}
        sx={{ mb: 2 }}
      />
      <PaymentItem
        id="3"
        paymentItem={{
          recipient: 'Office Supplies Co',
          amount: '€1,250.75',
          date: 'Feb 18, 2025',
          status: 'draft',
          method: 'Credit Card',
        }}
        actions={['edit', 'delete']}
        onActionClick={action('actionClicked')}
      />
    </Box>
  );
};