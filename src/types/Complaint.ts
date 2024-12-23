export type ComplaintSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved';

export interface Complaint {
  id: string;
  customerId: string;
  description: string;
  severity: ComplaintSeverity;
  status: ComplaintStatus;
  images: string[];
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

export interface ComplaintNotification {
  id: string;
  complaintId: string;
  type: 'new' | 'update' | 'resolved';
  message: string;
  createdAt: string;
  read: boolean;
}