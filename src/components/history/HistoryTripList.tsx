import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Download,
  Printer,
  Filter,
  Calendar,
  MoreVertical,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Trip } from '../../types';
import { HistoryManagementProps } from './types';

export const HistoryTripList: React.FC<HistoryManagementProps> = ({ onViewChange, onSelectTrip, trips = [] }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [openMenuTripId, setOpenMenuTripId] = useState<string | null>(null);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        trip.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Statuses' || trip.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, trips]);

  return (
    <div className="p-8 bg-surface overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-headline mb-2">{t('trips_title', 'Trips History')}</h1>
          <p className="text-on-surface-variant font-medium">{t('manage_and_review_all_past_towing_assign', 'Manage and review all past towing assignments and logistics.')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant/30 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            {t('export_csv', 'Export CSV')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-md">
            <Printer className="w-4 h-4" />
            {t('print_report', 'Print Report')}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            type="text"
            placeholder={t('filter_by_client', 'Filter by client...')}
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-outline-variant/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{t('status', 'Status:')}</span>
          <select
            className="bg-surface border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface-variant outline-none focus:ring-2 focus:ring-primary/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>{t('completed', 'Completed')}</option>
            <option>{t('in_progress', 'In Progress')}</option>
            <option>{t('pending', 'Pending')}</option>
            <option>{t('cancelled', 'Cancelled')}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{t('common.dateRange')}</span>
          <button className="flex items-center gap-2 bg-surface border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface-variant">
            <Calendar className="w-4 h-4 text-outline" />
            {t('oct_01___oct_31', 'Oct 01 - Oct 31')}
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 text-primary text-sm font-bold hover:bg-primary/5 rounded-xl transition-colors">
          <Filter className="w-4 h-4" />
          {t('more_filters', 'More Filters')}
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">{t('common.client')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">{t('common.originDest')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">{t('common.distance')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-center">{t('common.status')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">{t('common.towTruck')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">{t('common.date')}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-center">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant font-bold text-sm border border-outline-variant/30">
                        {trip.clientName
                          .split(' ')
                          .slice(0, 2)
                          .map((namePart) => namePart[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">{trip.clientName}</p>
                        <p className="text-[10px] font-bold text-outline">ID: {trip.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-on-surface">{trip.origin}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-outline">
                        <ArrowRight className="w-3 h-3" />
                        {trip.destination}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-on-surface">{trip.distance}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <StatusBadge status={trip.status} />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-outline" />
                      <span className="text-sm font-bold text-on-surface-variant">{trip.towTruck}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-on-surface">{trip.date}</p>
                      <p className="text-[10px] font-bold text-outline">{trip.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center relative">
                      <button
                        className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        onClick={() => setOpenMenuTripId(openMenuTripId === trip.id ? null : trip.id)}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenuTripId === trip.id ? (
                        <div className="absolute right-0 top-10 z-20 min-w-[170px] bg-surface border border-outline-variant/40 rounded-xl shadow-lg p-1">
                          <button
                            className="w-full px-3 py-2 text-sm font-semibold text-left rounded-lg hover:bg-surface-container-low flex items-center gap-2"
                            onClick={() => {
                              onSelectTrip?.(trip.id);
                              setOpenMenuTripId(null);
                              onViewChange?.('history/trip-details');
                            }}
                          >
                            <Eye className="w-4 h-4 text-primary" />
                            View Details
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
          <p className="text-xs font-bold text-outline">
            {t('showing', 'Showing')} <span className="text-on-surface">1 - {filteredTrips.length}</span> {t('of', 'of')} <span className="text-on-surface">{trips.length}</span> {t('trips', 'trips')}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold text-outline hover:text-on-surface transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              {t('previous', 'Previous')}
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant text-xs font-bold flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant text-xs font-bold flex items-center justify-center transition-colors">3</button>
              <span className="px-1 text-outline">...</span>
            </div>
            <button className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1">
              {t('next', 'Next')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label={t('total_distance', 'Total Distance')}
          value="1,248.5 km"
          subValue="+12% from last month"
          color="primary"
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label={t('completed_trips', 'Completed Trips')}
          value="114"
          subValue="98% Success Rate"
          color="tertiary"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label={t('avg__dispatch_time', 'Avg. Dispatch Time')}
          value="14.2 min"
          subValue="Steady performance"
          color="secondary"
        />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Trip['status'] }) => {
  const configs = {
    Completed: { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary/100' },
    'In Progress': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Pending: { bg: 'bg-surface-container-low', text: 'text-on-surface', dot: 'bg-outline' },
    Cancelled: { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error/100' },
  };

  const config = configs[status];

  return (
    <div className={cn('flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold', config.bg, config.text)}>
      <div className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {status}
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  subValue,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  color: 'primary' | 'secondary' | 'tertiary';
}) => (
  <div className="bg-surface p-6 rounded-3xl border border-outline-variant/30 shadow-sm flex items-center gap-5">
    <div
      className={cn(
        'w-14 h-14 rounded-2xl flex items-center justify-center',
        color === 'primary' ? 'bg-primary/10 text-primary' : color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary',
      )}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-on-surface font-headline leading-none mb-1">{value}</h3>
      <p className={cn('text-[10px] font-bold', color === 'primary' ? 'text-primary' : 'text-on-surface-variant')}>{subValue}</p>
    </div>
  </div>
);
