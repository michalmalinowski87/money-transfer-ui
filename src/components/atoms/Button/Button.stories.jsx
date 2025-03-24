import { Add, Edit, Delete, Check, Send } from '@mui/icons-material';

import Button from './Button';

const ButtonStories = {
  title: 'Atoms/Button',
  component: Button,
  // These argTypes define the controls
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'danger'],
      description: 'Button style variant',
      defaultValue: 'primary',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    children: {
      control: 'text',
      defaultValue: 'Button Text',
    },
  },
  // Default values for all stories
  args: {
    children: 'Button Text',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
};

// Basic Template - controls will affect this directly
const Template = (args) => <Button {...args} />;

// Primary variant
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

// Secondary variant
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

// Info variant
export const Info = Template.bind({});
Info.args = {
  variant: 'info',
};

// Success variant
export const Success = Template.bind({});
Success.args = {
  variant: 'success',
};

// Danger variant
export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
};

// With icon
export const WithIcon = Template.bind({});
WithIcon.args = {
  startIcon: <Add />,
  children: 'Add New',
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

// Size variations
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);
Sizes.parameters = {
  controls: { disable: true }, // Disable controls for this story
};

// Button variations showcase
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="info">Info</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="primary" startIcon={<Edit />}>Edit</Button>
      <Button variant="success" startIcon={<Check />}>Approve</Button>
      <Button variant="danger" startIcon={<Delete />}>Delete</Button>
      <Button variant="info" endIcon={<Send />}>Send</Button>
    </div>
  </div>
);
AllVariants.parameters = {
  controls: { disable: true }, // Disable controls for this story
};

export default ButtonStories;