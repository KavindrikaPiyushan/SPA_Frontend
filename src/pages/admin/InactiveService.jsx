import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { useDarkMode } from '../../context/DarkModeContext';

export default function InactiveService() {
  const { darkMode } = useDarkMode();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setLoading(true);
      const { data } = await api.get('/api/services/inactive');
      
      setServices(data);
    } catch (err) {
      setError('Failed to load inactive services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async (sid) => {
    try {
      await api.patch(`/api/services/${sid}/reactivate`);
      
      // Remove the reactivated service from the list
      setServices(services.filter(service => service.sid !== sid));
    } catch (err) {
      console.error('Failed to reactivate service:', err);
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen px-4 sm:px-6 lg:px-8 py-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-slate-600 bg-clip-text text-transparent mb-2">
              Inactive Services
            </h1>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage and restore deactivated services
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inactive services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-4 pl-14 border-2 rounded-2xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all outline-none ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
              <svg 
                className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className={`px-6 py-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-slate-100'}`}>
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Inactive Services: 
              </span>
              <span className={`ml-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {filteredServices.length}
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-slate-500 mx-auto mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Loading inactive services...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={`max-w-2xl mx-auto p-6 rounded-2xl border-2 ${
            darkMode ? 'bg-rose-900/30 border-rose-700' : 'bg-rose-50 border-rose-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-rose-500">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className={`text-base font-medium ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredServices.length === 0 && (
          <div className="text-center py-20">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-slate-100'
            }`}>
              <svg className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              No inactive services
            </h3>
            <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {searchTerm ? 'Try adjusting your search terms' : 'All services are currently active'}
            </p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.sid}
                className={`rounded-3xl shadow-xl overflow-hidden border-2 transition-all hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Inactive Overlay Effect */}
                <div className="relative">
                  {/* Service Header */}
                  <div className={`p-6 border-b-2 ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {service.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        darkMode 
                          ? 'bg-slate-700 text-slate-400' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        Inactive
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                        darkMode 
                          ? 'bg-slate-700/50 border border-slate-600' 
                          : 'bg-slate-100 border border-slate-300'
                      }`}>
                        <svg className={`w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {service.duration} min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Body */}
                  <div className="p-6">
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Service Footer */}
                  <div className={`px-6 py-4 border-t-2 ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-slate-100 bg-slate-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        ID: {service.sid}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleReactivate(service.sid)}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          darkMode 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Reactivate
                        </span>
                      </button>
                      <button className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-slate-300' 
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Banner */}
        {!loading && !error && filteredServices.length > 0 && (
          <div className={`mt-8 p-6 rounded-2xl border-2 ${
            darkMode 
              ? 'bg-blue-900/20 border-blue-800' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-800' : 'bg-blue-500'
              }`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-sm font-bold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  About Inactive Services
                </h4>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  These services are currently inactive and not visible to customers. You can reactivate them at any time to make them available for booking again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}