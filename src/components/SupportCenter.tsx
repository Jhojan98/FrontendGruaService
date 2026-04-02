import { useTranslation } from 'react-i18next';
import React from 'react';
import { 
  Search, 
  Radio, 
  Truck, 
  Receipt, 
  Settings, 
  Paperclip, 
  Phone, 
  Mail, 
  MessageCircle 
} from 'lucide-react';

export const SupportCenter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 max-w-6xl mx-auto overflow-y-auto h-full pb-24 md:pb-8">
      {/* Hero Search Section */}
      <section className="mb-12 text-center py-12 bg-primary-container/20 rounded-xl overflow-hidden relative border border-primary/5">
        <div className="relative z-10 px-6">
          <h1 className="font-serif text-4xl text-primary font-bold mb-4">{t('how_can_we_help_you_today', 'How can we help you today?')}</h1>
          <p className="font-sans text-on-surface-variant mb-8 max-w-xl mx-auto">
            {t('find_quick_answers__technical_guides__or', 'Find quick answers, technical guides, or connect with our support team for specialized fleet assistance.')}
          </p>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={24} />
            <input 
              className="w-full h-16 pl-14 pr-6 rounded-full border-none shadow-sm text-lg focus:ring-4 focus:ring-primary/10 bg-surface placeholder:text-outline" 
              placeholder={t('search_articles__topics__or_faqs', 'Search articles, topics, or FAQs...')} 
              type="text" 
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
      </section>

      {/* Quick Help Categories (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <a className="group p-6 bg-surface rounded-xl shadow-sm hover:translate-y-[-4px] transition-all duration-300 border border-transparent hover:border-primary/20" href="#">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
            <Radio size={24} />
          </div>
          <h3 className="font-serif text-lg text-on-background mb-2">{t('dispatching_basics', 'Dispatching Basics')}</h3>
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{t('master_the_art_of_real_time_towing_manag', 'Master the art of real-time towing management and route optimization.')}</p>
        </a>

        <a className="group p-6 bg-surface rounded-xl shadow-sm hover:translate-y-[-4px] transition-all duration-300 border border-transparent hover:border-primary/20" href="#">
          <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center mb-4 group-hover:bg-tertiary group-hover:text-on-primary transition-colors">
            <Truck size={24} />
          </div>
          <h3 className="font-serif text-lg text-on-background mb-2">{t('fleet_management', 'Fleet Management')}</h3>
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{t('add_vehicles__assign_drivers__and_manage', 'Add vehicles, assign drivers, and manage vehicle health reports.')}</p>
        </a>

        <a className="group p-6 bg-surface rounded-xl shadow-sm hover:translate-y-[-4px] transition-all duration-300 border border-transparent hover:border-primary/20" href="#">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
            <Receipt size={24} />
          </div>
          <h3 className="font-serif text-lg text-on-background mb-2">{t('client_billing', 'Client Billing')}</h3>
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{t('understanding_invoices__payouts__and_con', 'Understanding invoices, payouts, and connecting payment gateways.')}</p>
        </a>

        <a className="group p-6 bg-surface rounded-xl shadow-sm hover:translate-y-[-4px] transition-all duration-300 border border-transparent hover:border-primary/20" href="#">
          <div className="w-12 h-12 bg-error/10 text-error rounded-lg flex items-center justify-center mb-4 group-hover:bg-error group-hover:text-on-primary transition-colors">
            <Settings size={24} />
          </div>
          <h3 className="font-serif text-lg text-on-background mb-2">{t('technical_support', 'Technical Support')}</h3>
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{t('hardware_integration__gps_tracking_issue', 'Hardware integration, GPS tracking issues, and software updates.')}</p>
        </a>
      </section>

      {/* Main Interactive Area: Ticket & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Submission Form */}
        <div className="lg:col-span-2 bg-surface rounded-xl p-8 shadow-sm border border-outline-variant/30">
          <h2 className="font-serif text-2xl text-on-background mb-2">{t('submit_a_ticket', 'Submit a Ticket')}</h2>
          <p className="font-sans text-on-surface-variant text-sm mb-8">{t('having_a_specific_issue__our_expert_team', 'Having a specific issue? Our expert team typically responds within 4 working hours.')}</p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('issue_type', 'Issue Type')}</label>
                <select className="w-full bg-surface border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20">
                  <option>{t('general_inquiry', 'General Inquiry')}</option>
                  <option>{t('app_performance', 'App Performance')}</option>
                  <option>{t('billing_discrepancy', 'Billing Discrepancy')}</option>
                  <option>{t('hardware_failure', 'Hardware Failure')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('urgency', 'Urgency')}</label>
                <select className="w-full bg-surface border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20">
                  <option>{t('low___question', 'Low - Question')}</option>
                  <option>{t('medium___performance_lag', 'Medium - Performance lag')}</option>
                  <option>{t('high___operational_block', 'High - Operational Block')}</option>
                  <option>{t('critical___system_down', 'Critical - System Down')}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('subject', 'Subject')}</label>
              <input className="w-full bg-surface border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" placeholder={t('summary_of_the_issue', 'Summary of the issue')} type="text" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('detailed_description', 'Detailed Description')}</label>
              <textarea className="w-full bg-surface border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" placeholder={t('please_provide_as_much_detail_as_possibl', 'Please provide as much detail as possible, including truck numbers or job IDs if applicable...')} rows={5}></textarea>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline" type="button">
                <Paperclip size={18} /> {t('attach_screenshots', 'Attach Screenshots')}
              </button>
              <button className="bg-primary text-on-primary px-10 py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity" type="submit">
                {t('send_request', 'Send Request')}
              </button>
            </div>
          </form>
        </div>

        {/* Contact & Internal Team Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-primary/5 border border-primary/10 p-8 rounded-xl">
            <h3 className="font-serif text-xl font-bold text-primary mb-6">{t('contact_us', 'Contact Us')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-tertiary shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('phone_support', 'Phone Support')}</div>
                  <div className="font-sans font-bold text-on-background">{t('1__888__terra_tow', '+1 (888) TERRA-TOW')}</div>
                  <div className="text-xs text-on-surface-variant">{t('mon_fri__8am_8pm_est', 'Mon-Fri, 8am-8pm EST')}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-tertiary shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('email_support', 'Email Support')}</div>
                  <div className="font-sans font-bold text-on-background">{t('fleet_care_terratowing_com', 'fleet.care@terratowing.com')}</div>
                  <div className="text-xs text-on-surface-variant">{t('typical_response__lt__4h', 'Typical response &lt; 4h')}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-tertiary shadow-sm">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('live_chat', 'Live Chat')}</div>
                  <div className="font-sans font-bold text-on-background">{t('available_in_app', 'Available in-app')}</div>
                  <div className="text-xs text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {t('specialists_online', 'Specialists Online')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Support Team Profile */}
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">{t('your_support_lead', 'Your Support Lead')}</h4>
            <div className="flex items-center gap-4">
              <img alt="Support Specialist" className="w-14 h-14 rounded-full border-2 border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxmN0IvBsuMoNVmKiPf8RdR1se4rPjU6q0P1EWh3n5vSrH53Ko5AQPR1vdfN3JbRFJHQ9Bi_qICW816BsYIwiSga3v6ONL8WKcz6PzklXEy67F35CcUhcCNcjPXY48vgzbmXmhhebUN4sLJx0ru0Vgv2esuyPBjXXEopRvVq07rmo7_maOowpYySVxCiS8fE8U_EIAz449oSUTwUhfLJc-GQYxbw90pSwhAhcOovGdpmDt-lVAWwbRDyT8ynmi-sgZyp2y42kG9_g" />
              <div>
                <div className="font-bold text-on-background">{t('marcus_thorne', 'Marcus Thorne')}</div>
                <div className="text-xs text-on-surface-variant">{t('senior_operations_specialist', 'Senior Operations Specialist')}</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant italic">{t('our_goal_is_to_keep_your_fleet_moving__r', '"Our goal is to keep your fleet moving. Reach out anytime you hit a snag."')}</p>
          </div>
        </div>
      </div>

      {/* FAQ/Help Footer */}
      <section className="mt-16 text-center border-t border-outline-variant/30 pt-12">
        <h3 className="font-serif text-2xl text-on-background mb-4">{t('still_looking_for_answers', 'Still looking for answers?')}</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-2.5 bg-surface-container-high rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">{t('documentation', 'Documentation')}</button>
          <button className="px-6 py-2.5 bg-surface-container-high rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">{t('community_forum', 'Community Forum')}</button>
          <button className="px-6 py-2.5 bg-surface-container-high rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">{t('system_status', 'System Status')}</button>
          <button className="px-6 py-2.5 bg-surface-container-high rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">{t('api_reference', 'API Reference')}</button>
        </div>
      </section>
    </div>
  );
};
