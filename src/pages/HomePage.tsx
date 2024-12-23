import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChefHat, TrendingUp, Package, ShoppingBag, ShoppingCart, AlertTriangle, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useComplaints } from '../hooks/useComplaints';
import AgentCustomerCard from '../components/HomePage/AgentCustomerCard';

export default function HomePage() {
  const { user } = useAuth();
  const { hasNewComplaints } = useComplaints();
  const allowedRoutes = user?.allowedRoutes || [];
  const isAgent = user?.role === 'agent';

  const menuItems = [
    {
      path: '/orders',
      name: 'Ordini',
      description: 'Gestisci e monitora gli ordini dei clienti',
      icon: ShoppingBag,
      color: 'text-indigo-600',
      show: allowedRoutes.includes('/orders')
    },
    {
      path: '/complaints',
      name: 'Reclami',
      description: 'Gestisci i reclami dei clienti',
      icon: AlertTriangle,
      color: 'text-red-600',
      show: allowedRoutes.includes('/complaints'),
      notification: hasNewComplaints
    },
    {
      path: '/customers',
      name: 'I Miei Clienti',
      description: 'Visualizza e gestisci i tuoi clienti assegnati',
      icon: Users,
      color: 'text-blue-600',
      show: isAgent
    }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Benvenuto in Bibal Foods
          </h1>
          <p className="text-xl text-gray-600">
            Sistema di gestione della produzione alimentare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMenuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="transform hover:scale-105 transition-transform"
            >
              <div className="bg-white p-6 rounded-lg shadow-md h-full relative">
                {item.notification && (
                  <span className="absolute top-4 right-4 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
                <item.icon className={`h-12 w-12 ${item.color} mb-4`} />
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}