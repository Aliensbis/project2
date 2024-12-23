export function formatStripeError(error: any): string {
  if (typeof error === 'string') return error;
  
  if (error.type === 'StripeCardError') {
    return 'La carta è stata rifiutata. Controlla i dati e riprova.';
  }
  
  if (error.type === 'StripeInvalidRequestError') {
    return 'Richiesta non valida. Contatta il supporto.';
  }
  
  return 'Si è verificato un errore durante il pagamento. Riprova più tardi.';
}

export function validateStripeSession(session: any): boolean {
  return !!(
    session &&
    session.id &&
    typeof session.id === 'string' &&
    session.id.startsWith('cs_')
  );
}