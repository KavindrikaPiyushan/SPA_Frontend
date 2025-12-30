import React, { useState } from 'react';
import { Settings, LogOut, Calendar, Package, FileText, ChevronRight, Bell, Search, Moon, Sun, User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DarkModeProvider } from '../context/DarkModeContext';
import useApi from '../api/hooks/useApi';
import {logout} from '../api/service/auth.service.js';
import { useAuth } from '../context/useAuth.js';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('services');
  const [activePage, setActivePage] = useState('Create Services');
  const [darkMode, setDarkMode] = useState(false);
  const [accountData, setAccountData] = useState({
    name: 'John Doe',
    email: 'john.doe@spa.com',
    phone: '+1 (555) 123-4567',
    address: '123 Spa Street, Wellness City',
    role: 'Administrator'
  });
  const { setIsAuthenticated } = useAuth();

  const sections = {
    services: ['Create Services', 'Active Services', 'Inactive Services'],
    bookings: ['All Bookings', 'Pending', 'Confirmed', 'Completed', 'Cancelled'],
    logs: ['All Logs'],
    settings: ['Account Details', 'Notifications']
  };

  const sectionIcons = {
    services: Package,
    bookings: Calendar,
    logs: FileText,
    settings: Settings
  };

  // Map page names to routes
  const pageRoutes = {
    'Create Services': '/admin/create-service',
    'Active Services': '/admin/active-service',
    'Inactive Services': '/admin/inactive-service'
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    const route = pageRoutes[page];
    if (route) {
      navigate(route);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <DarkModeProvider darkMode={darkMode} setDarkMode={setDarkMode}>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Sidebar */}
        <div className={`w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        {/* Profile Section */}
        <div className={`h-22 p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              JD
            </div>
            <div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{accountData.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{accountData.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(sections).map(([key, pages]) => {
            const Icon = sectionIcons[key];
            const isActive = activeSection === key;
            
            return (
              <div key={key} className="mb-2">
                <button
                  onClick={() => setActiveSection(key)}
                  className={`w-full px-6 py-3 flex items-center justify-between transition-colors ${
                    isActive 
                      ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium capitalize">{key}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </button>
                
                {isActive && (
                  <div className={darkMode ? 'bg-gray-900 py-1' : 'bg-gray-50 py-1'}>
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`w-full px-6 py-2 pl-14 text-left text-sm transition-colors ${
                          activePage === page
                            ? darkMode ? 'text-blue-400 bg-gray-900 font-medium' : 'text-blue-600 bg-blue-50 font-medium'
                            : darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button className={`w-full px-6 py-3 flex items-center space-x-3 transition-colors ${
            darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'
          }`} onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 h-22`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeSection}</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activePage}</p>
            </div>
            <div className="flex items-center space-x-4">
              
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                />
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className={`relative p-2 rounded-lg transition-colors ${
                darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
        <Outlet />
        </div>
        </div>
      </div>
      </div>
    </DarkModeProvider>
  );
}