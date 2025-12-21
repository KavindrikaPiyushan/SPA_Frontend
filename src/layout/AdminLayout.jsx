import React, { useState } from 'react';
import { Settings, LogOut, Calendar, Package, FileText, ChevronRight, Bell, Search, Moon, Sun, User, Mail, Phone, MapPin, Save } from 'lucide-react';

export default function AdminLayout() {
  const [activeSection, setActiveSection] = useState('services');
  const [activePage, setActivePage] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [accountData, setAccountData] = useState({
    name: 'John Doe',
    email: 'john.doe@spa.com',
    phone: '+1 (555) 123-4567',
    address: '123 Spa Street, Wellness City',
    role: 'Administrator'
  });

  const sections = {
    services: ['Overview', 'Active Services', 'Add New', 'Categories'],
    bookings: ['All Bookings', 'Pending', 'Confirmed', 'Completed', 'Cancelled'],
    logs: ['Activity Log', 'System Logs', 'Error Logs', 'Audit Trail'],
    settings: ['Account Details', 'Preferences', 'Security', 'Notifications']
  };

  const sectionIcons = {
    services: Package,
    bookings: Calendar,
    logs: FileText,
    settings: Settings
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        {/* Profile Section */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
                        onClick={() => setActivePage(page)}
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
          }`}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4`}>
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
            {activeSection === 'settings' && activePage === 'Account Details' ? (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-8`}>
                <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Details</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-3xl">
                      JD
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Change Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <User className="inline w-4 h-4 mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Role
                      </label>
                      <input
                        type="text"
                        value={accountData.role}
                        disabled
                        className={`w-full px-4 py-2 border rounded-lg ${
                          darkMode ? 'bg-gray-600 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500'
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <MapPin className="inline w-4 h-4 mr-2" />
                        Address
                      </label>
                      <input
                        type="text"
                        value={accountData.address}
                        onChange={(e) => setAccountData({...accountData, address: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <button className={`px-6 py-2 border rounded-lg transition-colors ${
                      darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Item {i}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Sample content for {activePage} in {activeSection} section.
                    </p>
                    <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>Updated 2h ago</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}