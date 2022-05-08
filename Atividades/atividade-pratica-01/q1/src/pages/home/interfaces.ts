import React from 'react';

export interface PixKeysInterface {
  [key: string]: {
    label: string;
    mask?: string;
    type: React.InputHTMLAttributes<unknown>['type'];
  };
}

export interface HomeFormValues {
  keyValue: string;
  keyType: string;
  operationType: 'send' | 'receive';
  value: number;
  date: string;
  bank: string;
}

export interface BanksInterface {
  ispb: string;
  name: string;
  code: number;
  fullName: string;
}

export interface TransactionsInterface {
  currentBalance: number;
  transactions: HomeFormValues[];
}
