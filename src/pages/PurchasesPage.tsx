import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePurchases } from '../hooks/usePurchases';
import { PurchaseCategory } from '../types/Purchase';
import PurchaseListHeader from '../components/Purchases/List/PurchaseListHeader';
import PurchaseListGrid from '../components/Purchases/List/PurchaseListGrid';
import PurchaseFormModal from '../components/Purchases/Form/PurchaseFormModal';

export default function PurchasesPage() {
  const { user } = useAuth();
  const { lists, createList, updateItemStatus, deleteList } = usePurchases();
  const [showNewList, setShowNewList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PurchaseCategory | 'all'>('all');

  const filteredLists = lists.filter(list => 
    selectedCategory === 'all' || list.items.some(item => item.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-purple-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Gestione Acquisti</h1>
        </div>

        <PurchaseListHeader
          onNewList={() => setShowNewList(true)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showNewButton={user?.role === 'production'}
        />

        <PurchaseListGrid
          lists={filteredLists}
          isAdmin={user?.role === 'admin'}
          onUpdateItem={updateItemStatus}
          onDelete={deleteList}
        />

        {showNewList && (
          <PurchaseFormModal
            onSubmit={(title, items) => {
              createList(title, items, user?.id || '');
              setShowNewList(false);
            }}
            onClose={() => setShowNewList(false)}
          />
        )}
      </div>
    </div>
  );
}