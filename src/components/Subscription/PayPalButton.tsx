import React, { useEffect, useRef } from 'react';
import { usePayPal } from '../../hooks/usePayPal';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface PayPalButtonProps {
  onSuccess: () => void;
  onError?: (error: any) => void;
}

export default function PayPalButton({ onSuccess, onError }: PayPalButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { isLoading, error, initializeButton } = usePayPal();

  useEffect(() => {
    if (buttonRef.current) {
      initializeButton(buttonRef.current, {
        onApprove: async () => {
          onSuccess();
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          onError?.(err);
        }
      });
    }
  }, [initializeButton, onSuccess, onError]);

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        ref={buttonRef} 
        className="min-h-[150px] flex items-center justify-center"
      >
        {isLoading && (
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner />
            <span className="text-sm text-gray-500">
              Caricamento PayPal...
            </span>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">
          Pagamento sicuro tramite PayPal
        </p>
        <p className="text-xs text-gray-400">
          L'abbonamento si rinnoverà automaticamente ogni mese
        </p>
      </div>
    </div>
  );
}