import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDataImport } from '@/src/context/DataImportContext';
import {
  formatDateToPretty,
  formatDateWithWeekday,
  parseCSV,
} from '@/src/utils/date-formatter';
import {
  SAMPLE_CSV_TEMPLATE,
  SAMPLE_JSON_RECORDS,
} from '@/src/data/sample-imports';
import { ImportPreviewItem, TransactionCategory, PaymentStatus, PaymentMethod } from '@/src/types/data-import';
import {
  Calendar,
  Upload,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Download,
  Layers,
  ChevronRight,
  Info,
  Check,
  CalendarCheck2,
} from 'lucide-react';

export function DataImportModal() {
  const {
    isImportModalOpen,
    closeImportModal,
    selectedImportDate,
    setSelectedImportDate,
    appendImportedRecords,
    records: existingRecords,
    openRecordsDrawer,
  } = useDataImport();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal Step: 1 = Date & Source Select, 2 = Live Preview & Verification, 3 = Completed Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inputMode, setInputMode] = useState<'upload' | 'paste' | 'preset'>('upload');
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewItems, setPreviewItems] = useState<ImportPreviewItem[]>([]);
  const [importResult, setImportResult] = useState<{ addedCount: number; newTotal: number } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Quick Date presets
  const quickDates = [
    { label: '5 May 2026', value: '2026-05-05', note: 'Requested Target' },
    { label: '6 May 2026', value: '2026-05-06', note: 'Peak Season' },
    { label: '10 May 2026', value: '2026-05-10', note: 'Weekend Gala' },
    { label: '15 May 2026', value: '2026-05-15', note: 'Mid-Month' },
  ];

  // Format the selected date for human display
  const formattedSelectedDate = useMemo(() => {
    return formatDateToPretty(selectedImportDate);
  }, [selectedImportDate]);

  const detailedSelectedDate = useMemo(() => {
    return formatDateWithWeekday(selectedImportDate);
  }, [selectedImportDate]);

  // Process raw text or file data into preview records with the assigned date
  const processRawData = (content: string, sourceName?: string) => {
    if (!content.trim()) return;

    let items: ImportPreviewItem[] = [];

    // Try parsing as JSON first
    const trimmed = content.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const json = JSON.parse(trimmed);
        const array = Array.isArray(json) ? json : [json];
        items = array.map((row: any, idx: number) => {
          const guestName = row.guestName || row.name || row.guest || `Guest #${idx + 1}`;
          const amount = Number(row.amount || row.price || row.rate || 0);
          const category = (row.category || 'room_booking') as TransactionCategory;
          const description = row.description || row.roomType || row.item || 'Resort Stay & Services';
          const paymentStatus = (row.paymentStatus || row.status || 'paid') as PaymentStatus;
          const paymentMethod = (row.paymentMethod || 'UPI') as PaymentMethod;

          return {
            id: `preview-${idx}-${Date.now()}`,
            guestName,
            contactNumber: row.contactNumber || row.phone || row.contact || '',
            category,
            description,
            amount,
            paymentStatus,
            paymentMethod,
            guestCount: row.guestCount || row.guests || 2,
            roomNumber: row.roomNumber || row.room || '',
            notes: row.notes || '',
            assignedDate: selectedImportDate,
            formattedDate: formattedSelectedDate,
            isValid: true,
            selected: true,
          };
        });
      } catch (err) {
        console.warn('JSON parse attempt failed, falling back to CSV:', err);
      }
    }

    // If not JSON, parse as CSV
    if (items.length === 0) {
      const parsedRows = parseCSV(content);
      items = parsedRows.map((row, idx) => {
        const guestName =
          row['guest name'] || row['guest'] || row['name'] || row['customer'] || `Guest #${idx + 1}`;
        const amountStr = row['amount'] || row['rate'] || row['price'] || row['total'] || '0';
        const amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, '')) || 0;
        const rawCategory = (row['category'] || row['type'] || 'room_booking').toLowerCase();
        
        let category: TransactionCategory = 'room_booking';
        if (rawCategory.includes('din') || rawCategory.includes('food') || rawCategory.includes('rest')) {
          category = 'dining';
        } else if (rawCategory.includes('spa') || rawCategory.includes('well')) {
          category = 'spa_wellness';
        } else if (rawCategory.includes('conc') || rawCategory.includes('tour')) {
          category = 'concierge';
        } else if (rawCategory.includes('event')) {
          category = 'events';
        }

        const description =
          row['description'] || row['room'] || row['item'] || row['details'] || 'Resort Booking';
        const rawStatus = (row['status'] || row['payment status'] || 'paid').toLowerCase();
        let paymentStatus: PaymentStatus = 'paid';
        if (rawStatus.includes('pend')) paymentStatus = 'pending';
        else if (rawStatus.includes('part')) paymentStatus = 'partially_paid';
        else if (rawStatus.includes('ref')) paymentStatus = 'refunded';

        const paymentMethod = (row['payment method'] || row['method'] || 'UPI') as PaymentMethod;

        return {
          id: `preview-${idx}-${Date.now()}`,
          guestName,
          contactNumber: row['contact'] || row['phone'] || row['mobile'] || '',
          category,
          description,
          amount,
          paymentStatus,
          paymentMethod,
          guestCount: parseInt(row['guests'] || '2', 10) || 2,
          roomNumber: row['room number'] || row['room'] || row['table'] || '',
          notes: row['notes'] || row['special request'] || '',
          assignedDate: selectedImportDate,
          formattedDate: formattedSelectedDate,
          isValid: true,
          selected: true,
        };
      });
    }

    if (items.length > 0) {
      setPreviewItems(items);
      if (sourceName) setFileName(sourceName);
      setStep(2);
    }
  };

  // Re-sync assigned date if the user adjusts the date while on preview step
  const handleDateChange = (newDate: string) => {
    setSelectedImportDate(newDate);
    const newPretty = formatDateToPretty(newDate);
    setPreviewItems((prev) =>
      prev.map((item) => ({
        ...item,
        assignedDate: newDate,
        formattedDate: newPretty,
      }))
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        processRawData(text, file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          processRawData(text, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSampleCSV = () => {
    setFileName('sample_5_may_2026_resort_records.csv');
    processRawData(SAMPLE_CSV_TEMPLATE, 'sample_5_may_2026_resort_records.csv');
  };

  const handleLoadSampleJSON = () => {
    setFileName('sample_may_luxury_bookings.json');
    processRawData(JSON.stringify(SAMPLE_JSON_RECORDS, null, 2), 'sample_may_luxury_bookings.json');
  };

  const handleDownloadTemplate = () => {
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(SAMPLE_CSV_TEMPLATE);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `digha_resort_import_template_${selectedImportDate}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleItemSelection = (id: string) => {
    setPreviewItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleAllSelection = (select: boolean) => {
    setPreviewItems((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const handleExecuteImport = () => {
    const selectedRows = previewItems.filter((i) => i.selected && i.isValid);
    if (selectedRows.length === 0) return;

    const result = appendImportedRecords(selectedRows, selectedImportDate);
    setImportResult(result);
    setStep(3);
  };

  const handleResetModal = () => {
    setStep(1);
    setPreviewItems([]);
    setRawText('');
    setFileName(null);
    setImportResult(null);
  };

  if (!isImportModalOpen) return null;

  const validSelectedCount = previewItems.filter((i) => i.selected && i.isValid).length;
  const totalAmountSum = previewItems
    .filter((i) => i.selected && i.isValid)
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImportModal}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-4xl bg-[#030d1b] border border-[#c5a059]/35 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-stone-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#020a14]/90 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c5a059]/25 to-amber-500/10 border border-[#c5a059]/40 flex items-center justify-center text-[#f0e2b6] shadow-md">
                <FileSpreadsheet className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-serif font-semibold text-stone-100">
                    Date-Based Data Import
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#f0e2b6] text-[10px] font-mono uppercase tracking-wider">
                    Non-Destructive Append
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  Assign all imported records/transactions to your designated target date
                </p>
              </div>
            </div>

            <button
              onClick={closeImportModal}
              className="p-2 rounded-xl bg-stone-900/60 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="px-6 py-3 bg-[#010710]/80 border-b border-white/5 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1
                    ? 'bg-[#c5a059] text-stone-950 shadow-md'
                    : 'bg-emerald-600/80 text-white'
                }`}
              >
                {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </span>
              <span className={step === 1 ? 'text-[#f0e2b6] font-semibold' : 'text-stone-400'}>
                Select Target Date & Source
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-stone-600" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2
                    ? 'bg-[#c5a059] text-stone-950 shadow-md'
                    : step > 2
                    ? 'bg-emerald-600/80 text-white'
                    : 'bg-stone-800 text-stone-500'
                }`}
              >
                {step > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
              </span>
              <span className={step === 2 ? 'text-[#f0e2b6] font-semibold' : 'text-stone-500'}>
                Date Verification & Preview
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-stone-600" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-emerald-500 text-stone-950 shadow-md' : 'bg-stone-800 text-stone-500'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-emerald-400 font-semibold' : 'text-stone-500'}>
                Safely Appended
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* ================= STEP 1: DATE & SOURCE SELECTION ================= */}
            {step === 1 && (
              <div className="space-y-6">
                {/* 1. Target Date Selector Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0a1c30] via-[#051424] to-[#0a1c30] border border-[#c5a059]/40 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase tracking-widest text-[#f0e2b6] flex items-center gap-1.5 font-bold">
                        <CalendarCheck2 className="w-4 h-4 text-[#c5a059]" />
                        Target Import Date
                      </label>
                      <p className="text-xs text-stone-300">
                        All records in this dataset will be assigned to this specific date.
                      </p>
                    </div>

                    {/* Date Input */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedImportDate}
                          onChange={(e) => setSelectedImportDate(e.target.value)}
                          className="px-4 py-2.5 rounded-xl bg-stone-950/90 border border-[#c5a059]/50 text-[#f0e2b6] font-mono text-sm font-semibold focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Formatted Date Banner */}
                  <div className="p-3 rounded-xl bg-[#020a14]/80 border border-white/10 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-pulse" />
                      <span className="text-xs font-mono text-stone-400">Selected Target:</span>
                      <span className="text-sm font-serif font-bold text-amber-300">
                        {detailedSelectedDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-stone-400">Quick Presets:</span>
                      {quickDates.map((q) => (
                        <button
                          key={q.value}
                          type="button"
                          onClick={() => setSelectedImportDate(q.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            selectedImportDate === q.value
                              ? 'bg-[#c5a059] text-stone-950 font-bold shadow-md'
                              : 'bg-stone-900 border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800'
                          }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Non-Destructive Protection Guarantee */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 text-xs text-stone-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 font-semibold block mb-0.5">
                      Zero-Loss Guarantee: Existing Data is Never Overwritten or Deleted
                    </strong>
                    Currently storing <span className="font-bold text-white font-mono">{existingRecords.length}</span> existing transaction records. When importing for <span className="text-[#f0e2b6] font-semibold">{formattedSelectedDate}</span>, new records will be safely appended with unique keys without affecting existing dates or bookings.
                  </div>
                </div>

                {/* 3. Input Mode Tabs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInputMode('upload')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          inputMode === 'upload'
                            ? 'bg-[#c5a059] text-stone-950 font-bold shadow-md'
                            : 'text-stone-400 hover:text-white hover:bg-stone-900'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload File (CSV / JSON)
                      </button>

                      <button
                        onClick={() => setInputMode('paste')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          inputMode === 'paste'
                            ? 'bg-[#c5a059] text-stone-950 font-bold shadow-md'
                            : 'text-stone-400 hover:text-white hover:bg-stone-900'
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        Paste CSV / Text
                      </button>

                      <button
                        onClick={() => setInputMode('preset')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          inputMode === 'preset'
                            ? 'bg-[#c5a059] text-stone-950 font-bold shadow-md'
                            : 'text-stone-400 hover:text-white hover:bg-stone-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        1-Click Sample Datasets
                      </button>
                    </div>

                    <button
                      onClick={handleDownloadTemplate}
                      className="text-xs font-mono text-[#f0e2b6] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                      Download Template
                    </button>
                  </div>

                  {/* Upload Tab */}
                  {inputMode === 'upload' && (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-3 flex flex-col items-center justify-center ${
                        dragActive
                          ? 'border-[#c5a059] bg-[#c5a059]/10'
                          : 'border-white/15 bg-stone-950/60 hover:border-[#c5a059]/50 hover:bg-stone-900/40'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.json,text/csv,application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                        <Upload className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-stone-200">
                          Click to browse or drag and drop your data file
                        </p>
                        <p className="text-xs text-stone-400 font-mono">
                          Supports CSV, Excel-exported CSV, and JSON data formats
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Paste Tab */}
                  {inputMode === 'paste' && (
                    <div className="space-y-3">
                      <textarea
                        rows={7}
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        placeholder={`Paste CSV data or JSON here...\nExample:\nGuest Name,Contact,Category,Description,Amount,Status,Payment Method\nAnil Verma,+91 98301 22334,room_booking,Deluxe Sea View Room,7500,paid,UPI`}
                        className="w-full p-4 rounded-2xl bg-stone-950 border border-white/15 text-stone-200 font-mono text-xs focus:outline-none focus:border-[#c5a059] transition-colors"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          disabled={!rawText.trim()}
                          onClick={() => processRawData(rawText, 'pasted_data.csv')}
                          className="px-5 py-2.5 rounded-xl bg-[#c5a059] text-stone-950 font-mono font-bold text-xs hover:bg-[#dfb76c] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Parse & Preview for {formattedSelectedDate}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Preset 1-Click Samples Tab */}
                  {inputMode === 'preset' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-stone-950/80 border border-white/10 hover:border-[#c5a059]/40 transition-all space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono uppercase text-[#c5a059] font-bold">
                              CSV Dataset
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono">
                              7 Records
                            </span>
                          </div>
                          <h4 className="text-sm font-serif font-semibold text-stone-100">
                            5 May 2026 Peak Stays & Dining
                          </h4>
                          <p className="text-xs text-stone-400 mt-1">
                            Pre-configured resort stays, suites, table bookings, and coastal spa orders.
                          </p>
                        </div>
                        <button
                          onClick={handleLoadSampleCSV}
                          className="w-full py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#dfb76c] text-stone-950 font-mono font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Load 5 May 2026 Sample Dataset</span>
                        </button>
                      </div>

                      <div className="p-5 rounded-2xl bg-stone-950/80 border border-white/10 hover:border-[#c5a059]/40 transition-all space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono uppercase text-[#c5a059] font-bold">
                              JSON Dataset
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono">
                              4 Records
                            </span>
                          </div>
                          <h4 className="text-sm font-serif font-semibold text-stone-100">
                            VIP Ocean Penthouse & Degustation
                          </h4>
                          <p className="text-xs text-stone-400 mt-1">
                            High-value presidential suites, beachside chef dining, and wellness packages.
                          </p>
                        </div>
                        <button
                          onClick={handleLoadSampleJSON}
                          className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-[#f0e2b6] border border-[#c5a059]/40 font-mono font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <FileCode className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Load JSON Sample Dataset</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= STEP 2: LIVE DATE VERIFICATION & PREVIEW ================= */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Prominent Selected Date Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b2440] via-[#081a2f] to-[#0b2440] border-2 border-[#c5a059] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#c5a059] text-stone-950 flex items-center justify-center shrink-0 shadow-lg">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-[#f0e2b6] tracking-wider font-bold">
                        Target Date Assigned To All Records
                      </div>
                      <div className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <span>{detailedSelectedDate}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono border border-amber-400/30">
                          {selectedImportDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inline Date Switcher */}
                  <div className="flex items-center gap-2 bg-stone-950/70 p-2 rounded-xl border border-white/10">
                    <label className="text-xs font-mono text-stone-400">Change Date:</label>
                    <input
                      type="date"
                      value={selectedImportDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 border border-[#c5a059]/40 text-[#f0e2b6] font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Safe Non-Destructive Stats Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-stone-400 block">
                      Existing Records
                    </span>
                    <span className="text-lg font-mono font-bold text-stone-300">
                      {existingRecords.length}
                    </span>
                    <span className="text-[10px] text-emerald-400 block font-mono">
                      100% Preserved
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-[#c5a059]/30 bg-[#c5a059]/5">
                    <span className="text-[10px] font-mono uppercase text-[#f0e2b6] block">
                      New To Append
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-300">
                      +{validSelectedCount}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      for {formattedSelectedDate}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-stone-400 block">
                      Total After Import
                    </span>
                    <span className="text-lg font-mono font-bold text-white">
                      {existingRecords.length + validSelectedCount}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      Combined total
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-stone-400 block">
                      Batch Value
                    </span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      ₹{totalAmountSum.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      Revenue volume
                    </span>
                  </div>
                </div>

                {/* Table Preview of Parsed Rows */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-300 font-semibold">
                        Preview Table ({previewItems.length} entries parsed)
                      </span>
                      {fileName && (
                        <span className="text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-white/10">
                          {fileName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAllSelection(true)}
                        className="text-stone-400 hover:text-white underline cursor-pointer"
                      >
                        Select All
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => toggleAllSelection(false)}
                        className="text-stone-400 hover:text-white underline cursor-pointer"
                      >
                        Deselect All
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Table */}
                  <div className="rounded-2xl border border-white/10 bg-stone-950/90 overflow-hidden max-h-72 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#020a14] text-stone-400 border-b border-white/10 sticky top-0 z-10">
                        <tr>
                          <th className="p-3 w-10 text-center">✓</th>
                          <th className="p-3 text-[#f0e2b6] font-bold">Assigned Date</th>
                          <th className="p-3">Guest Name</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Description</th>
                          <th className="p-3 text-right">Amount</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {previewItems.map((item) => (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              item.selected ? 'bg-[#c5a059]/5 hover:bg-[#c5a059]/10' : 'opacity-40 hover:opacity-70'
                            }`}
                          >
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={() => toggleItemSelection(item.id)}
                                className="rounded accent-[#c5a059] cursor-pointer"
                              />
                            </td>
                            <td className="p-3 font-semibold text-[#f0e2b6] whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 text-amber-300">
                                {item.formattedDate}
                              </span>
                            </td>
                            <td className="p-3 font-medium text-stone-100 whitespace-nowrap">
                              {item.guestName}
                              {item.contactNumber && (
                                <span className="block text-[10px] text-stone-400">
                                  {item.contactNumber}
                                </span>
                              )}
                            </td>
                            <td className="p-3 capitalize whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] ${
                                  item.category === 'room_booking'
                                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                                    : item.category === 'dining'
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                    : item.category === 'spa_wellness'
                                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                                    : 'bg-stone-800 text-stone-300 border border-white/10'
                                }`}
                              >
                                {item.category.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="p-3 text-stone-300 max-w-xs truncate">
                              {item.description}
                              {item.roomNumber && (
                                <span className="ml-1 text-stone-400">({item.roomNumber})</span>
                              )}
                            </td>
                            <td className="p-3 text-right font-bold text-stone-100 whitespace-nowrap">
                              ₹{item.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-3 text-center whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  item.paymentStatus === 'paid'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                }`}
                              >
                                {item.paymentStatus.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: SUCCESS CONFIRMATION ================= */}
            {step === 3 && importResult && (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-stone-100">
                    Import Completed Successfully
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    <span className="text-emerald-400 font-bold font-mono">
                      {importResult.addedCount} records
                    </span>{' '}
                    were successfully appended and assigned to{' '}
                    <span className="text-[#f0e2b6] font-bold font-serif">
                      {detailedSelectedDate}
                    </span>
                    . All previous records remain 100% safe and intact.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-stone-950/80 border border-[#c5a059]/30 text-left space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-stone-400">Assigned Date:</span>
                    <span className="text-[#f0e2b6] font-bold">{detailedSelectedDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-stone-400">Records Added:</span>
                    <span className="text-emerald-400 font-bold">+{importResult.addedCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-400">Total Stored Records Now:</span>
                    <span className="text-white font-bold">{importResult.newTotal}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      closeImportModal();
                      openRecordsDrawer(selectedImportDate);
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#c5a059] hover:bg-[#dfb76c] text-stone-950 font-mono font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>View {formattedSelectedDate} Records</span>
                  </button>

                  <button
                    onClick={handleResetModal}
                    className="px-5 py-3 rounded-2xl bg-stone-900 border border-white/15 text-stone-300 hover:text-white hover:bg-stone-800 font-mono text-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Import Another Dataset</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer / Navigation Buttons */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#020a14] flex items-center justify-between shrink-0">
            {step === 1 && (
              <>
                <button
                  type="button"
                  onClick={closeImportModal}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-stone-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleLoadSampleCSV}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfb76c] text-stone-950 font-mono font-bold text-xs shadow-lg shadow-[#c5a059]/20 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Quick Test with 5 May 2026 Sample</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Date Selection</span>
                </button>

                <button
                  type="button"
                  disabled={validSelectedCount === 0}
                  onClick={handleExecuteImport}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfb76c] text-stone-950 font-mono font-bold text-xs shadow-xl shadow-[#c5a059]/30 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-stone-950" />
                  <span>
                    Safely Append {validSelectedCount} Records to {formattedSelectedDate}
                  </span>
                </button>
              </>
            )}

            {step === 3 && (
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  onClick={closeImportModal}
                  className="px-5 py-2 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
