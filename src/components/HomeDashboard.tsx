import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sun, 
  Route, 
  Radio, 
  Truck, 
  DollarSign, 
  PlusSquare, 
  ClipboardList, 
  FileText, 
  Map, 
  Info, 
  ChevronRight 
} from 'lucide-react';
import type { AuthUser, DashboardQuickAction, DashboardStats } from '../types';
import { getDashboardQuickActions, getDashboardStats } from '../lib/api';

interface HomeDashboardProps {
  currentUser: AuthUser | null;
}

const DEFAULT_STATS: DashboardStats = {
  totalTripsToday: 48,
  activeDispatches: 5,
  availableUnits: { current: 7, total: 12 },
  totalRevenueToday: 4820.5,
};

const DEFAULT_ACTIONS: DashboardQuickAction[] = [
  { id: 'new-trip', label: 'New Dispatch Request' },
  { id: 'fleet-map', label: 'Register New Vehicle' },
  { id: 'assign-pending', label: 'Generate Daily Report' },
];

export const HomeDashboard = ({ currentUser }: HomeDashboardProps) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [quickActions, setQuickActions] = useState<DashboardQuickAction[]>(DEFAULT_ACTIONS);
  const [loadError, setLoadError] = useState<string | null>(null);

  const formattedRevenue = useMemo(
    () =>
      stats.totalRevenueToday.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }),
    [stats.totalRevenueToday],
  );

  const greetingName = useMemo(() => {
    if (!currentUser?.full_name) {
      return 'Alex';
    }
    return currentUser.full_name.split(' ')[0];
  }, [currentUser]);

  useEffect(() => {
    let mounted = true;
    Promise.all([getDashboardStats(), getDashboardQuickActions()])
      .then(([statsResponse, actionsResponse]) => {
        if (!mounted) {
          return;
        }
        setStats(statsResponse);
        setQuickActions(actionsResponse.length > 0 ? actionsResponse : DEFAULT_ACTIONS);
      })
      .catch((error) => {
        if (!mounted) {
          return;
        }
        setLoadError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const firstAction = quickActions[0]?.label || DEFAULT_ACTIONS[0].label;
  const secondAction = quickActions[1]?.label || DEFAULT_ACTIONS[1].label;
  const thirdAction = quickActions[2]?.label || DEFAULT_ACTIONS[2].label;

  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Message */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-serif italic text-primary font-bold">{t('home.greeting', `Good Morning, ${greetingName}`)}</h2>
            <p className="text-on-surface-variant mt-2 max-w-lg">
              {t('operations_are_running_smoothly_today__a', 'Operations are running smoothly today. All priority routes are currently clear, and 7 units are ready for immediate dispatch.')}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-xl text-on-surface text-sm font-medium">
            <Sun className="w-5 h-5 text-primary fill-primary" />
            <span>{t('oct_24__2023___08_42_am', 'Oct 24, 2023 • 08:42 AM')}</span>
          </div>
        </section>

        {/* KPI Cards (Bento Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-surface-container-low rounded-lg">
                <Route className="w-6 h-6 text-on-surface-variant" />
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full">{t('12__vs_yesterday', '+12% vs yesterday')}</span>
            </div>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">{t('total_trips_today', 'Total Trips Today')}</p>
            <h3 className="text-3xl font-serif font-bold text-on-background mt-1">{stats.totalTripsToday}</h3>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <Radio className="w-6 h-6 text-primary" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-on-primary bg-error px-2 py-1 rounded-full animate-pulse">
                <span className="w-1 h-1 bg-surface rounded-full"></span> {t('live', 'LIVE')}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">{t('home.activeDispatches', 'Active Dispatches')}</p>
            <h3 className="text-3xl font-serif font-bold text-on-background mt-1">{stats.activeDispatches}</h3>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Truck className="w-6 h-6 text-tertiary" />
              </div>
            </div>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">{t('home.availableUnits', 'Available Units')}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-serif font-bold text-on-background">{stats.availableUnits.current}</h3>
              <span className="text-outline font-medium">/ {stats.availableUnits.total} total</span>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-surface-container-low rounded-lg">
                <DollarSign className="w-6 h-6 text-on-surface-variant" />
              </div>
            </div>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">{t('home.totalRevenue', 'Total Revenue Today')}</p>
            <h3 className="text-3xl font-serif font-bold text-on-background mt-1">{formattedRevenue}</h3>
          </div>
        </section>

        {loadError ? (
          <section className="rounded-xl border border-amber-300/70 bg-amber-100/70 px-4 py-3 text-sm text-amber-900">
            {loadError}
          </section>
        ) : null}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Operations */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Actions Grid */}
            <section>
              <h4 className="text-lg font-serif font-bold text-on-background mb-4">{t('home.quickActions', 'Quick Actions')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-start p-6 bg-primary text-on-primary rounded-xl hover:opacity-95 transition-all text-left group">
                  <PlusSquare className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-lg leading-tight">{firstAction}</span>
                  <span className="text-primary-fixed text-xs mt-1 opacity-80">{t('process_a_new_incoming_tow_call', 'Process a new incoming tow call')}</span>
                </button>

                <button className="flex flex-col items-start p-6 bg-surface border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-all text-left group">
                  <ClipboardList className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-lg text-on-background leading-tight">{secondAction}</span>
                  <span className="text-on-surface-variant text-xs mt-1">{t('add_a_unit_to_the_fleet_registry', 'Add a unit to the fleet registry')}</span>
                </button>

                <button className="flex flex-col items-start p-6 bg-surface border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-all text-left group">
                  <FileText className="w-8 h-8 text-tertiary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-lg text-on-background leading-tight">{thirdAction}</span>
                  <span className="text-on-surface-variant text-xs mt-1">{t('export_today_s_logs_and_billing', "Export today's logs and billing")}</span>
                </button>
              </div>
            </section>

            {/* Recent Activity Feed */}
            <section className="bg-surface rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
              <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center">
                <h4 className="text-lg font-serif font-bold text-on-background">{t('recent_activity', 'Recent Activity')}</h4>
                <button className="text-primary text-sm font-bold hover:underline">{t('view_all_trips', 'View All Trips')}</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    <tr>
                      <th className="px-6 py-4">{t('trip_details', 'Trip Details')}</th>
                      <th className="px-6 py-4">{t('client', 'Client')}</th>
                      <th className="px-6 py-4">{t('vehicle', 'Vehicle')}</th>
                      <th className="px-6 py-4">{t('status', 'Status')}</th>
                      <th className="px-6 py-4 text-right">{t('amount', 'Amount')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-on-background">{t('trp_8921', '#TRP-8921')}</p>
                        <p className="text-xs text-on-surface-variant">{t('12_mins_ago___flatbed_service', '12 mins ago • Flatbed Service')}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{t('james_henderson', 'James Henderson')}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{t('ford_f_150__2021', 'Ford F-150 (2021)')}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-tertiary border border-amber-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> {t('in_progress', 'In Progress')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-on-background">$185.00</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-on-background">{t('trp_8920', '#TRP-8920')}</p>
                        <p className="text-xs text-on-surface-variant">{t('45_mins_ago___accident_recovery', '45 mins ago • Accident Recovery')}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{t('sarah_miller', 'Sarah Miller')}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{t('tesla_model_3', 'Tesla Model 3')}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-primary border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> {t('completed', 'Completed')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-on-background">$320.00</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-on-background">{t('trp_8918', '#TRP-8918')}</p>
                        <p className="text-xs text-on-surface-variant">{t('1_hour_ago___impound_request', '1 hour ago • Impound Request')}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{t('city_enforcement', 'City Enforcement')}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{t('honda_civic', 'Honda Civic')}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-error/10 text-error border border-error/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> {t('cancelled', 'Cancelled')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-on-background">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Map & Distribution */}
          <div className="lg:col-span-4 space-y-8">
            {/* Live Fleet Map (Mini) */}
            <section className="bg-surface rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
              <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
                <h4 className="text-md font-serif font-bold text-on-background">{t('live_fleet_map', 'Live Fleet Map')}</h4>
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-fixed rounded">{t('real_time', 'Real-time')}</span>
              </div>
              <div className="relative h-64 bg-surface-container">
                {/* Map Placeholder Visualization */}
                <div 
                  className="absolute inset-0 grayscale contrast-125 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')]" 
                  data-alt="abstract top down map view of urban city grid with roads and blocks in neutral tones" 
                  style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
                {/* Mock Pointers */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary border-2 border-surface rounded-full shadow-lg ring-4 ring-primary/20"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary border-2 border-surface rounded-full shadow-lg ring-4 ring-primary/20"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-tertiary border-2 border-surface rounded-full shadow-lg ring-4 ring-tertiary/20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <button className="w-full bg-surface text-on-background font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:bg-surface-container-low transition-all">
                    <Map className="w-5 h-5 text-primary" />
                    {t('launch_full_map_dispatch', 'Launch Full Map Dispatch')}
                  </button>
                </div>
              </div>
            </section>

            {/* Unit Distribution Chart */}
            <section className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20">
              <h4 className="text-md font-serif font-bold text-on-background mb-6">{t('unit_distribution', 'Unit Distribution')}</h4>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-on-surface-variant">{t('downtown_core', 'Downtown Core')}</span>
                    <span className="text-sm font-bold text-primary">{t('5_units', '5 Units')}</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[41.6%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-on-surface-variant">{t('north_industrial', 'North Industrial')}</span>
                    <span className="text-sm font-bold text-primary">{t('4_units', '4 Units')}</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[33.3%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-on-surface-variant">{t('south_residential', 'South Residential')}</span>
                    <span className="text-sm font-bold text-primary">{t('3_units', '3 Units')}</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[25%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/30">
                <div className="bg-primary-fixed p-4 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface rounded-full flex shrink-0 items-center justify-center">
                    <Info className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-primary-fixed">{t('optimization_tip', 'Optimization Tip')}</p>
                    <p className="text-[10px] text-on-primary-fixed-variant">{t('north_zone_volume_is_peaking__consider_m', 'North zone volume is peaking. Consider moving 1 unit from Downtown.')}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};