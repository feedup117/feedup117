export interface Partner {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  restaurantName: string;
  gstin: string;
  pan: string;
  fssai?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}