import { useTranslation } from 'react-i18next';
import React from 'react';
import { Calendar, Truck, Clock, Percent, DollarSign, Star } from 'lucide-react';

export default function FleetAnalytics() {
  const { t } = useTranslation();
  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-on-background tracking-tight">{t("fleet.analytics", "Fleet Analytics")}</h1>
          <p className="text-on-surface-variant mt-1">{t('operational_performance_and_revenue_insi', 'Operational performance and revenue insights for Terra Towing.')}</p>
        </div>
        <div className="flex items-center gap-3 bg-surface p-1 rounded-xl shadow-sm border border-outline-variant/30">
          <button className="px-4 py-2 text-sm font-bold bg-primary/10 text-primary rounded-lg">{t('last_30_days', 'Last 30 Days')}</button>
          <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg">{t('last_quarter', 'Last Quarter')}</button>
          <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg">{t('custom', 'Custom')}</button>
          <div className="pr-2 pl-4 flex items-center gap-2 text-outline">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">+12.5%</span>
          </div>
          <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('total_trips', 'Total Trips')}</h3>
          <p className="text-3xl font-bold text-on-background">1,482</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded">-2m</span>
          </div>
          <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('avg__response_time', 'Avg. Response Time')}</h3>
          <p className="text-3xl font-bold text-on-background">{t('18_mins', '18 mins')}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Percent className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">+4%</span>
          </div>
          <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('fleet_utilization', 'Fleet Utilization')}</h3>
          <p className="text-3xl font-bold text-on-background">84.2%</p>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">+22%</span>
          </div>
          <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('estimated_revenue', 'Estimated Revenue')}</h3>
          <p className="text-3xl font-bold text-on-background">$142,500</p>
        </div>
      </div>

      {/* Bento Layout Main Section */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Trip Volume Chart (Line Chart Visual) */}
        <div className="col-span-12 lg:col-span-8 bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-on-background">{t('trip_volume_over_time', 'Trip Volume Over Time')}</h2>
              <p className="text-on-surface-variant text-sm">{t('aggregated_daily_dispatch_count', 'Aggregated daily dispatch count')}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>{t('completed', 'Completed')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-surface-container"></span>
                <span>{t('cancelled', 'Cancelled')}</span>
              </div>
            </div>
          </div>
          
          {/* Mock Chart Canvas */}
          <div className="h-64 w-full relative flex items-end justify-between px-2 group">
            <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
            </div>
            
            {/* Simulated bars/line graph nodes */}
            <div className="w-1/12 h-[45%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-on-primary text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">{t('42_trips', '42 trips')}</div>
            </div>
            <div className="w-1/12 h-[60%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[55%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[80%] bg-primary rounded-t-lg relative group/bar hover:bg-primary/110 transition-colors shadow-lg"></div>
            <div className="w-1/12 h-[70%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[65%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[90%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[40%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[75%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
            <div className="w-1/12 h-[85%] bg-primary/20 rounded-t-lg relative group/bar hover:bg-primary/40 transition-colors"></div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-widest">
            <span>{t('mon', 'Mon')}</span><span>{t('tue', 'Tue')}</span><span>{t('wed', 'Wed')}</span><span>{t('thu', 'Thu')}</span><span>{t('fri', 'Fri')}</span><span>{t('sat', 'Sat')}</span><span>{t('sun', 'Sun')}</span>
          </div>
        </div>

        {/* Service Type Breakdown (Pie Chart Visual) */}
        <div className="col-span-12 lg:col-span-4 bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col">
          <h2 className="text-xl font-bold text-on-background mb-1">{t('service_breakdown', 'Service Breakdown')}</h2>
          <p className="text-on-surface-variant text-sm mb-8">{t('requests_by_category', 'Requests by category')}</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-tertiary-fixed-dim flex items-center justify-center">
              {/* Simulated segments with conic gradient */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#4a7c59 0% 45%, #705c30 45% 75%, #c8e8d0 75% 100%)', clipPath: 'circle(50% at 50% 50%)', WebkitMask: 'radial-gradient(transparent 58%, #000 60%)' }}></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-on-background leading-none">1.4k</p>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{t('total', 'Total')}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-on-surface-variant">{t('recovery', 'Recovery')}</span>
              </div>
              <span className="text-sm font-bold">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <span className="text-sm font-medium text-on-surface-variant">{t('roadside_assistance', 'Roadside Assistance')}</span>
              </div>
              <span className="text-sm font-bold">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                <span className="text-sm font-medium text-on-surface-variant">{t('transport', 'Transport')}</span>
              </div>
              <span className="text-sm font-bold">25%</span>
            </div>
          </div>
        </div>

        {/* Hotspots Map Widget */}
        <div className="col-span-12 lg:col-span-5 bg-surface rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="text-xl font-bold text-on-background">{t('demand_hotspots', 'Demand Hotspots')}</h2>
            <p className="text-on-surface-variant text-sm mb-4">{t('high_density_call_origins_this_week', 'High-density call origins this week')}</p>
          </div>
          <div className="h-80 w-full bg-surface-container-low relative grayscale opacity-80" data-alt="Monochromatic city map layout with subtle topography lines and soft shadows representing call volume hotspots in a metropolitan area" data-location="Austin, Texas" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBe75N0JoE0RX2qLqcLBXCCSmE0LuGJa49873haYgF1bEjlZUkwS5Qf-LZFH2y6yvjOB47UXeuJ2rTLEmGWRl2_d3doY2m3I9gVQN9vxDdmS7o6mvjxc1_kLVCN1wMb6ntJHICsSsWKNw2QhDnV4uYwPV4gPyX1q3EnCJlarf4PwEv6zzvF1RnZTgwxSEWcXds_2YeSGRA3C6Vu19Xm0V51ojojY-hflNSu39vm9rSSyfrGAgPF_wcvAq19crQ8sBiDMgO5CiTzlvo')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Pulse animations for hotspots */}
            <div className="absolute top-1/4 left-1/3">
              <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping"></div>
              <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-surface shadow-lg"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="relative w-6 h-6 bg-primary rounded-full border-2 border-surface shadow-lg"></div>
            </div>
            <div className="absolute top-1/2 left-2/3">
              <div className="absolute inset-0 bg-tertiary/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative w-3 h-3 bg-tertiary rounded-full border-2 border-surface shadow-lg"></div>
            </div>
          </div>
          <div className="p-4 bg-surface-container-low flex items-center justify-between text-xs font-bold text-on-surface-variant">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> {t('high_density', 'High Density')}</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-tertiary"></span> {t('emerging', 'Emerging')}</span>
            <button className="text-primary hover:underline">{t('full_map_view', 'Full Map View')}</button>
          </div>
        </div>

        {/* Top Performing Drivers */}
        <div className="col-span-12 lg:col-span-7 bg-surface p-8 rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-on-background">{t('top_performing_drivers', 'Top Performing Drivers')}</h2>
              <p className="text-on-surface-variant text-sm">{t('monthly_performance_metrics', 'Monthly performance metrics')}</p>
            </div>
            <button className="text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">{t('view_all_fleet', 'View All Fleet')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-outline uppercase tracking-widest border-b border-outline-variant/30">
                  <th className="pb-4">{t('driver', 'Driver')}</th>
                  <th className="pb-4">{t('status', 'Status')}</th>
                  <th className="pb-4">{t('trips', 'Trips')}</th>
                  <th className="pb-4">{t('rating', 'Rating')}</th>
                  <th className="pb-4 text-right">{t('revenue', 'Revenue')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img alt="Driver Profile" className="w-9 h-9 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDagtSQyWTIO8ozzqhwDpPUEQt0PMSzyjUvB9Ic3thaOmWcXMZIHCawBHuGkvFAe6hEkjuKVSQMLVRco0XP9F_af9PJJ0MB1QLeWYiCqmlxy38ciDCLWEuvpaunzj65ftOl_Z-xlFQV3Z8MWAQiJJ-Tg-CfHoRdGQMM0rUtwakuLf6xE08uvlBa4jQjI2EdQr1Fek9I3HEWTxFwAXXI7ORA-0mKx8DWnxtaDC2fGh8czMlwmioK0tDGs1uZPv4LWZ9J4SDBmO74I-M"/>
                      <div>
                        <p className="text-sm font-bold text-on-background leading-none">{t('marcus_thorne', 'Marcus Thorne')}</p>
                        <p className="text-[10px] text-outline mt-1">{t('truck__042', 'Truck #042')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">{t('active', 'Active')}</span>
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-bold">124</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-4 h-4 fill-tertiary" />
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <p className="text-sm font-bold">$12,480</p>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img alt="Driver Profile" className="w-9 h-9 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE_kZAbhROaOwSyiZOeL8o-3zZw-n8jyQuaaMZT-57cK9j-TY3fT0v1cFV0s6bMPQqaG3HnMBboAZpjS4hKOHGVQ3_y6vqWZAfgCIU6FfkoRqwDRpVHNpbms10j5lnqSnRk5xhuNGx5VvTVjP9KY5AC9S5wBBpy8-V5ITuAY64L5d4VSIYr-TBEcqzkXMQQ6Ehg9gYFMRuaJ9L3-x1rV8gN8JeBG-T1SmmN5bqzuBNvpu044TbOtrfCsHvrQSbiMqaeFVhaLSarBs"/>
                      <div>
                        <p className="text-sm font-bold text-on-background leading-none">{t('sarah_jenkins', 'Sarah Jenkins')}</p>
                        <p className="text-[10px] text-outline mt-1">{t('truck__089', 'Truck #089')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">{t('active', 'Active')}</span>
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-bold">118</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-4 h-4 fill-tertiary" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <p className="text-sm font-bold">$11,210</p>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img alt="Driver Profile" className="w-9 h-9 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmUkyvxD-3pwrtEOVi1TiMYUQDFkFoWdgDiFu4BJ0Frqdye4REIE8vkUsT-X908YOLkaZVpUroXYKAxWQKekQ9HfdMre1a286YhsXF3GfYLuwX6HCJ4CWOL3byr4VZGD8ZxWFUCSxJ5oOVfjCgw8YxznkEtlEL6w5bYdcn6pXr6KV7yaDqcClNlFciWfdSrMFu-6iIPXmpLmEUQXKFQpwOk1WM5hJsL375Z2TxuE9rSzh69o9ilqOdGf999NuMthobEPwnkl1mJtQ"/>
                      <div>
                        <p className="text-sm font-bold text-on-background leading-none">{t('leo_vargas', 'Leo Vargas')}</p>
                        <p className="text-[10px] text-outline mt-1">{t('truck__051', 'Truck #051')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">{t('off_duty', 'Off-duty')}</span>
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-bold">106</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-4 h-4 fill-tertiary" />
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <p className="text-sm font-bold">$9,850</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
