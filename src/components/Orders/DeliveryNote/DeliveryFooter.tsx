import React from 'react';

interface DeliveryFooterProps {
  totalPallets: number;
}

export default function DeliveryFooter({ totalPallets }: DeliveryFooterProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Aspetto esteriore beni:</span> CARTONE</p>
          <p><span className="font-semibold">Consegna o inizio trasporto:</span> VETTORE</p>
          <p><span className="font-semibold">Vettore:</span> ARCO SPEDIZIONI</p>
          <p><span className="font-semibold">Porto:</span> PORTO FRANCO</p>
        </div>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Numero Colli:</span> {totalPallets}</p>
          <p><span className="font-semibold">Data e Ora:</span> {new Date().toLocaleString()}</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold">Firma Conducente</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
            <div>
              <p className="font-semibold">Firma Destinatario</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        <p>Documento di Trasporto (DDT) ai sensi del DPR 472/96 e DPR 696/96</p>
        <p>www.bibalfoods.com</p>
      </div>
    </>
  );
}