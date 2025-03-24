import {
  Box,
  Typography,
  Divider,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';

const FormLayout = ({ title, subtitle, children, actions }) => {
  return (
    <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, width: '100%' }}>
      {title && (
        <>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {subtitle}
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
        </>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>{children}</Stack>
      </Box>
      
      {actions && (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {actions}
        </Stack>
      )}
    </Box>
  );
};

FormLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
};

export default FormLayout;