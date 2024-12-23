import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useCustomers } from '../../hooks/useCustomers';

export default function AgentCustomerCard() {
  const { customers } = useCustomers();

  return (
    <Link to="/customers" className="transform hover:scale-105 transition-transform">
      <div className="bg-white p-6 rounded-lg shadow-md h-full relative">
        <Users className="h-12 w-12 text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold mb-2">I Miei Clienti</h2>
        <p className="text-gray-600">
          Gestisci e visualizza i tuoi clienti assegnati ({customers.length} clienti)
        </p>
      </div>
    </Link>
  );
}