export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'kitchen' | 'servant';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  tipUpiId?: string;
}