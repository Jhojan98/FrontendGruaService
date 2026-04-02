import { useTranslation } from 'react-i18next';
import React from 'react';
import { Search, ChevronDown, AlignLeft, AtSign, Phone, Calendar, CreditCard, Clock, ArrowDown, UserPlus } from 'lucide-react';

export const ClientManagement: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">{t("clients.title", "Client Management")}</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm">{t("clients.subtitle", "Manage your corporate accounts and regular customers.")} Track engagement, billing status, and service history across your entire network.</p>
        </div>
        <button className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm">
          <UserPlus className="w-4 h-4" />
          <span>{t("clients.add", "Add New Client")}</span>
        </button>
      </div>
      
      {/* Filters & Search Bento Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-6 bg-surface p-2 rounded-xl flex items-center gap-2 border border-outline-variant/30">
          <div className="bg-surface-container-low p-2 rounded-lg">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <input className="bg-transparent border-none focus:ring-0 w-full font-body text-on-surface outline-none text-sm" placeholder={t("clients.search", "Search by client name, email, or company...")} type="text" />
        </div>
        <div className="md:col-span-3 bg-surface p-3 rounded-xl flex items-center justify-between border border-outline-variant/30 px-4 cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="text-sm font-semibold text-on-surface-variant">{t("clients.statusAll", "Status: All")}</span>
          <ChevronDown className="w-4 h-4 text-outline" />
        </div>
        <div className="md:col-span-3 bg-surface p-3 rounded-xl flex items-center justify-between border border-outline-variant/30 px-4 cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="text-sm font-semibold text-on-surface-variant">{t("clients.sortRecent", "Sort: Most Recent")}</span>
          <AlignLeft className="w-4 h-4 text-outline" />
        </div>
      </div>
      
      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Client Card 1: Corporate (Large) */}
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
          <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
            <img alt="Company Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="modern corporate building" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-primary">{t('swift_logistics_inc', 'Swift Logistics Inc.')}</h3>
                  <p className="text-on-surface-variant font-medium text-xs mt-1">{t('corporate_account___id___sw_9022', 'Corporate Account • ID: #SW-9022')}</p>
                </div>
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{t('active', 'Active')}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <AtSign className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('billing_swift_com', 'billing@swift.com')}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Calendar className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('last__oct_24__2023', 'Last: Oct 24, 2023')}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <CreditCard className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('terms__net_30', 'Terms: Net 30')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button className="text-primary font-bold text-xs border border-primary/30 hover:border-primary px-4 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">{t('view_details', 'View Details')}</button>
              <button className="text-on-surface-variant font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">{t('edit', 'Edit')}</button>
            </div>
          </div>
        </div>
        
        {/* Client Card 2: Individual (Standard) */}
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
          <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
            <img alt="Customer Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="headshot of a man" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-primary">{t('marcus_holloway', 'Marcus Holloway')}</h3>
                  <p className="text-on-surface-variant font-medium text-xs mt-1">{t('regular_customer___id___ind_4431', 'Regular Customer • ID: #IND-4431')}</p>
                </div>
                <span className="bg-tertiary text-on-primary px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">{t('premium', 'Premium')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mt-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Calendar className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('last__sep_12__2023', 'Last: Sep 12, 2023')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button className="text-primary font-bold text-xs border border-primary/30 hover:border-primary px-4 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">{t('view_details', 'View Details')}</button>
              <button className="text-on-surface-variant font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">{t('edit', 'Edit')}</button>
            </div>
          </div>
        </div>
        
        {/* Client Card 3: Enterprise (Large Highlight) */}
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
          <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
            <img alt="Company Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="interior of a modern office" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200&h=200" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-primary">{t('apex_construction', 'Apex Construction')}</h3>
                  <p className="text-on-surface-variant font-medium text-xs mt-1">{t('enterprise___id___ap_1102', 'Enterprise • ID: #AP-1102')}</p>
                </div>
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{t('active', 'Active')}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <AtSign className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('fleet_apex_build', 'fleet@apex.build')}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">+1 (555) 246-8135</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Calendar className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('last__yesterday', 'Last: Yesterday')}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Clock className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('trips_mo__14', 'Trips/mo: 14')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button className="text-primary font-bold text-xs border border-primary/30 hover:border-primary px-4 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">{t('view_details', 'View Details')}</button>
              <button className="text-on-surface-variant font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">{t('edit', 'Edit')}</button>
            </div>
          </div>
        </div>
        
        {/* Client Card 4: Inactive */}
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow opacity-75 grayscale-[0.3]">
          <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
            <img alt="Customer Profile" className="w-full h-full object-cover" data-alt="professional woman" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-on-surface-variant">{t('sarah_jenkins', 'Sarah Jenkins')}</h3>
                  <p className="text-on-surface-variant font-medium text-xs mt-1">{t('individual___id___ind_9921', 'Individual • ID: #IND-9921')}</p>
                </div>
                <span className="bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{t('inactive', 'Inactive')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mt-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">+1 (555) 444-2222</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Calendar className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs">{t('last__jan_15__2023', 'Last: Jan 15, 2023')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <button className="text-primary font-bold text-xs border border-primary/30 hover:border-primary px-4 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">{t('reactivate', 'Reactivate')}</button>
              <button className="text-error font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-error/10 transition-colors">{t('delete', 'Delete')}</button>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Pagination / View More */}
      <div className="mt-10 flex justify-center pb-8">
        <button className="bg-surface text-primary text-sm border border-outline-variant/30 shadow-sm px-6 py-2.5 rounded-full font-bold hover:bg-surface-container-low transition-all flex items-center gap-2 group">
          <span>{t('load_more_clients', 'Load More Clients')}</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};