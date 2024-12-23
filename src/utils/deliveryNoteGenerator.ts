import { jsPDF } from 'jspdf';
import { Order, Customer } from '../types/Order';
import { products } from '../data/products';
import { formatDate } from './dateUtils';

export const generateDeliveryNote = (order: Order, customer: Customer) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Header
  doc.setFontSize(20);
  doc.text('DOCUMENTO DI TRASPORTO', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`DDT N°: ${order.id}`, 20, 40);
  doc.text(`Data: ${formatDate(order.date)}`, 20, 50);

  // Customer Details
  doc.setFontSize(14);
  doc.text('DESTINATARIO:', 20, 70);
  doc.setFontSize(12);
  doc.text([
    customer.name,
    customer.address || '',
    `Tel: ${customer.phone || 'N/D'}`,
    `Email: ${customer.email || 'N/D'}`
  ], 20, 80);

  // Order Details
  doc.setFontSize(14);
  doc.text('DETTAGLIO PRODOTTI:', 20, 120);
  doc.setFontSize(10);

  let yPos = 130;
  order.items.forEach((item, index) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return;

    doc.text(`${index + 1}. ${product.name}`, 20, yPos);
    doc.text(`Cartoni: ${item.boxes}`, 120, yPos);
    yPos += 10;

    // Add lot information if available
    if (item.lots && item.lots.length > 0) {
      item.lots.forEach(lot => {
        doc.text(`   Lotto: ${lot.number} - Data prod.: ${formatDate(lot.productionDate)} - Cartoni: ${lot.boxes}`, 30, yPos);
        yPos += 7;
      });
    }
  });

  // Totals
  doc.setFontSize(12);
  doc.text(`Totale Cartoni: ${order.items.reduce((sum, item) => sum + item.boxes, 0)}`, 20, yPos + 10);
  doc.text(`Totale Pedane: ${order.totalPallets}`, 20, yPos + 20);

  // Notes
  if (order.notes) {
    doc.setFontSize(12);
    doc.text('Note:', 20, yPos + 40);
    doc.setFontSize(10);
    doc.text(order.notes, 20, yPos + 50);
  }

  // Footer
  const footerText = 'Documento di Trasporto (DDT) ai sensi del DPR 472/96 e DPR 696/96';
  doc.setFontSize(8);
  doc.text(footerText, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });

  // Save the PDF
  doc.save(`DDT_${order.id}_${customer.name.replace(/\s+/g, '_')}.pdf`);
};