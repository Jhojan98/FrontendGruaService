import React from 'react';
import { ArrowLeft, Info, Building2, Map, Route, Clock3, Milestone, Home, TriangleAlert, RotateCcw, Printer, Share2, User } from 'lucide-react';
import { HistoryManagementProps } from './types';

export const HistoryTripDetails: React.FC<HistoryManagementProps> = ({ onViewChange }) => {
  return (
    <div className="p-8 bg-surface overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button onClick={() => onViewChange?.('history')} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
                <ArrowLeft className="w-5 h-5 text-on-surface" />
              </button>
              <h1 className="font-headline text-3xl font-bold text-on-background">Trip #TR-88219</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">COMPLETED</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container transition-colors font-semibold flex items-center gap-2">
              <Printer className="w-5 h-5" />
              Print Invoice
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-primary text-white hover:shadow-lg transition-all font-semibold flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] overflow-hidden">
              <div className="p-6 border-b border-surface-variant/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-primary">
                  <Map className="w-5 h-5" />
                  <h3 className="font-headline font-bold text-lg">Trip Route</h3>
                </div>
                <span className="text-xs text-on-surface-variant italic">Route data verified via GPS</span>
              </div>
              <div className="h-[400px] w-full relative bg-surface-container">
                <img
                  alt="Map view showing route"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFdLDh0uXWNazr34YQCQ_6saneUqWva6J9DiOtB5OorEfSBWSt-3R8TaEGRxK6MQ_sYpXEx2K1QA__ZAuk-nbmAPdPhDVqQWvpgWiDSgPkrIUF-XU_UaCKY5_k1NUxjCHsMagDZMMmd6YrGP8kWUCBA9i9HnKAMUn0SEcqpArjCW_B_8JvPI4GbWFXbpu-h2hjhq7AGvwDfHnCOCr0BrShOF0-e8dtF-2jevfvnN3dNjvXvmR9nsWvGTevgwdIhiajGxT6OmxuB24"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <MapLegend label="Base" colorClassName="bg-primary" />
                  <MapLegend label="Incident" colorClassName="bg-error" />
                  <MapLegend label="Destination" colorClassName="bg-tertiary" />
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] p-8">
              <h3 className="font-headline font-bold text-xl mb-8 border-l-4 border-primary pl-4">Route Breakdown</h3>
              <div className="space-y-0 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-outline-variant" />
                <RouteStep
                  icon={<Home className="w-5 h-5 text-primary" />}
                  ringClassName="border-primary"
                  title="Base to Accident"
                  subtitle="Fleet HQ → Interstate 35, Mile 234"
                  duration="10 mins"
                  distance="2.0 mi"
                />
                <RouteStep
                  icon={<TriangleAlert className="w-5 h-5 text-error" />}
                  ringClassName="border-error"
                  title="Accident to Destination"
                  subtitle="Pickup Site → Swift Logistics Terminal"
                  duration="18 mins"
                  distance="2.6 mi"
                />
                <RouteStep
                  icon={<RotateCcw className="w-5 h-5 text-tertiary" />}
                  ringClassName="border-tertiary"
                  title="Return to Base"
                  subtitle="Terminal → Fleet HQ"
                  duration="12 mins"
                  distance="2.4 mi"
                  isLast
                />
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-bold text-lg">Service Information</h3>
              </div>
              <div className="space-y-4">
                <InfoRow label="Type" value="Heavy Duty Tow" />
                <InfoRow label="Incident" value="Mechanical Failure" valueClassName="text-error" />
                <div className="flex justify-between items-center py-2 border-b border-surface-variant/30">
                  <span className="text-on-surface-variant text-sm">Driver</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-on-background">Marcus Reed</span>
                  </div>
                </div>
                <InfoRow label="Truck" value="Unit-701" isLast />
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-bold text-lg">Client Information</h3>
              </div>
              <div className="bg-surface-container/50 p-4 rounded-xl border border-surface-variant/50">
                <p className="font-bold text-on-background mb-1">Swift Logistics Inc.</p>
                <p className="text-xs text-on-surface-variant font-mono">ID: SWIFT-99283-TL</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary font-bold">
                  <Building2 className="w-4 h-4" />
                  Corporate Account
                </div>
              </div>
            </section>

            <section className="bg-primary text-white rounded-xl shadow-lg p-6 overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="text-[160px] leading-none">$</span>
              </div>
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <Milestone className="w-5 h-5" />
                <h3 className="font-headline font-bold text-lg">Tariff & Billing</h3>
              </div>
              <div className="space-y-3 relative z-10">
                <BillingRow label="Base Fee" value="$150.00" />
                <BillingRow label="Mileage Cost (7.0 mi)" value="$300.00" />
                <div className="pt-3 mt-3 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Total Amount</p>
                    <p className="text-3xl font-headline font-bold">$450.00</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest">PAID</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapLegend = ({ label, colorClassName }: { label: string; colorClassName: string }) => (
  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-stone-100 flex items-center gap-3">
    <div className={`w-3 h-3 rounded-full ${colorClassName}`} />
    <span className="text-xs font-bold text-stone-700">{label}</span>
  </div>
);

const RouteStep = ({
  icon,
  ringClassName,
  title,
  subtitle,
  duration,
  distance,
  isLast = false,
}: {
  icon: React.ReactNode;
  ringClassName: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  isLast?: boolean;
}) => (
  <div className={`relative flex gap-6 ${isLast ? '' : 'pb-10'}`}>
    <div className={`relative z-10 w-10 h-10 rounded-full bg-surface-container-low border-2 ${ringClassName} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h4 className="font-bold text-on-background">{title}</h4>
        <p className="text-sm text-on-surface-variant">{subtitle}</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-surface-container px-3 py-1 rounded-full flex items-center gap-2">
          <Clock3 className="w-4 h-4" />
          <span className="text-xs font-bold">{duration}</span>
        </div>
        <div className="bg-primary/5 px-3 py-1 rounded-full flex items-center gap-2">
          <Route className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary">{distance}</span>
        </div>
      </div>
    </div>
  </div>
);

const InfoRow = ({ label, value, valueClassName, isLast = false }: { label: string; value: string; valueClassName?: string; isLast?: boolean }) => (
  <div className={`flex justify-between items-center py-2 ${isLast ? '' : 'border-b border-surface-variant/30'}`}>
    <span className="text-on-surface-variant text-sm">{label}</span>
    <span className={`font-bold text-on-background ${valueClassName ?? ''}`}>{value}</span>
  </div>
);

const BillingRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="opacity-80">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);
