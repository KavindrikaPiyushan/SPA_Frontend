import React, { useState } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';

export default function CreateService() {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    aid: ''
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(prev => [...prev, ...files]);

    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));
    setMediaPreview(prev => [...prev, ...newPreviews]);
  };

  const removeMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreview(prev => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('aid', formData.aid);
      
      mediaFiles.forEach((file) => {
        formDataToSend.append('media', file);
      });

      const response = await fetch('/api/services', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Service created successfully! ID: ${data.sid}` });
        setFormData({ name: '', duration: '', description: '', aid: '' });
        setMediaFiles([]);
        setMediaPreview([]);
      } else {
        setMessage({ type: 'error', text: 'Failed to create service. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'}`}>
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Create New Service
              </h1>
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Add a luxurious treatment to your spa menu
              </p>
            </div>

            {/* Message Alert */}
            {message.text && (
              <div className={`mb-8 p-4 rounded-2xl border-2 ${
                message.type === 'success' 
                  ? darkMode ? 'bg-emerald-900/30 border-emerald-700' : 'bg-emerald-50 border-emerald-200'
                  : darkMode ? 'bg-rose-900/30 border-rose-700' : 'bg-rose-50 border-rose-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}>
                    {message.type === 'success' ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${
                    message.type === 'success' 
                      ? darkMode ? 'text-emerald-300' : 'text-emerald-800'
                      : darkMode ? 'text-rose-300' : 'text-rose-800'
                  }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* Service Name */}
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Service Name <span className="text-blue-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
                  }`}
                  placeholder="e.g., Swedish Massage, Facial Treatment"
                />
              </div>

              {/* Duration & Admin ID Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Duration */}
                <div>
                  <label htmlFor="duration" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Duration (min) <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      min="1"
                      className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                      }`}
                      placeholder="60"
                    />
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium pointer-events-none ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                      min
                    </div>
                  </div>
                </div>

                {/* Admin ID */}
                <div>
                  <label htmlFor="aid" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Admin ID <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="aid"
                    name="aid"
                    value={formData.aid}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
                    }`}
                    placeholder="Admin ID"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Description <span className="text-blue-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none resize-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
                  }`}
                  placeholder="Describe the service, its benefits, and what clients can expect..."
                />
              </div>

              {/* Media Upload */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Service Gallery
                </label>
                
                {/* Upload Area */}
                <div className="relative">
                  <input
                    type="file"
                    id="media-upload"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="media-upload"
                    className={`flex items-center justify-center w-full px-6 py-10 border-3 border-dashed rounded-2xl cursor-pointer transition-all group ${
                      darkMode 
                        ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50' 
                        : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                        darkMode 
                          ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 group-hover:from-blue-800/70 group-hover:to-blue-700/70' 
                          : 'bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300'
                      }`}>
                        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className={`text-base font-semibold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        Upload images or videos
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        PNG, JPG, MP4, MOV • Max 10MB per file
                      </p>
                    </div>
                  </label>
                </div>

                {/* Media Preview Grid */}
                {mediaPreview.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaPreview.map((media, index) => (
                      <div key={index} className={`relative group rounded-2xl overflow-hidden border-2 transition-all ${
                        darkMode 
                          ? 'border-gray-600 bg-gray-700 hover:border-blue-500' 
                          : 'border-slate-200 bg-slate-50 hover:border-blue-300'
                      }`}>
                        {media.type.startsWith('image/') ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-36 object-cover"
                          />
                        ) : (
                          <div className={`w-full h-36 flex items-center justify-center ${
                            darkMode 
                              ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                              : 'bg-gradient-to-br from-slate-100 to-slate-200'
                          }`}>
                            <div className="text-center">
                              <svg className={`h-12 w-12 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Video</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:scale-110 shadow-lg"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        {/* File Name */}
                        <div className={`p-3 border-t-2 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600' 
                            : 'bg-white border-slate-100'
                        }`}>
                          <p className={`text-xs font-medium truncate ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {media.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all transform ${
                    loading
                      ? darkMode ? 'bg-gray-600 cursor-not-allowed' : 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Service...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Create Service
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          All fields marked with <span className="text-blue-500">*</span> are required
        </p>
      </div>
    </div>
  );
}