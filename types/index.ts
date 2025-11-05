export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'charge' | 'recharge';
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  recipient?: {
    name: string;
    phoneNumber: string;
  };
  sender?: {
    name: string;
    phoneNumber: string;
  };
  description?: string;
  reference?: string;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  isFavorite: boolean;
  lastTransaction?: Date;
}

export interface Charge {
  id: string;
  amount: number;
  description: string;
  qrCode: string;
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'paid';
}

export interface PhoneRecharge {
  operator: 'Kolbi' | 'Claro' | 'Movistar';
  phoneNumber: string;
  amount: number;
}

export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type TransactionType = 'send' | 'receive' | 'charge' | 'recharge';

