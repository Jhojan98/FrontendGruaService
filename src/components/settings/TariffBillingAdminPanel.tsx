import React from 'react';
import { CirclePlus, ArrowLeft, Route, Building2, Info, Truck, Gauge, Cloud } from 'lucide-react';
import { SettingsSubviewProps } from './types';

export const TariffBillingAdminPanel: React.FC<SettingsSubviewProps> = ({ onViewChange }) => {
  return (
    <div className="p-10 max-w-6xl mx-auto overflow-y-auto h-full pb-24 md:pb-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-start gap-3">
          <button onClick={() => onViewChange?.('settings')} className="mt-1 p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2 font-headline">Tariff & Billing Settings</h1>
            <p className="text-on-surface-variant max-w-xl leading-relaxed">Manage operational rates, mileage fees, and surcharges. Changes apply to new service calls.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold hover:bg-surface-container-low transition-colors">Reset to Defaults</button>
          <button className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold shadow-md hover:shadow-lg transition-all">Save Changes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-on-surface font-headline">Base Service Rates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <RateField label="Heavy Duty Tow" value="150.00" helper="Minimum per heavy recovery call" />
            <RateField label="Medium Duty Tow" value="95.00" helper="Standard pickup and flatbed" />
            <RateField label="Jumpstart" value="45.00" />
            <RateField label="Roadside Assist" value="65.00" helper="Lockouts & Tire changes" />
          </div>
          <div className="mt-10 p-6 bg-primary-container/20 rounded-xl border border-primary/10 flex items-start gap-4">
            <Info className="w-5 h-5 text-primary mt-1" />
            <div className="text-sm text-on-primary-fixed-variant leading-relaxed">
              Base rates are applied as a flat fee at the start of every dispatch. They do not include dynamic distance pricing or local environmental taxes.
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 bg-surface-container-highest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Route className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-on-surface font-headline">Mileage & Distance</h2>
          </div>
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant">Unit of Measurement</label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold">Miles (mi)</button>
                <button className="flex-1 py-2 rounded-lg border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container-low">Kilometers (km)</button>
              </div>
            </div>
            <RateField label="Cost Per Mile" value="4.50" suffix="/ mi" />
            <RateField label="Free Distance Threshold" value="5" suffix="miles" helper="No mileage charged for the first 5 miles." noCurrency />
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/30">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-on-surface-variant">Avg. Call Revenue</span>
              <span className="text-primary">$112.50</span>
            </div>
          </div>
        </section>

        <section className="lg:col-span-12 bg-surface-container-low rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CirclePlus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-on-surface font-headline">Additional Fees & Surcharges</h2>
            </div>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              <CirclePlus className="w-4 h-4" />
              Add New Rule
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeeCard icon={<Truck className="w-5 h-5 text-tertiary" />} title="After-Hours Surcharge" description="Applied to calls between 10:00 PM and 6:00 AM daily." valueLabel="VALUE" value="+$35.00" active />
            <FeeCard icon={<Gauge className="w-5 h-5 text-tertiary" />} title="Fuel Surcharge" description="Dynamic percentage based on current fuel market rates." valueLabel="PERCENTAGE" value="8.5%" active />
            <FeeCard icon={<Cloud className="w-5 h-5 text-on-surface-variant" />} title="Severe Weather Fee" description="Flat fee for blizzard or storm conditions (Seasonal)." valueLabel="VALUE" value="+$50.00" />
          </div>
        </section>
      </div>
    </div>
  );
};

const RateField = ({ label, value, helper, suffix, noCurrency = false }: { label: string; value: string; helper?: string; suffix?: string; noCurrency?: boolean }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">{label}</label>
    <div className="relative">
      {!noCurrency ? <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span> : null}
      <input className={`w-full ${noCurrency ? 'pl-4' : 'pl-8'} pr-14 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold`} type="number" defaultValue={value} />
      {suffix ? <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs">{suffix}</span> : null}
    </div>
    {helper ? <p className="text-[10px] text-on-surface-variant ml-1">{helper}</p> : null}
  </div>
);

const FeeCard = ({ icon, title, description, valueLabel, value, active = false }: { icon: React.ReactNode; title: string; description: string; valueLabel: string; value: string; active?: boolean }) => (
  <div className={`p-5 rounded-xl border border-outline-variant/50 hover:border-primary/40 transition-colors bg-surface-container-lowest ${active ? '' : 'opacity-70'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-tertiary-fixed rounded-lg">{icon}</div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-on-surface-variant">{active ? 'ACTIVE' : 'DISABLED'}</span>
        <div className={`w-8 h-4 rounded-full relative ${active ? 'bg-primary' : 'bg-outline-variant'}`}>
          <div className={`absolute top-1 w-2 h-2 bg-surface-container-lowest rounded-full ${active ? 'right-1' : 'left-1'}`} />
        </div>
      </div>
    </div>
    <h3 className="font-bold text-on-surface mb-1">{title}</h3>
    <p className="text-xs text-on-surface-variant mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-on-surface-variant">{valueLabel}</span>
      <span className="text-lg font-bold text-on-surface">{value}</span>
    </div>
  </div>
);
