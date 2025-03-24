'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Stack,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import Card from '../../components/atoms/Card/Card';
import PaymentItem from '../../components/molecules/PaymentItem/PaymentItem';
import PaymentTracking from '../../components/molecules/PaymentTracking/PaymentTracking';

// Styled components
const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const TabPanel = ({ children, value, index, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...props}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export default function ReceiverDashboard({
  incomingPayments,
  receivedPayments
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleActionClick = (action, id) => {
    // eslint-disable-next-line no-console
    console.log(`Action: ${action}, Payment ID: ${id}`);
    // In a real app, this would trigger API calls or state changes
  };

  return (
    <Container maxWidth="lg">
      <PageHeader>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Receiver Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Track and manage incoming payments
        </Typography>
      </PageHeader>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="payment tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Incoming Payments" />
            <Tab label="Received" />
          </Tabs>
        </Box>
        {/* Incoming Payments Tab */}
        <TabPanel value={activeTab} index={0}>
          <Stack spacing={4}>
            {incomingPayments?.map((payment, index) => (
              <React.Fragment key={payment.id}>
                {index > 0 && <Divider />}
                <PaymentTracking
                  {...payment}
                  actions={['notify']}
                  onActionClick={handleActionClick}
                />
              </React.Fragment>
            ))}
          </Stack>
        </TabPanel>
        {/* Received Tab */}
        <TabPanel value={activeTab} index={1}>
          <Stack spacing={2}>
            {receivedPayments?.map((payment) => (
              <PaymentItem
                key={payment.id}
                paymentItem={payment}
                actions={['view', 'download']}
                onActionClick={handleActionClick}
              />
            ))}
          </Stack>
        </TabPanel>
      </Card>
    </Container>
  );
}