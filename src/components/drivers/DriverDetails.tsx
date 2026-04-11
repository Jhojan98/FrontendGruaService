import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Plus,
  Phone,
  ShieldCheck,
  Award,
  Clock3,
  Truck,
  Star,
  CheckCircle2,
  Route,
  CalendarClock,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchDriver } from './driversData';
import type { DriverRecord } from './driversTypes';
import { listFleet } from '../../lib/api';
import type { FleetTruck } from '../../types';

interface DriverDetailsProps {
  driverId: string;
  onBack: () => void;
  onEdit: () => void;
  onAddDriver: () => void;
}

export const DriverDetails: React.FC<DriverDetailsProps> = ({ driverId, onBack, onEdit, onAddDriver }) => {
  const { t } = useTranslation();
  const [driver, setDriver] = useState<DriverRecord | null>(null);
  const [fleet, setFleet] = useState<FleetTruck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fallbackAssignedTruck =
    driver == null
      ? null
      : fleet.find((truck) => truck.assignedDriverId === driver.id) ??
        fleet.find((truck) => truck.unitNumber === driver.unit) ??
        null;

  const assignedTruckUnit = driver?.assignedTruckUnit ?? fallbackAssignedTruck?.unitNumber ?? null;
  const assignedTruckType = driver?.assignedTruckType ?? fallbackAssignedTruck?.type ?? null;
  const assignedTruckStatus = driver?.assignedTruckStatus ?? fallbackAssignedTruck?.status ?? null;
  const hasAssignedTruck = Boolean(assignedTruckUnit);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchDriver(driverId)
      .then((data) => {
        setDriver(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : t('drivers.failed_load_details'));
        setLoading(false);
      });

    listFleet()
      .then((data) => setFleet(data))
      .catch(() => setFleet([]));
  }, [driverId, t]);

  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-background p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-on-surface-variant">Loading driver details...</p>
        </div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="h-full overflow-y-auto bg-background p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors" type="button">
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          <p className="text-error text-sm">{error || t('drivers.driver_not_found')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-on-surface font-headline">{driver.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {driver.status}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">
                {driver.role} • {t('drivers.employee_id')} {driver.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="px-4 py-2.5 rounded-lg border border-primary/40 text-primary font-bold text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {t('drivers.edit_profile')}
            </button>
            <button
              onClick={onAddDriver}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              {t('drivers.add_driver')}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex flex-col items-center text-center gap-4">
              <img
                src={driver.image}
                alt={t('drivers.driver_profile_photo')}
                className="w-28 h-28 rounded-2xl object-cover border border-outline-variant/30"
              />
              <div>
                <h2 className="text-xl font-bold text-on-surface">{driver.name}</h2>
                <p className="text-sm text-on-surface-variant">
                  {driver.unit} • {driver.shift} Shift
                </p>
              </div>
              <div className="w-full grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">{t('drivers.rating')}</p>
                  <p className="font-bold text-on-surface">{driver.score} / 5.0</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">{t('drivers.trips')}</p>
                  <p className="font-bold text-on-surface">{driver.trips} {t('drivers.completed')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-5">{t('drivers.details_title_prefix')} - {driver.name}</h3>
            <div className="mb-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{t('drivers.assigned_unit')}</p>
              <p className="text-base font-bold text-on-surface mt-1">{driver.unit}</p>
            </div>
            <div className="mb-4 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t('drivers.assigned_truck')}</p>
              <p className="text-base font-bold text-on-surface mt-1">
                {hasAssignedTruck ? `${assignedTruckUnit} · ${assignedTruckType ?? '-'}` : t('drivers.unassigned_truck')}
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                {hasAssignedTruck
                  ? `${t('drivers.truck_status')}: ${assignedTruckStatus ?? '-'}`
                  : t('drivers.assign_truck_hint')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<Phone className="w-5 h-5 text-primary" />} label={t('drivers.contact')} value={driver.phone} />
              <InfoCard icon={<Truck className="w-5 h-5 text-primary" />} label={t('drivers.assigned_unit')} value={driver.unit} />
              <InfoCard icon={<Clock3 className="w-5 h-5 text-primary" />} label={t('drivers.availability')} value={driver.status} />
              <InfoCard icon={<ShieldCheck className="w-5 h-5 text-primary" />} label={t('drivers.safety_score')} value={`${driver.score} / 5.0`} />
              <InfoCard icon={<Award className="w-5 h-5 text-primary" />} label={t('drivers.certifications')} value={t('drivers.certifications_value')} />
              <InfoCard icon={<CalendarClock className="w-5 h-5 text-primary" />} label={t('drivers.shift')} value={driver.shift} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-on-surface">{t('drivers.recent_dispatch_activity')}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">{t('drivers.live')}</span>
            </div>
            <div className="space-y-3">
              <ActivityRow title={t('drivers.activity_accident_recovery')} subtitle="#TRP-9021 • Downtown Exit 14" status={t('drivers.status_completed')} />
              <ActivityRow title={t('drivers.activity_heavy_tow')} subtitle="#TRP-9018 • Riverside Bridge" status={t('drivers.status_completed')} />
              <ActivityRow title={t('drivers.activity_breakdown_assist')} subtitle="#TRP-9014 • North Beltway" status={t('drivers.status_in_progress')} />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
            <h4 className="text-base font-bold text-on-surface mb-4">{t('drivers.performance_snapshot')}</h4>
            <div className="space-y-3">
              <MetricRow icon={<Route className="w-4 h-4 text-primary" />} label={t('drivers.average_response_time')} value="11 min" />
              <MetricRow icon={<CheckCircle2 className="w-4 h-4 text-primary" />} label={t('drivers.completion_rate')} value="98%" />
              <MetricRow icon={<Star className="w-4 h-4 text-primary" />} label={t('drivers.customer_satisfaction')} value="4.9 / 5" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low flex items-start gap-3">
    <div className="p-2 rounded-lg bg-surface">{icon}</div>
    <div>
      <p className="text-xs text-on-surface-variant">{label}</p>
      <p className="font-bold text-sm text-on-surface mt-1">{value}</p>
    </div>
  </div>
);

const ActivityRow = ({ title, subtitle, status }: { title: string; subtitle: string; status: string }) => (
  <div className="p-4 rounded-lg bg-background border border-outline-variant/30 flex items-center justify-between">
    <div>
      <p className="font-bold text-sm text-on-surface">{title}</p>
      <p className="text-xs text-on-surface-variant mt-0.5">{subtitle}</p>
    </div>
    <span
      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
        status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-tertiary/15 text-tertiary'
      }`}
    >
      {status}
    </span>
  </div>
);

const MetricRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-3 rounded-lg border border-outline-variant/30 bg-background flex items-center justify-between">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm text-on-surface-variant">{label}</span>
    </div>
    <span className="font-bold text-sm text-on-surface">{value}</span>
  </div>
);
