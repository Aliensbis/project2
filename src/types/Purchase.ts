export type PurchaseCategory = 'raw-materials' | 'warehouse' | 'cleaning' | 'other';
export type PurchaseStatus = 'pending' | 'in-progress' | 'completed';

export interface PurchaseItem {
  id: string;
  name: string;
  category: PurchaseCategory;
  quantity: number;
  unit: string;
  urgent?: boolean;
  notes?: string;
}

export interface PurchaseList {
  id: string;
  title: string;
  createdAt: string;
  createdBy: string;
  items: PurchaseItem[];
  status: PurchaseStatus;
  completedItems: string[]; // Array of completed item IDs
}