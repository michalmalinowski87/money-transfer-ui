import React from 'react';
import ClientApproverDashboard from './ClientApproverDashboard';
import { 
  getMockPendingApprovals, 
  getMockApprovedPayments, 
  getMockRejectedPayments 
} from '../../lib/mockData';

export default async function ApproverPage() {
  // In a real app, these would be database or API calls
  // With SSR, these fetches happen on the server without exposing endpoints to the client
  const pendingApprovals = getMockPendingApprovals();
  const approvedPayments = getMockApprovedPayments();
  const rejectedPayments = getMockRejectedPayments();

  return (
    <ClientApproverDashboard 
      pendingApprovals={pendingApprovals}
      approvedPayments={approvedPayments}
      rejectedPayments={rejectedPayments}
    />
  );
}