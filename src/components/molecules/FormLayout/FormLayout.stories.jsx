import { Box, Typography } from '@mui/material';

import Button from '../../atoms/Button/Button';
import FormLayout from './FormLayout';

const FormLayoutStories = {
  title: 'Molecules/FormLayout',
  component: FormLayout,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

const Template = (args) => <FormLayout {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Form Section Title',
  subtitle: 'Descriptive text that explains this form section',
  children: (
    <Box sx={{ p: 2, border: '1px dashed grey.300', borderRadius: 1 }}>
      <Typography>Form content would go here</Typography>
    </Box>
  ),
};

export const WithActions = Template.bind({});
WithActions.args = {
  title: 'Form With Actions',
  subtitle: 'This form has action buttons',
  children: (
    <Box sx={{ p: 2, border: '1px dashed grey.300', borderRadius: 1 }}>
      <Typography>Form content would go here</Typography>
    </Box>
  ),
  actions: (
    <>
      <Button variant="secondary">Cancel</Button>
      <Button>Submit</Button>
    </>
  ),
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  children: (
    <Box sx={{ p: 2, border: '1px dashed grey.300', borderRadius: 1 }}>
      <Typography>Form content without a title</Typography>
    </Box>
  ),
  actions: (
    <>
      <Button variant="secondary">Cancel</Button>
      <Button>Submit</Button>
    </>
  ),
};

export default FormLayoutStories;