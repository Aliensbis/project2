import type { StripeError } from '../../config/stripe/types';

const ERROR_MESSAGES: Record<string, string> = {
  card_declined: 'La carta è stata rifiutata. Verifica i dati e riprova.',
  expired_card: 'La carta è scaduta. Usa una carta valida.',
  incorrect_cvc: 'Il codice CVC non è corretto.',
  processing_error: 'Errore durante l\'elaborazione del pagamento. Riprova.',
  default: 'Si è verificato un errore durante il pagamento. Riprova più tardi.',
};

export function getStripeErrorMessage(error: StripeError): string {
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }
  return ERROR_MESSAGES.default;
}