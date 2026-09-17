import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TransactionRecord, ImportPreviewItem, TransactionCategory, PaymentStatus, PaymentMethod } from '../types/data-import';
import { INITIAL_SEED_RECORDS } from '../data/sample-imports';
import { formatDateToPretty } from '../utils/date-formatter';

interface DataImportContextType {
  records: TransactionRecord[];
  selectedImportDate: string; // ISO: YYYY-MM-DD (e.g. "2026-05-05")
  setSelectedImportDate: (date: string) => void;
  isImportModalOpen: boolean;
  openImportModal: (initialDate?: string) => void;
  closeImportModal: () => void;
  isRecordsDrawerOpen: boolean;
  openRecordsDrawer: (filterDate?: string) => void;
  closeRecordsDrawer: () => void;
  drawerFilterDate: string | null;
  setDrawerFilterDate: (date: string | null) => void;
  appendImportedRecords: (items: ImportPreviewItem[], targetDate: string) => { addedCount: number; newTotal: number };
  deleteRecord: (id: string) => void;
  exportCSV: (dateFilter?: string) => void;
  exportJSON: (dateFilter?: string) => void;
  resetToSampleData: () => void;
}

const STORAGE_KEY = 'digha-resort-transactions-v2';
const DEFAULT_DATE = '2026-05-05'; // 5 May 2026 as per user specification example

const DataImportContext = createContext<DataImportContextType | undefined>(undefined);

export function DataImportProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<TransactionRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load transaction records from local storage:', e);
    }
    return INITIAL_SEED_RECORDS;
  });

  const [selectedImportDate, setSelectedImportDate] = useState<string>(DEFAULT_DATE);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRecordsDrawerOpen, setIsRecordsDrawerOpen] = useState(false);
  const [drawerFilterDate, setDrawerFilterDate] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save transaction records to storage:', e);
    }
  }, [records]);

  const openImportModal = useCallback((initialDate?: string) => {
    if (initialDate) {
      setSelectedImportDate(initialDate);
    }
    setIsImportModalOpen(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsImportModalOpen(false);
  }, []);

  const openRecordsDrawer = useCallback((filterDate?: string) => {
    if (filterDate) {
      setDrawerFilterDate(filterDate);
    }
    setIsRecordsDrawerOpen(true);
  }, []);

  const closeRecordsDrawer = useCallback(() => {
    setIsRecordsDrawerOpen(false);
  }, []);

  /**
   * Safe Append Engine:
   * Strictly preserves existing records and appends the newly imported records assigned to the selected date.
   */
  const appendImportedRecords = useCallback(
    (items: ImportPreviewItem[], targetDate: string) => {
      const batchId = `batch-${Date.now()}`;
      const formatted = formatDateToPretty(targetDate);
      const timestamp = new Date().toISOString();

      const newTransactions: TransactionRecord[] = items
        .filter((item) => item.isValid && item.selected)
        .map((item, idx) => {
          const dateCode = targetDate.replace(/-/g, '');
          const refIndex = String(idx + 1).padStart(3, '0');
          return {
            id: `rec-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
            reference: `RES-${dateCode}-${refIndex}`,
            assignedDate: targetDate,
            formattedDate: formatted,
            guestName: item.guestName,
            contactNumber: item.contactNumber || '',
            category: item.category as TransactionCategory,
            description: item.description,
            amount: Number(item.amount) || 0,
            paymentStatus: item.paymentStatus as PaymentStatus,
            paymentMethod: item.paymentMethod as PaymentMethod,
            guestCount: item.guestCount || 1,
            roomNumber: item.roomNumber || '',
            notes: item.notes || '',
            importedAt: timestamp,
            batchId: batchId,
          };
        });

      setRecords((prev) => {
        // NON-DESTRUCTIVE: Existing data is strictly preserved and never overwritten
        const updated = [...prev, ...newTransactions];
        return updated;
      });

      return {
        addedCount: newTransactions.length,
        newTotal: records.length + newTransactions.length,
      };
    },
    [records.length]
  );

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const resetToSampleData = useCallback(() => {
    setRecords(INITIAL_SEED_RECORDS);
  }, []);

  const exportCSV = useCallback(
    (dateFilter?: string) => {
      const filtered = dateFilter ? records.filter((r) => r.assignedDate === dateFilter) : records;
      const headers = [
        'ID',
        'Reference',
        'Assigned Date',
        'Guest Name',
        'Contact',
        'Category',
        'Description',
        'Amount (INR)',
        'Payment Status',
        'Payment Method',
        'Guests',
        'Room/Table',
        'Notes',
        'Imported At',
      ];

      const rows = filtered.map((r) => [
        `"${r.id}"`,
        `"${r.reference}"`,
        `"${r.assignedDate}"`,
        `"${r.guestName.replace(/"/g, '""')}"`,
        `"${(r.contactNumber || '').replace(/"/g, '""')}"`,
        `"${r.category}"`,
        `"${r.description.replace(/"/g, '""')}"`,
        r.amount,
        `"${r.paymentStatus}"`,
        `"${r.paymentMethod}"`,
        r.guestCount || 1,
        `"${(r.roomNumber || '').replace(/"/g, '""')}"`,
        `"${(r.notes || '').replace(/"/g, '""')}"`,
        `"${r.importedAt}"`,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      const filename = `digha_resort_records_${dateFilter ? dateFilter : 'all'}.csv`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [records]
  );

  const exportJSON = useCallback(
    (dateFilter?: string) => {
      const filtered = dateFilter ? records.filter((r) => r.assignedDate === dateFilter) : records;
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filtered, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `digha_resort_records_${dateFilter ? dateFilter : 'all'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    },
    [records]
  );

  return (
    <DataImportContext.Provider
      value={{
        records,
        selectedImportDate,
        setSelectedImportDate,
        isImportModalOpen,
        openImportModal,
        closeImportModal,
        isRecordsDrawerOpen,
        openRecordsDrawer,
        closeRecordsDrawer,
        drawerFilterDate,
        setDrawerFilterDate,
        appendImportedRecords,
        deleteRecord,
        exportCSV,
        exportJSON,
        resetToSampleData,
      }}
    >
      {children}
    </DataImportContext.Provider>
  );
}

export function useDataImport() {
  const context = useContext(DataImportContext);
  if (!context) {
    throw new Error('useDataImport must be used within a DataImportProvider');
  }
  return context;
}
