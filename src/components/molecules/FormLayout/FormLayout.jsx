import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';

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
      
      <Box component="div" sx={{ mb: 3 }}>
        {children}
      </Box>
      
      {actions && (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {actions}
        </Stack>
      )}
    </Box>
  );
};

export default FormLayout;