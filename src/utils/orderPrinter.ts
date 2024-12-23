import { jsPDF } from 'jspdf';
import { Order, Customer } from '../types/Order';
import { products } from '../data/products';
import { formatDate } from './dateUtils';

export function generateOrderPDF(order: Order, customer: Customer) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Header
  doc.setFontSize(20);
  doc.text('ORDINE', pageWidth / 2, 20, { align: 'center' });
  
  // Order Number and Date
  doc.setFontSize(12);
  doc.text(`Ordine N°: ${order.id}`, 20, 40);
  doc.text(`Data: ${formatDate(order.date)}`, 20, 50);

  // Customer Details
  doc.setFontSize(14);
  doc.text('CLIENTE:', 20, 70);
  doc.setFontSize(12);
  doc.text([
    customer.name,
    customer.address || '',
    customer.phone ? `Tel: ${customer.phone}` : '',
  ].filter(Boolean), 20, 80);

  // Products List
  doc.setFontSize(14);
  doc.text('PRODOTTI:', 20, 120);
  doc.setFontSize(12);

  let yPos = 130;
  order.items.forEach((item, index) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return;

    doc.text(`${index + 1}. ${product.name}`, 20, yPos);
    doc.text(`${item.boxes} cartoni`, 120, yPos);
    yPos += 10;
  });

  // Total Pallets
  yPos += 20;
  doc.text(`Totale Pedane: ${order.totalPallets}`, 20, yPos);

  // Notes (if any)
  if (order.notes) {
    yPos += 20;
    doc.setFontSize(14);
    doc.text('NOTE:', 20, yPos);
    doc.setFontSize(12);
    doc.text(order.notes, 20, yPos + 10);
  }

  // Save the PDF
  doc.save(`Ordine_${order.id}_${formatDate(order.date)}.pdf`);
}