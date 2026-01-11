import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { useDarkMode } from '../../context/DarkModeContext';
import MediaCarousel from '../../components/MediaCarousel';

export default function ActiveService() {
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
      const { data } = await api.get('/api/services/getServices');
      console.log(data);
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Active Services
            </h1>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Browse our luxurious spa treatments
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-4 pl-14 border-2 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none ${
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
                Total Services: 
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
              <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Loading services...
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

        {/* Services Grid */}
        {!loading && !error && filteredServices.length === 0 && (
          <div className="text-center py-20">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-slate-100'
            }`}>
              <svg className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              No services found
            </h3>
            <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {searchTerm ? 'Try adjusting your search terms' : 'No active services available at the moment'}
            </p>
          </div>
        )}

        {!loading && !error && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.sid}
                className={`rounded-3xl shadow-xl overflow-hidden border-2 transition-all hover:shadow-2xl hover:scale-[1.02] ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                    : 'bg-white border-slate-100 hover:border-blue-300'
                }`}
              >
                {/* Media Carousel */}
                <MediaCarousel media={service.media} altText={service.name} />

                {/* Service Header */}
                <div className={`p-6 border-b-2 ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {service.name}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      darkMode 
                        ? 'bg-emerald-900/50 text-emerald-300' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      Active
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                      darkMode 
                        ? 'bg-blue-900/30 border border-blue-700' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`text-sm font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Body */}
                <div className="p-6">
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Service Footer */}
                <div className={`px-6 py-4 border-t-2 ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-slate-100 bg-slate-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      ID: {service.sid}
                    </span>
                    <button className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}