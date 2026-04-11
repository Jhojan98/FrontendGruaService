import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Filter, Navigation, PlusCircle, ShieldCheck, Truck } from 'lucide-react';
import { deleteFleetTruck } from '../../lib/api';
import { FleetManagementProps } from './types';

export const FleetList: React.FC<FleetManagementProps> = ({ onViewChange, onSelectTruck, fleet = [], refreshFleet }) => {
  const { t } = useTranslation();
  const [pendingDeleteTruckId, setPendingDeleteTruckId] = React.useState<string | null>(null);
  const [deletingTruckId, setDeletingTruckId] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const totalTrucks = fleet.length;
  const activeNow = fleet.filter((truck) => truck.status === 'On Trip').length;
  const availableNow = fleet.filter((truck) => truck.status === 'Available').length;

  const statusClassMap: Record<string, string> = {
    Available: 'bg-primary/10 text-primary',
    'On Trip': 'bg-tertiary/10 text-tertiary',
    Maintenance: 'bg-surface-container-low text-on-surface-variant',
  };

  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">{t('fleet_overview', 'Fleet Overview')}</h1>
            <p className="text-secondary font-body max-w-lg">{t('manage_your_active_towing_units__monitor', 'Manage your active towing units, monitor vehicle health, and optimize dispatch efficiency across the territory.')}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface rounded-lg font-bold hover:bg-surface-dim transition-colors">
              <Filter className="w-5 h-5 text-xl" />
              {t('filter', 'Filter')}
            </button>
            <button onClick={() => onViewChange?.('fleet/add-truck')} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">
              <PlusCircle className="w-5 h-5 text-xl" />
              {t('register_truck', 'Register Truck')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('total_trucks', 'Total Trucks')}</span>
              <Truck className="text-primary-container p-2 bg-primary/5 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">{totalTrucks}</span>
              <span className="text-xs text-primary font-bold ml-2">{t('2_this_month', '+2 this month')}</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('active_now', 'Active Now')}</span>
              <Navigation className="text-primary p-2 bg-primary/10 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">{activeNow}</span>
              <span className="text-xs text-on-surface-variant font-label ml-2">{availableNow} {t('available', 'Available')}</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('safety_rating', 'Safety Rating')}</span>
              <ShieldCheck className="text-emerald-600 p-2 bg-emerald-50 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">{totalTrucks > 0 ? '4.9' : '0.0'}</span>
              <span className="text-xs text-emerald-600 font-bold ml-2">{t('excellence', 'Excellence')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fleet.map((truck) => (
            <FleetCard
              key={truck.id}
              truckId={truck.id}
              title={truck.unitNumber}
              subtitle={truck.type}
              status={truck.status}
              statusClassName={statusClassMap[truck.status] ?? 'bg-surface-container-low text-on-surface-variant'}
              driver={truck.assignedDriverName ?? t('none', 'None')}
              currentTask={truck.status === 'On Trip' ? t('in_progress', 'In Progress') : t('standing_by', 'Standing By')}
              odometer={t('unknown', 'Unknown')}
              fuel={truck.status === 'Maintenance' ? '0%' : '100%'}
              fuelClassName={truck.status === 'On Trip' ? 'bg-tertiary' : 'bg-primary'}
              truckImage={truck.imageUrl ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuCfLj7yPaWlI7y5cQjVu0HABdZCj04KYk1qwdVXgTtCeTWmmgo_A2RsbaGrXro_yLF5Jeo9P7R23S_DrXkFCsItw8DeRCj6fchebQjOtJoKctTgPjBiXAhpMGN8V6IW5I4DNuW6psOCaqU9QzmRppK1pBcXdwG2AO7jqPqBk33NKeoO9bhg7m7ufiWyQlJJpLsEYV0-eItfVkoG8T6RkpGm8xfmHqkJGWJ1B54cXgk4slqLd1vBWPxihR2nfnPweYtteVavIF1uvOA"}
              onViewChange={onViewChange}
              onSelectTruck={onSelectTruck}
              onAskDelete={() => setPendingDeleteTruckId(truck.id)}
              isDeleting={deletingTruckId === truck.id}
            />
          ))}
        </div>

        {deleteError ? (
          <div className="mt-4 rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error">{deleteError}</div>
        ) : null}

        {pendingDeleteTruckId ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-200">
            <div className="w-[92%] max-w-md rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
              <h3 className="text-lg font-bold text-on-surface mb-2">{t('fleet_details.confirm_delete_truck', 'Delete truck?')}</h3>
              <p className="text-sm text-on-surface-variant mb-6">{t('fleet_details.delete_truck_warning', 'This action cannot be undone.')}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setPendingDeleteTruckId(null)}
                  disabled={Boolean(deletingTruckId)}
                  className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors text-sm font-bold disabled:opacity-60"
                >
                  {t('drivers.cancel', 'Cancel')}
                </button>
                <button
                  onClick={async () => {
                    const truck = fleet.find((item) => item.id === pendingDeleteTruckId);
                    if (truck) {
                      setDeleteError(null);
                      setDeletingTruckId(truck.id);
                      try {
                        await deleteFleetTruck(truck.id);
                        await refreshFleet?.();
                        setPendingDeleteTruckId(null);
                      } catch (error) {
                        setDeleteError(error instanceof Error ? error.message : 'Failed to delete truck');
                      } finally {
                        setDeletingTruckId(null);
                      }
                    }
                  }}
                  disabled={Boolean(deletingTruckId)}
                  className="px-4 py-2 rounded-lg bg-error text-white hover:opacity-90 transition-all text-sm font-bold disabled:opacity-60"
                >
                  {t('delete', 'Delete')}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

type FleetCardProps = {
  truckId: string;
  title: string;
  subtitle: string;
  status: string;
  statusClassName: string;
  driver: string;
  currentTask: string;
  odometer: string;
  fuel: string;
  fuelClassName: string;
  truckImage: string;
  onViewChange?: (view: string) => void;
  onSelectTruck?: (truckId: string) => void;
  onAskDelete?: () => void;
  isDeleting?: boolean;
  driverImage?: string;
  cardBodyClassName?: string;
  currentTaskClassName?: string;
};

const FleetCard: React.FC<FleetCardProps> = ({
  truckId,
  title,
  subtitle,
  status,
  statusClassName,
  driver,
  currentTask,
  odometer,
  fuel,
  fuelClassName,
  truckImage,
  onViewChange,
  onSelectTruck,
  onAskDelete,
  isDeleting,
  driverImage,
  cardBodyClassName,
  currentTaskClassName,
}) => {
  const { t } = useTranslation();

  return (
  <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
        <img alt="Tow truck" className="w-full h-full object-cover" src={truckImage} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold font-headline">{title}</h3>
            <p className="text-secondary font-label text-sm">{subtitle}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusClassName}`}>{status}</span>
        </div>
      </div>
    </div>
    <div className={`grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4 ${cardBodyClassName ?? ''}`}>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Assigned Driver</span>
        {driverImage ? (
          <div className="flex items-center gap-2">
            <img className="w-6 h-6 rounded-full" alt={driver} src={driverImage} />
            <span className="font-bold text-on-surface">{driver}</span>
          </div>
        ) : (
          <span className="font-bold text-on-surface">{driver}</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Current Task</span>
        <span className={`font-bold ${currentTaskClassName ?? 'text-on-surface'}`}>{currentTask}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Odometer</span>
        <span className="font-bold text-on-surface">{odometer}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Fuel Level</span>
        <div className="flex items-center gap-2">
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className={`h-full ${fuelClassName}`} style={{ width: fuel }} />
          </div>
          <span className="font-bold text-on-surface">{fuel}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-5">
      <button
        onClick={() => {
          onSelectTruck?.(truckId);
          onViewChange?.('fleet/truck-details');
        }}
        className="px-4 py-1.5 rounded-lg text-xs font-bold border border-primary/30 text-primary hover:bg-primary/5 transition-colors flex items-center gap-1"
      >
        <Eye className="w-3.5 h-3.5" />
        View Details
      </button>
      <button
        onClick={() => {
          onSelectTruck?.(truckId);
          onViewChange?.('fleet/edit-truck');
        }}
        className="px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
      >
        Edit Truck
      </button>
      <button
        onClick={() => onAskDelete?.()}
        disabled={isDeleting}
        className="px-4 py-1.5 rounded-lg text-xs font-bold text-error hover:bg-error/10 transition-colors disabled:opacity-60"
      >
        {isDeleting ? t('fleet_details.deleting', 'Deleting...') : t('delete', 'Delete')}
      </button>
    </div>
  </div>
  );
};
