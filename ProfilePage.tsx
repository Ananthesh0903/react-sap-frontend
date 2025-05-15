import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomerProfile } from '../services/customerService';
import { Customer } from '../types';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { User, MapPin, Phone, Mail, CreditCard, Building, Users, Globe } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.customerId) {
        try {
          const profileData = await getCustomerProfile(user.customerId);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching customer profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProfile();
  }, [user?.customerId]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-200 h-16 w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-32 mt-4"></div>
          <div className="h-3 bg-slate-200 rounded w-24 mt-2"></div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-slate-600">Profile not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customer Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage your account information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <Card title="Profile Information" subtitle="Your customer account details">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="bg-slate-100 p-6 rounded-full mb-4 md:mb-0 md:mr-6">
                  <User size={48} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{profile.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-slate-500 mr-3">Customer ID: {profile.id}</span>
                    <StatusBadge status={profile.accountStatus} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Address</p>
                      <p className="text-sm text-slate-500">{profile.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Phone</p>
                      <p className="text-sm text-slate-500">{profile.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Email</p>
                      <p className="text-sm text-slate-500">{profile.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CreditCard size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Credit Limit</p>
                      <p className="text-sm text-slate-500">${profile.creditLimit.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Customer Class</p>
                      <p className="text-sm text-slate-500">{profile.customerClass}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe size={20} className="text-slate-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Region</p>
                      <p className="text-sm text-slate-500">{profile.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Side Cards */}
        <div className="space-y-6">
          <Card title="Account Representative" className="bg-slate-50">
            <div className="flex items-center">
              <div className="bg-slate-200 p-3 rounded-full mr-4">
                <Users size={24} className="text-slate-700" />
              </div>
              <div>
                <h4 className="text-md font-medium text-slate-900">{profile.salesRepresentative}</h4>
                <p className="text-sm text-slate-500">Your dedicated representative</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  Contact Sales Rep
                </button>
                <span className="text-xs text-slate-400">Available 24/7</span>
              </div>
            </div>
          </Card>
          
          <Card title="Update Request" className="bg-slate-50">
            <p className="text-sm text-slate-600 mb-4">
              Need to update your profile information? Submit a request to your account representative.
            </p>
            <button className="w-full py-2 px-4 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50 text-sm font-medium transition-colors">
              Request Update
            </button>
          </Card>
          
          <Card title="Account Status" className="bg-slate-50">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-900">Your account is in good standing</p>
              <p className="mt-1 text-xs text-slate-500">Last verified: 2025-01-15</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;