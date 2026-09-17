import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDataImport } from '@/src/context/DataImportContext';
import { formatDateToPretty, formatDateWithWeekday } from '@/src/utils/date-formatter';
import {
  Calendar,
  X,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  BedDouble,
  Utensils,
  Sparkles,
  Compass,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Users,
} from 'lucide-react';

export function RecordsDrawer() {
  const {
    records,
    isRecordsDrawerOpen,
    closeRecordsDrawer,
    drawerFilterDate,
    setDrawerFilterDate,
    openImportModal,
    deleteRecord,
    exportCSV,
    exportJSON,
    resetToSampleData,
  } = useDataImport();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Collect all unique dates with records
  const uniqueDates = useMemo(() => {
    const dates = Array.from(new Set(records.map((r) => r.assignedDate))).sort().reverse();
    return dates;
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Date filter
      if (drawerFilterDate && r.assignedDate !== drawerFilterDate) {
        return false;
      }
      // Category filter
      if (categoryFilter !== 'all' && r.category !== categoryFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && r.paymentStatus !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.guestName.toLowerCase().includes(q) ||
          r.reference.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (r.roomNumber && r.roomNumber.toLowerCase().includes(q)) ||
          (r.contactNumber && r.contactNumber.includes(q))
        );
      }
      return true;
    });
  }, [records, drawerFilterDate, categoryFilter, statusFilter, searchQuery]);

  // Summary Metrics
  const totalRevenue = useMemo(() => {
    return filteredRecords.reduce((sum, r) => sum + r.amount, 0);
  }, [filteredRecords]);

  const totalGuests = useMemo(() => {
    return filteredRecords.reduce((sum, r) => sum + (r.guestCount || 1), 0);
  }, [filteredRecords]);

  if (!isRecordsDrawerOpen) return null;

  const activeDatePretty = drawerFilterDate ? formatDateToPretty(drawerFilterDate) : 'All Dates';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeRecordsDrawer}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-3xl h-full bg-[#020a14] border-l border-[#c5a059]/30 shadow-2xl flex flex-col z-10 text-stone-100 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 bg-[#030e1b] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#f0e2b6]">
                <Calendar className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-serif font-bold text-stone-100">
                    Resort Transactions & Logs
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c5a059]/20 text-[#f0e2b6] text-xs font-mono font-bold">
                    {records.length} Total
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  Date-assigned bookings, dining folios, and guest transactions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  closeRecordsDrawer();
                  openImportModal(drawerFilterDate || '2026-05-05');
                }}
                className="px-3.5 py-2 rounded-xl bg-[#c5a059] hover:bg-[#dfb76c] text-stone-950 font-mono font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Import Data</span>
              </button>

              <button
                onClick={closeRecordsDrawer}
                className="p-2 rounded-xl bg-stone-900 border border-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Selector Tabs */}
          <div className="px-6 py-3 bg-[#01060d] border-b border-white/5 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
            <span className="text-[11px] font-mono uppercase text-stone-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#c5a059]" /> Date Filter:
            </span>

            <button
              onClick={() => setDrawerFilterDate(null)}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer ${
                drawerFilterDate === null
                  ? 'bg-[#c5a059] text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900 border border-white/10 text-stone-300 hover:text-white'
              }`}
            >
              All Dates ({records.length})
            </button>

            {uniqueDates.map((date) => {
              const count = records.filter((r) => r.assignedDate === date).length;
              const isSelected = drawerFilterDate === date;
              return (
                <button
                  key={date}
                  onClick={() => setDrawerFilterDate(date)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 font-bold shadow-md ring-1 ring-amber-300'
                      : 'bg-stone-900/80 border border-white/10 text-stone-300 hover:text-white'
                  }`}
                >
                  <span>{formatDateToPretty(date)}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] ${
                      isSelected ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Metrics Summary Strip */}
          <div className="px-6 py-4 bg-[#020d1c] border-b border-white/10 grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10">
              <div className="flex items-center justify-between text-stone-400 text-[10px] font-mono uppercase mb-0.5">
                <span>Active Scope</span>
                <Calendar className="w-3 h-3 text-[#c5a059]" />
              </div>
              <div className="text-sm font-serif font-bold text-[#f0e2b6] truncate">
                {activeDatePretty}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10">
              <div className="flex items-center justify-between text-stone-400 text-[10px] font-mono uppercase mb-0.5">
                <span>Total Volume</span>
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-sm font-mono font-bold text-emerald-400">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10">
              <div className="flex items-center justify-between text-stone-400 text-[10px] font-mono uppercase mb-0.5">
                <span>Guests & Folios</span>
                <Users className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-sm font-mono font-bold text-stone-100">
                {filteredRecords.length} items ({totalGuests} guests)
              </div>
            </div>
          </div>

          {/* Search & Secondary Filter Bar */}
          <div className="px-6 py-3 bg-[#020a14] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by guest, reference, room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-900 border border-white/10 text-xs font-mono text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-stone-900 border border-white/10 text-xs font-mono text-stone-300 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="room_booking">Rooms & Suites</option>
                <option value="dining">Dining & Restaurant</option>
                <option value="spa_wellness">Spa & Wellness</option>
                <option value="concierge">Concierge & Tours</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-stone-900 border border-white/10 text-xs font-mono text-stone-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partially_paid">Partial</option>
              </select>

              <button
                onClick={() => exportCSV(drawerFilterDate || undefined)}
                title="Export Filtered to CSV"
                className="p-1.5 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#c5a059]" />
              </button>
            </div>
          </div>

          {/* Records List Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
            {filteredRecords.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-white/10 flex items-center justify-center mx-auto text-stone-500">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-stone-300">
                    No Records Found
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
                    No transactions match your current date or search criteria. You can import new records anytime.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeRecordsDrawer();
                    openImportModal(drawerFilterDate || '2026-05-05');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#dfb76c] text-stone-950 font-mono font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Import Data for {activeDatePretty}</span>
                </button>
              </div>
            ) : (
              filteredRecords.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-[#030d1b] border border-white/10 hover:border-[#c5a059]/40 transition-all space-y-2 group shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#f0e2b6] text-[11px] font-mono font-bold">
                          {r.formattedDate || formatDateToPretty(r.assignedDate)}
                        </span>
                        <span className="text-xs font-mono text-stone-400">{r.reference}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                            r.category === 'room_booking'
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : r.category === 'dining'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : r.category === 'spa_wellness'
                              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                              : 'bg-stone-800 text-stone-300 border border-white/10'
                          }`}
                        >
                          {r.category.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-stone-100">
                        {r.guestName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-mono font-bold text-emerald-400">
                        ₹{r.amount.toLocaleString('en-IN')}
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          r.paymentStatus === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {r.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-300 font-sans flex items-center justify-between pt-1 border-t border-white/5">
                    <p className="truncate max-w-md">
                      {r.description}
                      {r.roomNumber && (
                        <span className="ml-1 text-amber-300 font-mono">[{r.roomNumber}]</span>
                      )}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-400">
                        {r.paymentMethod}
                      </span>
                      <button
                        onClick={() => deleteRecord(r.id)}
                        title="Delete record"
                        className="p-1 rounded-lg text-stone-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {r.notes && (
                    <div className="text-[11px] text-stone-400 bg-stone-950/60 p-2 rounded-xl border border-white/5 font-mono">
                      💬 {r.notes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#020a14] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <span>Export:</span>
              <button
                onClick={() => exportCSV(drawerFilterDate || undefined)}
                className="text-[#f0e2b6] hover:underline cursor-pointer"
              >
                CSV
              </button>
              <span>•</span>
              <button
                onClick={() => exportJSON(drawerFilterDate || undefined)}
                className="text-[#f0e2b6] hover:underline cursor-pointer"
              >
                JSON
              </button>
            </div>

            <button
              onClick={closeRecordsDrawer}
              className="px-4 py-2 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
