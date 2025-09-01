import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../App.css'
const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = admin.token;
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
      setStats({
        totalUsers: response.data.length,
        activeUsers: response.data.filter(user => new Date(user.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = admin.token;
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.filter(user => user._id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent via-primary to-secondary flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 animate-pulse"></div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary bg-gradient-to-r from-primary to-secondary"></div>
          <p className="text-white font-inter mt-4 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard min-h-screen bg-gradient-to-br from-accent via-primary to-secondary relative overflow-hidden">
      {/* Animated Background Elements */}


      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-righteous bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/80 font-inter text-lg">Manage your TechGadget ecosystem</p>
          </div>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 font-inter px-8 py-3 rounded-xl backdrop-blur-md border border-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 font-inter text-sm uppercase tracking-wider">Total Users</p>
                <p className="text-3xl font-righteous text-white mt-2">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-secondary/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 font-inter text-sm uppercase tracking-wider">Active Users</p>
                <p className="text-3xl font-righteous text-white mt-2">{stats.activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-accent/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 font-inter text-sm uppercase tracking-wider">System Status</p>
                <p className="text-xl font-righteous text-green-400 mt-2">Online</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-righteous bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                Welcome back, Admin!
              </h2>
              <p className="text-white/70 font-inter">You're in control of the TechGadget platform</p>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-secondary/30 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-righteous bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
              User Management
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden border border-white/10">
              <thead className="bg-gradient-to-r from-primary/20 to-secondary/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-inter font-semibold text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-inter font-semibold text-white uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-inter font-semibold text-white uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-inter font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-righteous text-sm">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-white font-inter font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/90 font-inter">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/70 font-inter">{new Date(user.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 font-inter px-4 py-2 rounded-lg border border-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
