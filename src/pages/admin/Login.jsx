import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import logo from '../../assets/logo.png';
import {login} from '../../api/service/auth.service.js';
import useApi from '../../api/hooks/useApi.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const {request, loading, error} = useApi(login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await request ({email,password});
      console.log("Logged in successfully");
      navigate('/admin/create-service');
    }catch(err){
      console.error("Login failed",err);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dn9nnbrov/video/upload/v1766231025/bg1_jnls1y.mp4" type="video/mp4" />
      </video>
      
      {/* Enhanced Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
      
   

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md transform transition-all duration-500 ">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
        
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300">
          {/* Logo/Header with animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[#009d68] rounded-2xl mb-4 shadow-lg transform transition-all duration-300 hover:rotate-12 hover:scale-110">
              <img src={logo} alt="logo" className='w-12 h-12' />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-300">Sign in to continue your journey</p>
          </div>

          {/* Login Fields */}
          <div className="space-y-5">
            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2 transition-colors group-hover:text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 z-10 top-1/2 transform  -translate-y-1/2 w-5 h-5 transition-all duration-300 ${focusedField === 'email' ? 'text-emerald-500' : 'text-gray-400'}`} />               
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2 transition-colors group-hover:text-white">
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 z-10 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${focusedField === 'password' ? 'text-emerald-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-emerald-500 focus:ring-emerald-500 focus:ring-2 transition-all" />
                <span className="ml-2 text-gray-300 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium transition-all hover:underline">
                Forgot password?
              </a>
            </div>

              {error && <p>{error.response?.data?.message}</p>}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="relative w-full overflow-hidden text-white bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 border border-white/10">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center bg-white/90 backdrop-blur-sm justify-center px-4 py-3 border-2 border-white/30 rounded-xl hover:bg-white hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform group">
              <svg className="w-5 h-5 transition-transform " viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center bg-white/90 backdrop-blur-sm justify-center px-4 py-3 border-2 border-white/30 rounded-xl hover:bg-white hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform group">
              <svg className="w-5 h-5 transition-transform " fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors hover:underline">
              Sign up for free
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}