import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, ChefHat, TrendingUp, Package, ShoppingBag, LogOut, Factory, UserCog, ShoppingCart, AlertTriangle, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const allowedRoutes = user?.allowedRoutes || [];
  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/', name: 'Home', icon: Calculator, show: true },
    { path: '/production', name: 'Produzione', icon: Factory, show: allowedRoutes.includes('/production') },
    { path: '/statistics', name: 'Statistiche', icon: TrendingUp, show: allowedRoutes.includes('/statistics') },
    { path: '/recipes', name: 'Ricette', icon: ChefHat, show: allowedRoutes.includes('/recipes') },
    { path: '/inventory', name: 'Magazzino', icon: Package, show: allowedRoutes.includes('/inventory') },
    { path: '/orders', name: 'Ordini', icon: ShoppingBag, show: allowedRoutes.includes('/orders') },
    { path: '/purchases', name: 'Acquisti', icon: ShoppingCart, show: allowedRoutes.includes('/purchases') },
    { path: '/complaints', name: 'Reclami', icon: AlertTriangle, show: allowedRoutes.includes('/complaints') },
    { path: '/agents', name: 'Agenti', icon: Users, show: isAdmin },
    { path: '/customers', name: 'I Miei Clienti', icon: Users, show: isAgent }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            {visibleMenuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <item.icon className="h-5 w-5 inline-block mr-1" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg">
              {user?.role === 'production' ? (
                <Factory className="h-5 w-5 text-blue-600 mr-2" />
              ) : user?.role === 'admin' ? (
                <UserCog className="h-5 w-5 text-indigo-600 mr-2" />
              ) : (
                <Users className="h-5 w-5 text-purple-600 mr-2" />
              )}
              <span className="text-sm font-medium">
                {user?.role === 'production' ? 'Area Produzione' : 
                 user?.role === 'admin' ? 'Area Amministrazione' : 'Area Agenti'}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Esci</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}