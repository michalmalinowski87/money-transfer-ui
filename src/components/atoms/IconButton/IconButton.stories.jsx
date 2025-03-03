import React from 'react';
import IconButton from './IconButton';
import { 
  Visibility, 
  Edit as EditIcon, // Renamed to avoid conflict
  Delete as DeleteIcon, // Renamed to avoid conflict
  Cancel, 
  CheckCircle, 
  Download, 
  ContentCopy,
  Notifications
} from '@mui/icons-material';
import { Box, Typography, Divider } from '@mui/material';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  // These argTypes define the controls
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'info', 'success', 'error'],
      description: 'Button color (used if actionType not provided)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'small',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text',
    }
  },
  // Default props for all stories
  args: {
    icon: <Visibility />,
    tooltip: 'Action Tooltip',
    size: 'small',
    disabled: false,
  },
};

// Basic template for controls
const Template = (args) => <IconButton {...args} />;

// View action
export const ViewButton = Template.bind({});
ViewButton.args = {
  actionType: 'view',
  icon: <Visibility />,
  tooltip: 'View Details',
};

// Edit action
export const EditButton = Template.bind({});
EditButton.args = {
  actionType: 'edit',
  icon: <EditIcon />,
  tooltip: 'Edit Item',
};

// Delete action
export const DeleteButton = Template.bind({});
DeleteButton.args = {
  actionType: 'delete',
  icon: <DeleteIcon />,
  tooltip: 'Delete Item',
};

// Using color instead of actionType
export const WithColor = Template.bind({});
WithColor.args = {
  color: 'primary',
  icon: <Visibility />,
  tooltip: 'Using primary color',
};

// Disabled state
export const DisabledButton = Template.bind({});
DisabledButton.args = {
  actionType: 'edit',
  icon: <EditIcon />,
  tooltip: 'Edit (Disabled)',
  disabled: true,
};

// All action types demo (not affected by controls)
export const AllActionTypes = () => (
  <Box>
    <Typography variant="subtitle1" gutterBottom>
      Semantic Action Types with Automatic Colors
    </Typography>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">View:</Typography></Box>
      <IconButton icon={<Visibility />} tooltip="View Details" actionType="view" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Edit:</Typography></Box>
      <IconButton icon={<EditIcon />} tooltip="Edit Item" actionType="edit" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Delete:</Typography></Box>
      <IconButton icon={<DeleteIcon />} tooltip="Delete Item" actionType="delete" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Cancel:</Typography></Box>
      <IconButton icon={<Cancel />} tooltip="Cancel Action" actionType="cancel" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Approve:</Typography></Box>
      <IconButton icon={<CheckCircle />} tooltip="Approve Item" actionType="approve" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Download:</Typography></Box>
      <IconButton icon={<Download />} tooltip="Download File" actionType="download" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Copy:</Typography></Box>
      <IconButton icon={<ContentCopy />} tooltip="Copy Reference" actionType="copy" />
    </Box>
    
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      <Box width={100}><Typography variant="body2">Notify:</Typography></Box>
      <IconButton icon={<Notifications />} tooltip="Get Notifications" actionType="notify" />
    </Box>
  </Box>
);
AllActionTypes.parameters = {
  controls: { disable: true },
};

// Common action groups
export const ActionGroups = () => (
  <Box>
    <Typography variant="subtitle1" gutterBottom>Action Groups</Typography>
    
    <Typography variant="body2" sx={{ mb: 1 }}>For Completed Payment:</Typography>
    <Box display="flex" sx={{ mb: 3 }}>
      <IconButton icon={<Visibility />} tooltip="View Details" actionType="view" />
      <IconButton icon={<Download />} tooltip="Download Receipt" actionType="download" />
      <IconButton icon={<ContentCopy />} tooltip="Copy Reference" actionType="copy" />
    </Box>
    
    <Divider sx={{ my: 2 }} />
    
    <Typography variant="body2" sx={{ mb: 1 }}>For Draft Payment:</Typography>
    <Box display="flex" sx={{ mb: 3 }}>
      <IconButton icon={<EditIcon />} tooltip="Edit Draft" actionType="edit" />
      <IconButton icon={<DeleteIcon />} tooltip="Delete Draft" actionType="delete" />
    </Box>
    
    <Divider sx={{ my: 2 }} />
    
    <Typography variant="body2" sx={{ mb: 1 }}>For Pending Payment:</Typography>
    <Box display="flex" sx={{ mb: 3 }}>
      <IconButton icon={<Visibility />} tooltip="View Details" actionType="view" />
      <IconButton icon={<Cancel />} tooltip="Cancel Payment" actionType="cancel" />
    </Box>
    
    <Divider sx={{ my: 2 }} />
    
    <Typography variant="body2" sx={{ mb: 1 }}>For Incoming Payment:</Typography>
    <Box display="flex" sx={{ mb: 3 }}>
      <IconButton icon={<Visibility />} tooltip="View Details" actionType="view" />
      <IconButton icon={<Notifications />} tooltip="Get Notified" actionType="notify" />
    </Box>
  </Box>
);
ActionGroups.parameters = {
  controls: { disable: true },
};