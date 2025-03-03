import { getMockIncomingPayments, getMockReceivedPayments } from '../../lib/mockData';
import ReceiverDashboard from './ReceiverDashboard';

export default function ReceiverDashboardPage() {
  // In a real app, these would be database or API calls
  // With SSR, these fetches happen on the server without exposing endpoints to the client
  const incomingPayments = getMockIncomingPayments();
  const receivedPayments = getMockReceivedPayments();

  return (
    <ReceiverDashboard incomingPayments={incomingPayments} receivedPayments={receivedPayments} />
  );
}