'use client';

import React, { useState } from 'react';
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
import Card from '../../components/atoms/Card/Card';
import PaymentItem from '../../components/molecules/PaymentItem/PaymentItem';
import PaymentDetails from '../../components/molecules/PaymentDetails/PaymentDetails';

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

export default function ClientApproverDashboard({ 
  pendingApprovals, 
  approvedPayments, 
  rejectedPayments
}) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleActionClick = (action, id) => {
    console.log(`Action: ${action}, Payment ID: ${id}`);
    // In a real app, this would trigger API calls using server actions
  };

  return (
    <Container maxWidth="lg">
      <PageHeader>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Approver Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Review and approve international money transfers
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
            <Tab label="Pending Approval" />
            <Tab label="Approved" />
            <Tab label="Rejected" />
          </Tabs>
        </Box>
        
        {/* Pending Approval Tab */}
        <TabPanel value={activeTab} index={0}>
          <Stack spacing={4}>
            {pendingApprovals.map((payment, index) => (
              <React.Fragment key={payment.id}>
                {index > 0 && <Divider />}
                <PaymentDetails
                  id={payment.id}
                  paymentItem={payment}
                  actions={['approve', 'reject', 'edit']}
                  onActionClick={handleActionClick}
                />
              </React.Fragment>
            ))}
            {pendingApprovals.length === 0 && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                No pending payments to approve
              </Box>
            )}
          </Stack>
        </TabPanel>
        
        {/* Approved Tab */}
        <TabPanel value={activeTab} index={1}>
          <Stack spacing={2}>
            {approvedPayments.map((payment) => (
              <PaymentItem
                key={payment.id}
                id={payment.id}
                paymentItem={payment}
                actions={['view']}
                onActionClick={handleActionClick}
              />
            ))}
            {approvedPayments.length === 0 && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                No approved payments
              </Box>
            )}
          </Stack>
        </TabPanel>
        
        {/* Rejected Tab */}
        <TabPanel value={activeTab} index={2}>
          <Stack spacing={2}>
            {rejectedPayments.map((payment) => (
              <PaymentItem
                key={payment.id}
                id={payment.id}
                paymentItem={payment}
                actions={['view']}
                onActionClick={handleActionClick}
              />
            ))}
            {rejectedPayments.length === 0 && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                No rejected payments
              </Box>
            )}
          </Stack>
        </TabPanel>
      </Card>
    </Container>
  );
}