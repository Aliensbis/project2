import React from 'react';
import { User, Package, Calendar, TrendingUp } from 'lucide-react';
import { Customer, CustomerStats } from '../../types/Order';
import { formatDate } from '../../utils/dateUtils';

interface CustomerDetailsProps {
  customer: Customer;
  stats: CustomerStats;
  onDelete: (id: string) => void;
}

export default function CustomerDetails({ customer, stats, onDelete }: CustomerDetailsProps) {
  const getCustomerTier = (totalOrders: number) => {
    if (totalOrders >= 100) return { label: 'Premium', color: 'text-purple-600 bg-purple-50' };
    if (totalOrders >= 50) return { label: 'Gold', color: 'text-yellow-600 bg-yellow-50' };
    if (totalOrders >= 20) return { label: 'Silver', color: 'text-gray-600 bg-gray-50' };
    return { label: 'Bronze', color: 'text-orange-600 bg-orange-50' };
  };

  const tier = getCustomerTier(stats.totalOrders);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <User className="h-10 w-10 text-indigo-600 mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${tier.color}`}>
              Cliente {tier.label}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Sei sicuro di voler eliminare questo cliente? Questa azione non può essere annullata.')) {
              onDelete(customer.id);
            }
          }}
          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
        >
          Elimina Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informazioni Contatto</h3>
          <div className="space-y-3">
            {customer.address && (
              <p className="text-gray-600">
                <span className="font-medium">Indirizzo:</span> {customer.address}
              </p>
            )}
            {customer.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Telefono:</span> {customer.phone}
              </p>
            )}
            {customer.email && (
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {customer.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiche Cliente</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ordini Totali</span>
              <span className="font-semibold">{stats.totalOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ordini Completati</span>
              <span className="font-semibold text-green-600">{stats.completedOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ordini Cancellati</span>
              <span className="font-semibold text-red-600">{stats.cancelledOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cartoni Totali</span>
              <span className="font-semibold">{stats.totalBoxes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pedane Totali</span>
              <span className="font-semibold">{stats.totalPallets}</span>
            </div>
            {stats.lastOrderDate && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ultimo Ordine</span>
                <span className="font-semibold">{formatDate(stats.lastOrderDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trend Ordini</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-6 gap-4">
            {stats.orderTrend.map((trend, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600">{trend.period}</div>
                <div className="font-semibold">{trend.orders} ordini</div>
                <div className="text-sm text-gray-500">{trend.boxes} cartoni</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}