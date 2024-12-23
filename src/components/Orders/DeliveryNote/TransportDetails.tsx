import React from 'react';

interface TransportDetailsProps {
  reference?: string;
  notes?: string;
}

export default function TransportDetails({ reference, notes }: TransportDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p><span className="font-semibold">Causale del trasporto:</span> VENDITA</p>
        <p><span className="font-semibold">Vostro Riferimento:</span> {reference || ''}</p>
        <p><span className="font-semibold">Note:</span> {notes || ''}</p>
      </div>
    </div>
  );
}