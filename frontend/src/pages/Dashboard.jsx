import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBox, FaHeart, FaStar, FaTrophy, FaUser, FaFileAlt, FaShoppingCart, FaTruck, FaSignOutAlt, FaHome, FaKeyboard } from 'react-icons/fa';
import '../App.css'
const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { title: 'Total Orders', value: '12', icon: <FaBox className="text-blue-400" />, color: 'from-blue-500/20 to-blue-600/20' },
    { title: 'Wishlist Items', value: '8', icon: <FaHeart className="text-red-400" />, color: 'from-red-500/20 to-red-600/20' },
    { title: 'Reviews Given', value: '5', icon: <FaStar className="text-yellow-400" />, color: 'from-yellow-500/20 to-yellow-600/20' },
    { title: 'Loyalty Points', value: '1,250', icon: <FaTrophy className="text-purple-400" />, color: 'from-purple-500/20 to-purple-600/20' }
  ];

  const recentOrders = [
    { id: '#1234', product: 'Wireless Headphones', status: 'Delivered', date: '2024-01-15' },
    { id: '#1235', product: 'Smart Watch', status: 'In Transit', date: '2024-01-12' },
    { id: '#1236', product: 'Gaming Mouse', status: 'Processing', date: '2024-01-10' }
  ];

  return (
    <div className="dashboard min-h-screen bg-gradient-to-br from-accent/70 via-primary/70 to-secondary/70 relative overflow-hidden">
      {/* Fixed Background */}
   


      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-righteous bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent mb-2">
              TechGadget Dashboard
            </h1>
            <p className="text-white/80 font-inter text-lg">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 font-inter px-8 py-3 rounded-xl backdrop-blur-md border border-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-righteous text-white">{stat.value}</p>
                  <p className="text-white/70 font-inter text-sm">{stat.title}</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-righteous bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  Welcome back, {user?.name}!
                </h2>
                <p className="text-white/70 font-inter">Ready to explore the latest in tech gadgets?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                <h3 className="font-righteous text-xl text-white mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white font-inter py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <FaShoppingCart /> Browse Products
                  </button>
                  <button className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white font-inter py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <FaTruck /> View Cart
                  </button>
                  <button className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white font-inter py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <FaBox /> Track Orders
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/20">
                <h3 className="font-righteous text-xl text-white mb-3">Account Info</h3>
                <div className="space-y-2">
                  <p className="text-white/80 font-inter text-sm">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-white/80 font-inter text-sm">
                    <span className="font-medium">Member since:</span> January 2024
                  </p>
                  <p className="text-white/80 font-inter text-sm">
                    <span className="font-medium">Status:</span>
                    <span className="text-green-400 ml-1">Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-secondary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center">
                <FaFileAlt className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-righteous bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                Recent Orders
              </h3>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="bg-gradient-to-r from-white/5 to-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-inter font-medium">{order.product}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-inter ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-white/60 font-inter text-sm">Order {order.id} • {order.date}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-secondary/20 to-primary/20 hover:from-secondary/30 hover:to-primary/30 text-white font-inter py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 border border-secondary/30 flex items-center justify-center gap-2">
              <FaBox /> View All Orders
            </button>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-accent/30 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
              <FaHeart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-righteous bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Recommended for You
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Wireless Earbuds', price: '$129', icon: <FaBox className="text-4xl mb-2" />, discount: '20% OFF' },
              { name: 'Smart Home Hub', price: '$89', icon: <FaHome className="text-4xl mb-2" />, discount: 'New' },
              { name: 'Gaming Keyboard', price: '$159', icon: <FaKeyboard className="text-4xl mb-2" />, discount: 'Bestseller' }
            ].map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <div className="text-center mb-4">
                  {product.icon}
                  <span className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs font-inter px-2 py-1 rounded-full">
                    {product.discount}
                  </span>
                </div>
                <h4 className="text-white font-righteous text-lg mb-2 text-center">{product.name}</h4>
                <p className="text-white/80 font-inter text-sm mb-4 text-center">{product.price}</p>
                <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-inter py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;