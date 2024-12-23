import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, Clock } from 'lucide-react';
import { usePurchases } from '../../hooks/usePurchases';
import { useAuth } from '../../hooks/useAuth';
import { getCategoryLabel } from '../../utils/purchaseUtils';

export default function PurchasesCard() {
  const { lists } = usePurchases();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const pendingLists = lists.filter(list => list.status === 'pending');
  const inProgressLists = lists.filter(list => list.status === 'in-progress');
  const recentLists = lists.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingCart className="h-8 w-8 text-purple-600 mr-2" />
          <h2 className="text-xl font-semibold">Acquisti</h2>
        </div>
        <Link
          to="/purchases"
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          Vedi tutti
        </Link>
      </div>

      <div className="space-y-6">
        {isAdmin ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center text-yellow-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">In Attesa</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{pendingLists.length}</p>
                <p className="text-sm text-gray-600">liste da gestire</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">In Corso</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{inProgressLists.length}</p>
                <p className="text-sm text-gray-600">liste in lavorazione</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Liste Recenti</h3>
              <div className="space-y-2">
                {recentLists.map(list => (
                  <div key={list.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">{list.title}</span>
                      <span className={`text-sm ${
                        list.status === 'completed' ? 'text-green-600' :
                        list.status === 'in-progress' ? 'text-blue-600' : 'text-yellow-600'
                      }`}>
                        {list.status === 'completed' ? 'Completata' :
                         list.status === 'in-progress' ? 'In Corso' : 'In Attesa'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {list.completedItems.length} di {list.items.length} articoli completati
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Link
              to="/purchases"
              className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Crea Nuova Lista
            </Link>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Le Tue Liste</h3>
              <div className="space-y-2">
                {recentLists.map(list => (
                  <div key={list.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">{list.title}</span>
                      <span className="text-sm text-gray-500">
                        {list.items.length} articoli
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(list.items.map(item => item.category))).map(category => (
                        <span key={category} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {getCategoryLabel(category)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}