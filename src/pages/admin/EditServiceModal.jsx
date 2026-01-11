import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { api } from '../../api';
import axios from 'axios';

export default function EditServiceModal({ service, isOpen, onClose, onUpdate }) {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    aid: ''
  });
  const [existingMedia, setExistingMedia] = useState([]); // URLs of existing media
  const [newMediaFiles, setNewMediaFiles] = useState([]); // File objects for new uploads
  const [newMediaPreview, setNewMediaPreview] = useState([]); // Previews for new uploads
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        name: service.name || '',
        duration: service.duration ? String(service.duration).replace(' mins', '') : '', // Handle "60 mins" or "60"
        description: service.description || '',
        aid: service.aid || ''
      });
      setExistingMedia(service.media || []);
      setNewMediaFiles([]);
      setNewMediaPreview([]);
      setMessage({ type: '', text: '' });
    }
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadToCloudinary = async (file) => {
    try {
      const { data: { signature, timestamp, cloudName, apiKey } } = await api.post("/api/cloudinary/create-signature", {
        folder: "services"
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "services");

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData
      );

      return data.secure_url;
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewMediaFiles(prev => [...prev, ...files]);

    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));
    setNewMediaPreview(prev => [...prev, ...newPreviews]);
  };

  const removeExistingMedia = (indexToRemove) => {
    setExistingMedia(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeNewMedia = (indexToRemove) => {
    setNewMediaFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setNewMediaPreview(prev => {
      URL.revokeObjectURL(prev[indexToRemove].url);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Upload new media
      const uploadedUrls = await Promise.all(
        newMediaFiles.map(file => uploadToCloudinary(file))
      );

      // 2. Combine existing (kept) media with new uploaded media
      const finalMedia = [...existingMedia, ...uploadedUrls];

      // 3. Prepare payload
      // User requested "duration": "60 mins". 
      // If the input is just number 60, we might need to append ' mins' if the backend expects it, 
      // or just send the number if the backend handles it.
      // Based on the user request example: "duration": "60 mins"
      let formattedDuration = formData.duration;
      if (!String(formattedDuration).includes('mins')) {
         formattedDuration = `${formattedDuration} mins`;
      }

      const payload = {
        name: formData.name,
        duration: formattedDuration,
        description: formData.description,
        aid: Number(formData.aid), // Ensure aid is number if needed, user example showed aid: 1
        media: finalMedia
      };

      // 4. Send Update
      await api.put(`/api/services/updateService/${service.sid || service.id}`, payload);

      setMessage({ type: 'success', text: 'Service updated successfully!' });
      
      // Delay to show success message before closing/refreshing
      setTimeout(() => {
        onUpdate();
        onClose();
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to update service.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border my-8 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'
      }`}>
        <div className="p-8 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Edit Service
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Update service details and media
              </p>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-2xl border-2 ${
              message.type === 'success' 
                ? darkMode ? 'bg-emerald-900/30 border-emerald-700 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : darkMode ? 'bg-rose-900/30 border-rose-700 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            {/* Duration & Admin ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Duration (min)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Admin ID
                </label>
                <input
                  type="number"
                  name="aid"
                  value={formData.aid}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all resize-none ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            {/* Media Section */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Gallery
              </label>
              
              {/* Existing Media */}
              {existingMedia.length > 0 && (
                <div className="mb-4">
                  <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Current Images/Videos
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {existingMedia.map((item, index) => {
                      // Handle both string URLs and object with url property
                      const mediaUrl = typeof item === 'string' ? item : item?.url || '';
                      
                      return (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-square">
                          {/* Simple check for video extension */}
                          {mediaUrl.match(/\.(mp4|mov|webm)$/i) ? (
                            <video src={mediaUrl} className="w-full h-full object-cover" />
                          ) : (
                            <img src={mediaUrl} alt="Service media" className="w-full h-full object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => removeExistingMedia(index)}
                            className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Upload New */}
              <div className="relative">
                <input
                  type="file"
                  id="modal-media-upload"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <label
                  htmlFor="modal-media-upload"
                  className={`flex items-center justify-center w-full px-6 py-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                    darkMode 
                      ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50' 
                      : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    + Add New Images/Videos
                  </span>
                </label>
              </div>

              {/* New Media Previews */}
              {newMediaPreview.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {newMediaPreview.map((preview, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-square">
                      {preview.type.startsWith('image/') ? (
                        <img src={preview.url} alt="New upload" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <span className="text-xs text-gray-500">Video</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeNewMedia(index)}
                        className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 hover:shadow-blue-500/25'
                }`}
              >
                {loading ? 'Updating...' : 'Update Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
