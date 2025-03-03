// Mock data for the approver dashboard
export const getMockPendingApprovals = () => ([{
    id: '1',
    recipient: 'Tech Solutions Inc',
    initiator: 'John Doe',
    amount: '$3,450.00',
    date: 'Feb 26, 2025',
    method: 'Bank Transfer',
    reference: 'Invoice #TS-2025-0342',
    details: {
    'Account Name': 'Tech Solutions Inc',
    'Account Number': '12345678',
    'Sort Code': '12-34-56',
    'Bank': 'Chase Bank',
    'Address': '123 Tech Street, New York, NY 10001',
    'Description': 'Enterprise Software License'
    }
},
{
    id: '2',
    recipient: 'Marketing Partners',
    initiator: 'Jane Smith',
    amount: '£1,800.00',
    date: 'Feb 25, 2025',
    method: 'PayPal',
    reference: 'Contract MP-2025-Q1',
    details: {
    'PayPal Email': 'payments@marketingpartners.com',
    'Payment Type': 'Service',
    'Description': 'Q1 2025 Marketing Services'
    }
}]);
  
export const getMockApprovedPayments = () => ([{
    id: '3',
    recipient: 'Software Services Ltd',
    amount: '$5,000.00',
    date: 'Feb 20, 2025',
    status: 'completed',
    method: 'Bank Transfer',
    reference: 'LIC-2025-ENT-001',
    approver: 'You'
},
{
    id: '4',
    recipient: 'Office Supplies Co',
    amount: '€1,250.75',
    date: 'Feb 18, 2025',
    status: 'completed',
    method: 'Credit Card',
    reference: 'PO-2025-0087',
    approver: 'You'
}]);

export const getMockRejectedPayments = () => ([{
    id: '5',
    recipient: 'Questionable Vendor',
    amount: '$12,000.00',
    date: 'Feb 15, 2025',
    status: 'rejected',
    method: 'Bank Transfer',
    approver: 'You',
    reason: 'Suspicious transaction amount'
},
{
    id: '6',
    recipient: 'Unknown Services Ltd',
    amount: '£8,750.00',
    date: 'Feb 10, 2025',
    status: 'rejected',
    method: 'Wire Transfer',
    approver: 'You',
    reason: 'Incomplete banking information'
}]);

export const getMockIncomingPayments = () => [
  {
    id: '1',
    sender: 'Global Corp',
    amount: '$2,580.00',
    initiatedDate: 'Feb 25, 2025',
    expectedDate: 'Feb 27, 2025',
    reference: 'Invoice #GC-10458',
    status: 'processing',
    statusTimeline: [
      { date: 'Feb 25, 2025 09:15', status: 'Payment Initiated', completed: true },
      { date: 'Feb 25, 2025 11:30', status: 'Payment Approved', completed: true },
      { date: 'Feb 26, 2025 14:45', status: 'Processing by Bank', completed: true },
      { date: 'Feb 27, 2025', status: 'Expected Arrival', completed: false }
    ]
  },
  {
    id: '2',
    sender: 'Tech Innovations',
    amount: '€1,750.00',
    initiatedDate: 'Feb 26, 2025',
    expectedDate: 'Mar 01, 2025',
    reference: 'Project Phase 1',
    status: 'approved',
    statusTimeline: [
      { date: 'Feb 26, 2025 10:20', status: 'Payment Initiated', completed: true },
      { date: 'Feb 26, 2025 16:45', status: 'Payment Approved', completed: true },
      { date: 'Pending', status: 'Processing by Bank', completed: false },
      { date: 'Mar 01, 2025', status: 'Expected Arrival', completed: false }
    ]
  }
];
  
export const getMockReceivedPayments = () => [
  {
    id: '3',
    sender: 'Software Solutions Inc',
    amount: '$3,450.00',
    date: 'Feb 20, 2025',
    status: 'completed',
    method: 'Bank Transfer',
    reference: 'Invoice #SS-1234'
  },
  {
    id: '4',
    sender: 'Digital Marketing Ltd',
    amount: '£1,800.00',
    date: 'Feb 18, 2025',
    status: 'completed',
    method: 'PayPal',
    reference: 'Project DM-2025-Q1'
  }
];
