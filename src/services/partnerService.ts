import axios from 'axios';
import { Partner } from '../types/partner';

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://api.feedup.com';

// Mock data for demo purposes
const mockPendingPartners: Partner[] = [
  {
    id: 'p1',
    fullName: 'Rajesh Singh',
    email: 'rajesh@spicegarden.com',
    phone: '9876543210',
    restaurantName: 'Spice Garden',
    gstin: '27AABCU9603R1ZX',
    pan: 'ABCDE1234F',
    fssai: '12345678901234',
    address: '123 Food Street, Gourmet District',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p2',
    fullName: 'Anita Gupta',
    email: 'anita@pizzaparadise.com',
    phone: '9876543211',
    restaurantName: 'Pizza Paradise',
    gstin: '29AABCU9603R1ZY',
    pan: 'FGHIJ5678K',
    fssai: '23456789012345',
    address: '456 Cuisine Avenue, Food Court',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'p3',
    fullName: 'Vikram Patel',
    email: 'vikram@burgerbarn.com',
    phone: '9876543212',
    restaurantName: 'Burger Barn',
    gstin: '24AABCU9603R1ZZ',
    pan: 'LMNOP6789Q',
    fssai: '34567890123456',
    address: '789 Delicious Drive, Taste Town',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    status: 'pending',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Register a new partner
export const registerPartner = async (partnerData: any): Promise<Partner> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/partners/register`, partnerData);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPartner: Partner = {
      id: `p${Date.now()}`,
      ...partnerData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, this would be saved to the database
    mockPendingPartners.push(newPartner);
    
    return newPartner;
  } catch (error) {
    console.error('Error registering partner:', error);
    throw error;
  }
};

// Get all pending partners
export const getPendingPartners = async (): Promise<Partner[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/partners/pending`);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockPendingPartners;
  } catch (error) {
    console.error('Error fetching pending partners:', error);
    throw error;
  }
};

// Approve a partner
export const approvePartner = async (partnerId: string): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.post(`${API_URL}/partners/${partnerId}/approve`);
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update mock data
    const partnerIndex = mockPendingPartners.findIndex(p => p.id === partnerId);
    if (partnerIndex !== -1) {
      mockPendingPartners.splice(partnerIndex, 1);
    }
  } catch (error) {
    console.error('Error approving partner:', error);
    throw error;
  }
};

// Reject a partner
export const rejectPartner = async (partnerId: string, reason?: string): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.post(`${API_URL}/partners/${partnerId}/reject`, { reason });
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update mock data
    const partnerIndex = mockPendingPartners.findIndex(p => p.id === partnerId);
    if (partnerIndex !== -1) {
      mockPendingPartners.splice(partnerIndex, 1);
    }
  } catch (error) {
    console.error('Error rejecting partner:', error);
    throw error;
  }
};

// Get partner by ID
export const getPartnerById = async (partnerId: string): Promise<Partner | null> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/partners/${partnerId}`);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const partner = mockPendingPartners.find(p => p.id === partnerId);
    return partner || null;
  } catch (error) {
    console.error('Error fetching partner:', error);
    throw error;
  }
};