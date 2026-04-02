import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MapPin, Flag, Plus, Minus, Navigation, Settings, Route, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const MapSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'route' | 'tariff'>('route');

  return (
    <section className="w-full h-full relative overflow-hidden bg-surface-container">
      {/* Simulated Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90" 
        style={{ backgroundImage: "url('https://caracol.com.co/resizer/v2/WPROCFWKYNMRXMV6UIQBSJLRBQ.jpg?auth=129d5e77773be2872133c8a6869bc9cad45928e3b007272bda1d4c8aa1144975&quality=70&width=768&height=432&smart=true')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent"></div>
      </div>

      {/* Simulated Route Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
        <motion.path 
          d="M 300 700 Q 500 400 700 300" 
          fill="transparent" 
          stroke="#4a7c59" 
          strokeDasharray="8 4" 
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Markers */}
      <div className="absolute top-[70%] left-[30%] -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-20 scale-150"></div>
          <div className="bg-surface rounded-full p-1 shadow-lg border-2 border-primary">
            <MapPin className="text-primary w-6 h-6 fill-primary/20" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="bg-surface rounded-full p-1 shadow-lg border-2 border-tertiary">
            <Flag className="text-tertiary w-6 h-6 fill-tertiary/20" />
          </div>
        </motion.div>
      </div>

      {/* Route Info & Tariff Floating Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 left-6 right-6 max-w-sm bg-surface-container/90 backdrop-blur-md rounded-2xl shadow-xl border border-surface/50 flex flex-col overflow-hidden"
      >
        {/* Tab Headers */}
        <div className="flex border-b border-outline-variant/30">
          <button 
            className={cn(
              "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2",
              activeTab === 'route' 
                ? "text-primary border-primary" 
                : "text-on-surface-variant border-transparent hover:text-on-surface"
            )}
            onClick={() => setActiveTab('route')}
          >
            {t("routeTab", "Route")}
          </button>
          <button 
            className={cn(
              "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2",
              activeTab === 'tariff' 
                ? "text-primary border-primary" 
                : "text-on-surface-variant border-transparent hover:text-on-surface"
            )}
            onClick={() => setActiveTab('tariff')}
          >
            {t("tariffTab", "Tariff")}
          </button>
        </div>

        <div className="p-5">
          {/* Route Estimates Tab Content */}
          {activeTab === 'route' && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-headline text-lg font-bold text-on-surface">{t("map.routeEstimates", "Route Estimates")}</h3>
                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase">{t('optimal', 'Optimal')}</span>
              </div>

              <div className="space-y-4">
                <RouteStep label={t("map.baseToAccident", "Base to Accident")} value="10 mins • 2.0 mi" status="pending" />
                <RouteStep label={t("map.accidentToDest", "Accident to Dest.")} value="18 mins • 2.6 mi" status="active" />
                <RouteStep label={t("map.destToBase", "Dest. to Base")} value="12 mins • 2.4 mi" status="future" />
              </div>

              <div className="mt-5 pt-4 border-t border-outline-variant/30 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{t('total_duration', 'Total Duration')}</p>
                  <p className="font-headline font-bold text-primary text-xl">{t('40_mins', '40 mins')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{t('total_distance', 'Total Distance')}</p>
                  <p className="font-body font-bold text-on-surface">{t('7_0_mi', '7.0 mi')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tariff Calculation Tab Content */}
          {activeTab === 'tariff' && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-headline text-lg font-bold text-on-surface">{t("map.tariffCalculation", "Tariff Calculation")}</h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md uppercase">{t('flatbed', 'Flatbed')}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <Settings className="text-outline w-4 h-4" />
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tight">{t('base_service_fee', 'Base Service Fee')}</p>
                  </div>
                  <p className="text-xs font-body font-bold text-on-surface">$75.00</p>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <Route className="text-outline w-4 h-4" />
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tight">{t('mileage__7_0_mi____4_50', 'Mileage (7.0 mi @ $4.50)')}</p>
                  </div>
                  <p className="text-xs font-body font-bold text-on-surface">$31.50</p>
                </div>
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <Clock className="text-outline w-4 h-4" />
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tight">{t('urgency_premium', 'Urgency Premium')}</p>
                  </div>
                  <p className="text-xs font-body font-bold text-on-surface">$0.00</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-outline-variant/30 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{t('tax__8', 'Tax (8%)')}</p>
                  <p className="font-body font-bold text-on-surface-variant text-sm">$8.52</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{t('estimated_total', 'Estimated Total')}</p>
                  <p className="font-headline font-bold text-primary text-xl">$115.02</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="flex flex-col bg-surface-container/90 backdrop-blur-md rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden">
          <button className="p-3 hover:bg-surface-container-low transition-colors text-on-surface">
            <Plus className="w-5 h-5" />
          </button>
          <div className="h-[1px] bg-surface-container-low mx-2"></div>
          <button className="p-3 hover:bg-surface-container-low transition-colors text-on-surface">
            <Minus className="w-5 h-5" />
          </button>
        </div>
        <button className="p-3 bg-surface-container/90 backdrop-blur-md rounded-xl shadow-lg border border-outline-variant/30 text-primary hover:bg-surface-container-low transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

const RouteStep = ({ label, value, status }: { label: string; value: string; status: 'active' | 'pending' | 'future' }) => (
  <div className="flex items-center gap-3">
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-2.5 h-2.5 rounded-full border-2",
        status === 'active' ? "bg-primary border-primary shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_rgba(74,124,89,0.2)]" : 
        status === 'pending' ? "border-outline bg-surface" : "border-tertiary bg-surface"
      )} />
      {status !== 'future' && <div className="w-0.5 h-6 bg-surface-container" />}
    </div>
    <div className="flex-1 flex justify-between items-center">
      <p className={cn(
        "text-xs font-bold uppercase tracking-tight",
        status === 'active' ? "text-primary" : "text-on-surface-variant"
      )}>{label}</p>
      <p className="text-xs font-body font-bold text-on-surface">{value}</p>
    </div>
  </div>
);
