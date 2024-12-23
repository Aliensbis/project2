import { PurchaseCategory, PurchaseStatus } from '../types/Purchase';

export function getCategoryLabel(category: PurchaseCategory): string {
  switch (category) {
    case 'raw-materials':
      return 'Materie Prime';
    case 'warehouse':
      return 'Magazzino';
    case 'cleaning':
      return 'Pulizia';
    case 'other':
      return 'Altro';
  }
}

export function getStatusLabel(status: PurchaseStatus): string {
  switch (status) {
    case 'pending':
      return 'In Attesa';
    case 'in-progress':
      return 'In Corso';
    case 'completed':
      return 'Completata';
  }
}

export function calculateProgress(completedItems: string[], totalItems: number): number {
  return (completedItems.length / totalItems) * 100;
}