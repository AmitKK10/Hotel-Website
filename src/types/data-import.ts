export type TransactionCategory =
  | 'room_booking'
  | 'dining'
  | 'spa_wellness'
  | 'concierge'
  | 'events';

export type PaymentStatus = 'paid' | 'pending' | 'partially_paid' | 'refunded';

export type PaymentMethod =
  | 'UPI'
  | 'Credit Card'
  | 'Debit Card'
  | 'Net Banking'
  | 'Cash'
  | 'Direct Transfer';

export interface TransactionRecord {
  id: string;
  reference: string;
  assignedDate: string; // ISO format: YYYY-MM-DD (e.g. "2026-05-05")
  formattedDate?: string; // e.g. "5 May 2026"
  guestName: string;
  contactNumber?: string;
  category: TransactionCategory;
  description: string; // e.g. "Deluxe Sea Facing Room - 2 Nights"
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  guestCount?: number;
  roomNumber?: string;
  notes?: string;
  importedAt: string;
  batchId: string;
}

export interface ImportPreviewItem {
  id: string;
  guestName: string;
  contactNumber?: string;
  category: TransactionCategory;
  description: string;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  guestCount?: number;
  roomNumber?: string;
  notes?: string;
  assignedDate: string;
  formattedDate: string;
  isValid: boolean;
  validationError?: string;
  selected: boolean;
}

export interface ImportSummary {
  selectedDate: string;
  formattedSelectedDate: string;
  totalParsed: number;
  validCount: number;
  invalidCount: number;
  totalAmount: number;
  existingRecordCount: number;
  projectedTotalCount: number;
}
