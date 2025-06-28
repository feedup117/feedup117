import axios from 'axios';
import { StaffMember } from '../types/staff';

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://api.feedup.com';

// Mock data for demo purposes
let mockStaffMembers: StaffMember[] = [
  {
    id: 's1',
    name: 'Amit Kumar',
    email: 'amit.kumar@spicegarden.com',
    phone: '9876543210',
    role: 'manager',
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: 's2',
    name: 'Priya Sharma',
    email: 'priya.sharma@spicegarden.com',
    phone: '9876543211',
    role: 'servant',
    isActive: true,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(), // 20 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: 's3',
    name: 'Rahul Singh',
    email: 'rahul.singh@spicegarden.com',
    phone: '9876543212',
    role: 'kitchen',
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(), // 15 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: 's4',
    name: 'Anita Gupta',
    email: 'anita.gupta@spicegarden.com',
    phone: '9876543213',
    role: 'servant',
    isActive: false,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 days ago
    updatedAt: new Date().toISOString()
  }
];

// Get all staff members
export const getStaffMembers = async (): Promise<StaffMember[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/staff`);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockStaffMembers;
  } catch (error) {
    console.error('Error fetching staff members:', error);
    throw error;
  }
};

// Add a new staff member
export const addStaffMember = async (staffData: any): Promise<StaffMember> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/staff`, staffData);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newStaff: StaffMember = {
      id: `s${Date.now()}`,
      name: staffData.name,
      email: staffData.email,
      phone: staffData.phone || '',
      role: staffData.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, this would be saved to the database
    mockStaffMembers.push(newStaff);
    
    return newStaff;
  } catch (error) {
    console.error('Error adding staff member:', error);
    throw error;
  }
};

// Update a staff member
export const updateStaffMember = async (staffId: string, staffData: any): Promise<StaffMember> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.put(`${API_URL}/staff/${staffId}`, staffData);
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update mock data
    const staffIndex = mockStaffMembers.findIndex(s => s.id === staffId);
    if (staffIndex === -1) {
      throw new Error('Staff member not found');
    }
    
    const updatedStaff: StaffMember = {
      ...mockStaffMembers[staffIndex],
      name: staffData.name,
      email: staffData.email,
      phone: staffData.phone || '',
      role: staffData.role,
      isActive: staffData.isActive !== undefined ? staffData.isActive : mockStaffMembers[staffIndex].isActive,
      updatedAt: new Date().toISOString()
    };
    
    mockStaffMembers[staffIndex] = updatedStaff;
    
    return updatedStaff;
  } catch (error) {
    console.error('Error updating staff member:', error);
    throw error;
  }
};

// Delete a staff member
export const deleteStaffMember = async (staffId: string): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.delete(`${API_URL}/staff/${staffId}`);
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update mock data
    mockStaffMembers = mockStaffMembers.filter(s => s.id !== staffId);
  } catch (error) {
    console.error('Error deleting staff member:', error);
    throw error;
  }
};

// Reset password for a staff member
export const resetPassword = async (staffId: string, newPassword: string): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.post(`${API_URL}/staff/${staffId}/reset-password`, { password: newPassword });
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, the password would be hashed and stored securely
    console.log(`Password reset for staff ${staffId} to ${newPassword}`);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};