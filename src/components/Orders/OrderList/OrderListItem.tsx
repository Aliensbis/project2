import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { Order, Customer } from '../../../types/Order';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate } from '../../../utils/dateUtils';
import OrderStatusBadge from './OrderStatusBadge';
import EditOrderForm from '../Forms/EditOrderForm';
import ProductionOrderView from '../ProductionOrderView';
import AdminOrderView from '../AdminOrderView';
import AgentOrderView from '../AgentOrderView';

interface OrderListItemProps {
  order: Order;
  customer: Customer;
  customers: Customer[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
  onDeleteOrder: (orderId: string) => void;
}

export default function OrderListItem({
  order,
  customer,
  customers,
  isExpanded,
  onToggle,
  onUpdateOrder,
  onDeleteOrder
}: OrderListItemProps) {
  const { user } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const totalBoxes = order.items.reduce((sum, item) => sum + item.boxes, 0);

  const isProduction = user?.role === 'production';
  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';
  
  // Allow editing for all statuses except 'shipped'
  const canEdit = order.status !== 'shipped' && (
    isAdmin || 
    isProduction || 
    (isAgent && order.agentId === user.id)
  );
  
  // Allow deletion for admin and production roles
  const canDelete = (isAdmin || isProduction) && order.status !== 'shipped';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sei sicuro di voler eliminare questo ordine? Questa azione non può essere annullata.')) {
      onDeleteOrder(order.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canEdit) {
      setShowEditForm(true);
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 last:border-0">
        <div className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer flex-grow"
              onClick={onToggle}
            >
              {isExpanded 
                ? <ChevronDown className="h-5 w-5 text-gray-400" />
                : <ChevronRight className="h-5 w-5 text-gray-400" />
              }
              <div>
                <h4 className="font-medium text-gray-900">{customer.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatDate(order.date)} • {totalBoxes} cartoni • {order.totalPallets} pedane
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <OrderStatusBadge status={order.status} />
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleEdit}
                  disabled={!canEdit}
                  className={`p-2 rounded ${
                    canEdit 
                      ? 'text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title={canEdit ? 'Modifica ordine' : 'Non puoi modificare un ordine spedito'}
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                {(isAdmin || isProduction) && (
                  <button
                    onClick={handleDelete}
                    disabled={!canDelete}
                    className={`p-2 rounded ${
                      canDelete 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={canDelete ? 'Elimina ordine' : 'Non puoi eliminare un ordine spedito'}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4">
            {isProduction ? (
              <ProductionOrderView
                order={order}
                onUpdateOrder={onUpdateOrder}
              />
            ) : isAdmin ? (
              <AdminOrderView
                order={order}
                customer={customer}
              />
            ) : isAgent ? (
              <AgentOrderView
                order={order}
                customer={customer}
                onUpdateOrder={onUpdateOrder}
              />
            ) : (
              <div className="text-sm text-gray-600">
                <p>Stato: {order.status}</p>
                <p>Cartoni completati: {order.items.reduce((sum, item) => sum + (item.completed || 0), 0)} / {totalBoxes}</p>
                {order.notes && <p>Note: {order.notes}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {showEditForm && canEdit && (
        <EditOrderForm
          order={order}
          onSubmit={(updates) => {
            onUpdateOrder(order.id, updates);
            setShowEditForm(false);
          }}
          onClose={() => setShowEditForm(false)}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}