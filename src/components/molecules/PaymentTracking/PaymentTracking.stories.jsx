import React from 'react';
import PaymentTracking from './PaymentTracking';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';

export default {
  title: 'Molecules/PaymentTracking',
  component: PaymentTracking,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['completed', 'processing', 'approved'],
    },
    onActionClick: { action: 'actionClicked' },
  },
};

const Template = (args) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <PaymentTracking {...args} onActionClick={action('actionClicked')} />
  </Box>
);

export const Processing = Template.bind({});
Processing.args = {
  id: '1',
  sender: 'Global Corp',
  amount: '$2,580.00',
  initiatedDate: 'Feb 25, 2025',
  expectedDate: 'Feb 27, 2025',
  reference: 'Invoice #GC-10458',
  status: 'processing',
  statusTimeline: [
    { date: 'Feb 25, 2025 09:15', status: 'Payment Initiated', completed: true },
    { date: 'Feb 25, 2025 11:30', status: 'Payment Approved', completed: true },
    { date: 'Feb 26, 2025 14:45', status: 'Processing by Bank', completed: true },
    { date: 'Feb 27, 2025', status: 'Expected Arrival', completed: false },
  ],
  actions: ['notify'],
};

export const Approved = Template.bind({});
Approved.args = {
  id: '2',
  sender: 'Tech Innovations',
  amount: '€1,750.00',
  initiatedDate: 'Feb 26, 2025',
  expectedDate: 'Mar 01, 2025',
  reference: 'Project Phase 1',
  status: 'approved',
  statusTimeline: [
    { date: 'Feb 26, 2025 10:20', status: 'Payment Initiated', completed: true },
    { date: 'Feb 26, 2025 16:45', status: 'Payment Approved', completed: true },
    { date: 'Pending', status: 'Processing by Bank', completed: false },
    { date: 'Mar 01, 2025', status: 'Expected Arrival', completed: false },
  ],
  actions: ['notify'],
};

export const Completed = Template.bind({});
Completed.args = {
  id: '3',
  sender: 'Marketing Agency',
  amount: '$1,200.00',
  initiatedDate: 'Feb 20, 2025',
  expectedDate: 'Feb 23, 2025',
  reference: 'Monthly Retainer',
  status: 'completed',
  statusTimeline: [
    { date: 'Feb 20, 2025 08:30', status: 'Payment Initiated', completed: true },
    { date: 'Feb 20, 2025 09:45', status: 'Payment Approved', completed: true },
    { date: 'Feb 21, 2025 14:00', status: 'Processing by Bank', completed: true },
    { date: 'Feb 23, 2025 10:15', status: 'Payment Received', completed: true },
  ],
  actions: [],
};

export const DetailedTracking = Template.bind({});
DetailedTracking.args = {
  id: '4',
  sender: 'Enterprise Solutions Ltd',
  amount: '$15,750.00',
  initiatedDate: 'Feb 22, 2025',
  expectedDate: 'Feb 28, 2025',
  reference: 'Project ENT-2025-Q1',
  status: 'processing',
  statusTimeline: [
    { date: 'Feb 22, 2025 09:00', status: 'Payment Initiated', completed: true },
    { date: 'Feb 22, 2025 11:30', status: 'Documentation Verified', completed: true },
    { date: 'Feb 23, 2025 14:15', status: 'Payment Approved', completed: true },
    { date: 'Feb 24, 2025 10:00', status: 'Compliance Check', completed: true },
    { date: 'Feb 25, 2025 16:30', status: 'International Transfer Initiated', completed: true },
    { date: 'Feb 26, 2025 12:00', status: 'Correspondent Bank Processing', completed: false },
    { date: 'Feb 27, 2025', status: 'Receiving Bank Processing', completed: false },
    { date: 'Feb 28, 2025', status: 'Expected Arrival', completed: false },
  ],
  actions: ['notify'],
};

export const InternationalWire = Template.bind({});
InternationalWire.args = {
  id: '5',
  sender: 'Global Manufacturing Ltd',
  amount: '$8,750.00',
  initiatedDate: 'Feb 20, 2025',
  expectedDate: 'Mar 02, 2025',
  reference: 'INV-GLM-2025-0023',
  status: 'processing',
  statusTimeline: [
    { date: 'Feb 20, 2025 10:20', status: 'Payment Initiated', completed: true },
    { date: 'Feb 20, 2025 15:45', status: 'Payment Approved', completed: true },
    { date: 'Feb 21, 2025 09:30', status: 'Compliance Review', completed: true },
    { date: 'Feb 22, 2025 16:00', status: 'International Processing Started', completed: true },
    { date: 'Feb 24, 2025 11:15', status: 'Intermediary Bank', completed: false },
    { date: 'Feb 28, 2025', status: 'Beneficiary Bank', completed: false },
    { date: 'Mar 02, 2025', status: 'Expected Arrival', completed: false },
  ],
  actions: ['notify'],
};

export const ShortTrackingTwoSteps = Template.bind({});
ShortTrackingTwoSteps.args = {
  id: '6',
  sender: 'Quick Pay Services',
  amount: '£250.00',
  initiatedDate: 'Feb 27, 2025',
  expectedDate: 'Feb 27, 2025',
  reference: 'Express Transfer',
  status: 'processing',
  statusTimeline: [
    { date: 'Feb 27, 2025 08:30', status: 'Payment Initiated', completed: true },
    { date: 'Feb 27, 2025', status: 'Expected Arrival (Same Day)', completed: false },
  ],
  actions: ['notify'],
};