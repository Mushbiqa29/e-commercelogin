import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { useAuth } from '../context/AuthContext';
import Robo from '../assets/robo.png'
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const { register, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      
    }
  }, [error]);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);

    if (result.success) {
      setAnimateIn(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Spline Background */}
       <img src={Robo} className=" absolute right-[-20px] bottom-[-67px] z-[100] pointer-events-none "/>
                
      <div className="fixed inset-0 z-0">
        {!splineLoaded && (
         <div className="fixed inset-0 bg-accent z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="text-white mt-4 font-inter font-semibold">Booting Innovation...</p>
      </div>
    </div>
        )}
        <Spline
          scene="https://prod.spline.design/RFIDBR7CA4maZQ8H/scene.splinecode"
          onLoad={() => setSplineLoaded(true)}
          className={`w-full h-full object-cover ${splineLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* Signup Form */}
      {splineLoaded && (
        <div className={`form w-full max-w-md mx-auto px-4 transition-all duration-500 ease-out ${animateIn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            {/* Form Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-righteous bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent mb-2">
                  TechGadget
                </h1>
                <p className="text-white/80 font-inter text-sm md:text-base">Next Generation E-Commerce Experience</p>
              </div>

              <h2 className="text-2xl md:text-3xl font-righteous bg-gradient-to-r from-white to-primary bg-clip-text text-transparent mb-8 text-center">
                Create Account
              </h2>

              {error && (
                <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-white px-6 py-4 rounded-xl mb-6 text-sm font-inter backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2 font-inter">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm font-inter"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2 font-inter">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm font-inter"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2 font-inter">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm font-inter"
                      placeholder="Create a password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-2 font-inter">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm font-inter"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-righteous py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl hover:shadow-primary/20"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm font-inter">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:text-secondary font-medium transition-colors duration-300 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
