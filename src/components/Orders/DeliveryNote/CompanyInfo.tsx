import React from 'react';
import Logo from '../../common/Logo';

export default function CompanyInfo() {
  return (
    <div>
      <Logo size="sm" className="mb-4" />
      <div className="text-sm space-y-1">
        <p>Via Antonio Ferrara, snc</p>
        <p>95025 Aci S. Antonio (CT)</p>
        <p>T +39 095 520966</p>
        <p>F +39 095 522700</p>
        <p>info@bibalfoods.com</p>
        <p>bibalfoodssrls@pec.it</p>
        <p>P.iva e C.F. 05412700873</p>
        <p>C.C.I.A n. 227547944</p>
        <p>REA CT-364736</p>
      </div>
    </div>
  );
}