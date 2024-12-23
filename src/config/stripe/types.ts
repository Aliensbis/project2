export interface StripeSession {
  id: string;
  client_secret: string;
  subscription: string;
}

export interface StripeError {
  type: string;
  message: string;
  code?: string;
}