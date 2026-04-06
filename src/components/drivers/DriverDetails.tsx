import React from 'react';
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

interface DriverDetailsProps {
  onBack: () => void;
  onEdit: () => void;
  onAddDriver: () => void;
}

export const DriverDetails: React.FC<DriverDetailsProps> = ({ onBack, onEdit, onAddDriver }) => {
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
                <h1 className="text-3xl font-bold text-on-surface font-headline">Marcus Reed</h1>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  Active
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">Senior Recovery Operator • Employee ID DR-1147</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="px-4 py-2.5 rounded-lg border border-primary/40 text-primary font-bold text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <button
              onClick={onAddDriver}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add Driver
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex flex-col items-center text-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300&h=300"
                alt="Driver profile"
                className="w-28 h-28 rounded-2xl object-cover border border-outline-variant/30"
              />
              <div>
                <h2 className="text-xl font-bold text-on-surface">Marcus Reed</h2>
                <p className="text-sm text-on-surface-variant">Unit-701 • Morning Shift</p>
              </div>
              <div className="w-full grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">Rating</p>
                  <p className="font-bold text-on-surface">4.9 / 5.0</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant">Trips</p>
                  <p className="font-bold text-on-surface">64 Completed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-5">Reorganized Driver Details - Marcus Reed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<Phone className="w-5 h-5 text-primary" />} label="Contact" value="+1 (555) 334-8877" />
              <InfoCard icon={<Truck className="w-5 h-5 text-primary" />} label="Assigned Unit" value="Unit-701 (Heavy Duty)" />
              <InfoCard icon={<Clock3 className="w-5 h-5 text-primary" />} label="Availability" value="Ready for Dispatch" />
              <InfoCard icon={<ShieldCheck className="w-5 h-5 text-primary" />} label="Safety Score" value="4.9 / 5.0" />
              <InfoCard icon={<Award className="w-5 h-5 text-primary" />} label="Certifications" value="HazMat, Winch Recovery" />
              <InfoCard icon={<CalendarClock className="w-5 h-5 text-primary" />} label="Last Shift" value="Today • 06:00 - 14:00" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-on-surface">Recent Dispatch Activity</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">Live</span>
            </div>
            <div className="space-y-3">
              <ActivityRow title="Accident Recovery" subtitle="#TRP-9021 • Downtown Exit 14" status="Completed" />
              <ActivityRow title="Heavy Tow" subtitle="#TRP-9018 • Riverside Bridge" status="Completed" />
              <ActivityRow title="Breakdown Assist" subtitle="#TRP-9014 • North Beltway" status="In Progress" />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
            <h4 className="text-base font-bold text-on-surface mb-4">Performance Snapshot</h4>
            <div className="space-y-3">
              <MetricRow icon={<Route className="w-4 h-4 text-primary" />} label="Average Response Time" value="11 min" />
              <MetricRow icon={<CheckCircle2 className="w-4 h-4 text-primary" />} label="Completion Rate" value="98%" />
              <MetricRow icon={<Star className="w-4 h-4 text-primary" />} label="Customer Satisfaction" value="4.9 / 5" />
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

const ActivityRow = ({ title, subtitle, status }: { title: string; subtitle: string; status: 'Completed' | 'In Progress' }) => (
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
