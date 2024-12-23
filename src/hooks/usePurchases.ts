import { useLocalStorage } from './useLocalStorage';
import { useNotifications } from './useNotifications';
import { PurchaseList, PurchaseItem } from '../types/Purchase';

export function usePurchases() {
  const [lists, setLists] = useLocalStorage<PurchaseList[]>('purchase_lists', []);
  const { addNotification } = useNotifications('system');

  const createList = (title: string, items: PurchaseItem[], createdBy: string) => {
    const newList: PurchaseList = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
      createdBy,
      items,
      status: 'pending',
      completedItems: []
    };

    setLists(prev => [newList, ...prev]);

    // Notify admin about new purchase list
    addNotification({
      userId: 'admin',
      title: 'Nuova Lista Acquisti',
      message: `È stata creata una nuova lista acquisti: ${title}`,
      type: 'system'
    });

    return newList;
  };

  const updateItemStatus = (listId: string, itemId: string, completed: boolean) => {
    setLists(prev => prev.map(list => {
      if (list.id !== listId) return list;

      const newCompletedItems = completed 
        ? [...list.completedItems, itemId]
        : list.completedItems.filter(id => id !== itemId);

      const allCompleted = list.items.every(item => 
        newCompletedItems.includes(item.id)
      );

      // Notify production about completed items
      if (completed) {
        const item = list.items.find(i => i.id === itemId);
        addNotification({
          userId: 'production',
          title: 'Articolo Acquistato',
          message: `${item?.name} è stato acquistato dalla lista "${list.title}"`,
          type: 'system'
        });
      }

      return {
        ...list,
        completedItems: newCompletedItems,
        status: allCompleted ? 'completed' : 'in-progress'
      };
    }));
  };

  const deleteList = (listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  };

  return {
    lists,
    createList,
    updateItemStatus,
    deleteList
  };
}