import { Box, Stack, Typography } from '@mui/material';

import StatusBadge from './StatusBadge';

const StatusBadgeStories = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['completed', 'pending', 'processing', 'approved', 'rejected', 'draft'],
    },
    customLabel: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
  },
};

const Template = (args) => <StatusBadge {...args} />;

export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
};

export const Pending = Template.bind({});
Pending.args = {
  status: 'pending',
};

export const Processing = Template.bind({});
Processing.args = {
  status: 'processing',
};

export const Approved = Template.bind({});
Approved.args = {
  status: 'approved',
};

export const Rejected = Template.bind({});
Rejected.args = {
  status: 'rejected',
};

export const Draft = Template.bind({});
Draft.args = {
  status: 'draft',
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  status: 'completed',
  customLabel: 'Payment Succeeded',
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  status: 'completed',
  size: 'medium',
};

// Show all status badges in a grid
export const AllStatuses = () => {
  const statuses = ['completed', 'pending', 'processing', 'approved', 'rejected', 'draft'];
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Status Types
      </Typography>
      <Stack spacing={2}>
        {statuses.map((status) => (
          <Box key={status} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box width={120}>
              <Typography variant="body2" color="textSecondary">
                {status.charAt(0).toUpperCase() + status.slice(1)}:
              </Typography>
            </Box>
            <StatusBadge status={status} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default StatusBadgeStories;