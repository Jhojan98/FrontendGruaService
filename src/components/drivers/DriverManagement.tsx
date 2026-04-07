import React from 'react';
import {
  Search,
  SlidersHorizontal,
  FilterX,
  UserPlus,
  Phone,
  ShieldCheck,
  ChevronDown,
  ArrowDown,
  ChevronRight,
} from 'lucide-react';
import { drivers } from './driversData';
import { DriverDetails } from './DriverDetails';
import { EditDriverProfile } from './EditDriverProfile';
import { AddDriverForm } from './AddDriverForm';

export const DriverManagement: React.FC<{ currentView?: string; onViewChange?: (v: string) => void }> = ({
  currentView,
  onViewChange,
}) => {
  const isDefault = currentView === 'drivers';
  const isWithFilters = currentView === 'drivers/with-filters';
  const isDriverDetails = currentView === 'drivers/driver-details';
  const isEditDriver = currentView === 'drivers/edit-driver';
  const isAddDriver = currentView === 'drivers/add-driver';

  if (isDriverDetails) {
    return (
      <DriverDetails
        onBack={() => onViewChange?.('drivers')}
        onEdit={() => onViewChange?.('drivers/edit-driver')}
        onAddDriver={() => onViewChange?.('drivers/add-driver')}
      />
    );
  }

  if (isEditDriver) {
    return <EditDriverProfile onCancel={() => onViewChange?.('drivers')} onSave={() => onViewChange?.('drivers/driver-details')} />;
  }

  if (isAddDriver) {
    return <AddDriverForm onCancel={() => onViewChange?.('drivers')} />;
  }

  if (!isDefault && !isWithFilters) {
    return null;
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight mb-2">Drivers Management - Fleet Portal</h1>
            <p className="text-on-surface-variant max-w-2xl text-sm md:text-base">
              Manage dispatch operators, track certifications, and monitor availability across all towing units.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onViewChange?.(isWithFilters ? 'drivers' : 'drivers/with-filters')}
              className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface text-sm font-bold flex items-center gap-2 hover:bg-surface-container transition-colors"
            >
              {isWithFilters ? <FilterX className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              {isWithFilters ? 'Hide Filters' : 'Search & Filters'}
            </button>
            <button
              onClick={() => onViewChange?.('drivers/add-driver')}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <UserPlus className="w-4 h-4" />
              Add Driver
            </button>
          </div>
        </header>

        {isWithFilters && (
          <section className="mb-6 bg-surface rounded-xl border border-outline-variant/30 p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 bg-background border border-outline-variant/30 rounded-xl px-4 py-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-outline" />
                <input
                  type="text"
                  placeholder="Search by name, employee ID, or unit..."
                  className="w-full bg-transparent border-none outline-none text-sm"
                />
              </div>
              <FilterSelect label="Status" value="All" />
              <FilterSelect label="Shift" value="Any" />
              <FilterSelect label="Unit" value="All Units" />
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {drivers.map((driver) => (
            <article
              key={driver.id}
              className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
            >
              <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30">
                <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">{driver.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {driver.role} • {driver.id}
                      </p>
                    </div>
                    <StatusBadge status={driver.status} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                    <InfoText label="Unit / Shift" value={`${driver.unit} • ${driver.shift}`} />
                    <InfoText label="Contact" value={driver.phone} icon={<Phone className="w-3.5 h-3.5 text-outline" />} />
                    <InfoText label="Safety / Trips" value={`${driver.score} • ${driver.trips} trips`} icon={<ShieldCheck className="w-3.5 h-3.5 text-outline" />} />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => onViewChange?.('drivers/driver-details')}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onViewChange?.('drivers/edit-driver')}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10 flex justify-center pb-4">
          <button className="bg-surface text-primary text-sm border border-outline-variant/30 shadow-sm px-6 py-2.5 rounded-full font-bold hover:bg-surface-container-low transition-all flex items-center gap-2 group">
            <span>Load More Drivers</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="mt-2 bg-surface-container-low rounded-xl border border-outline-variant/20 p-4 flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">Quick action: jump directly to the focused driver profile layout.</p>
          <button
            onClick={() => onViewChange?.('drivers/driver-details')}
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Open driver details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value }: { label: string; value: string }) => (
  <div className="md:col-span-2 bg-background border border-outline-variant/30 rounded-xl px-4 py-3 flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
      <p className="text-sm font-semibold text-on-surface mt-1">{value}</p>
    </div>
    <ChevronDown className="w-4 h-4 text-outline" />
  </div>
);

const StatusBadge = ({ status }: { status: 'Available' | 'On Trip' | 'Off Duty' }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
      status === 'Available'
        ? 'bg-primary/10 text-primary border border-primary/20'
        : status === 'On Trip'
          ? 'bg-tertiary/15 text-tertiary'
          : 'bg-surface-container-low text-on-surface-variant'
    }`}
  >
    {status}
  </span>
);

const InfoText = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div>
    <span className="uppercase tracking-wider text-outline font-bold text-[10px]">{label}</span>
    <p className="font-bold text-on-surface mt-1 flex items-center gap-1.5">
      {icon}
      {value}
    </p>
  </div>
);
