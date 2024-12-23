import React from 'react';

interface DocumentInfoProps {
  id: string;
  date: string;
  vatNumber?: string;
}

export default function DocumentInfo({ id, date, vatNumber }: DocumentInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg font-bold mb-2">
          DOCUMENTO DI TRASPORTO {id}
        </h2>
        <p className="text-sm">(D.P.R. n. 472 del 14/08/96)</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">DATA {new Date(date).toLocaleDateString()}</p>
        <p className="text-sm">P.IVA {vatNumber || 'N/A'}</p>
      </div>
    </div>
  );
}