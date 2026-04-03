import React from 'react';
import { ArrowLeft, Edit, Plus, HelpCircle, Mail, Phone, Share2, Info, Wallet, CreditCard, Car, History, CheckCircle, XCircle, ChevronRight, ChevronDown } from 'lucide-react';

export const ClientDetails: React.FC<{ 
  onBack: () => void;
  onEdit?: () => void;
  onNewDispatch?: () => void;
}> = ({ onBack, onEdit, onNewDispatch }) => {
  return (
    <div className="flex-1 min-w-0 bg-background p-6 md:p-10 space-y-8 h-full overflow-y-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-surface-variant rounded-full transition-colors mr-2">
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-on-surface font-headline">Swift Logistics Inc.</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 tracking-wide">ACTIVE</span>
            </div>
            <p className="text-stone-500 font-medium">Customer since October 2021</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onEdit} className="flex items-center gap-2 px-5 py-2.5 bg-background border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
            <Edit className="w-4 h-4" />
            Edit Client
          </button>
          <button onClick={onNewDispatch} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Dispatch
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Section 1: Compact Client Identity */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="flex flex-col gap-6">
            <div className="w-20 h-20 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center overflow-hidden p-3 shadow-sm">
              <img alt="Company Logo" className="w-full h-full object-contain opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8qzCVQZLcZPWouhoMeSOdw4IbQlnO0-UoR4sCzir5qjWNZaDl11pekZLg9lj52Rp1jT4phwG4hBDLJTBbXM6qJs0tbOuSQr_fvN5XQhQ8tKxfClYBX19ZoeZ7dWEO34nbzl7KoAF7JEkQkrosJ1b-RiSFw72H2upsonG0jDOFGNypJSdc7tJpGMp7fdUbEPpinH3YUGiggfbv_TC58jhNyuFpn9QhzCEaswCNCTI3m5sgFSJx-3WtEwmabJB6pvVatpUsWTfMzUY" />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Company Name</h3>
                <p className="text-base font-bold text-on-surface">Swift Logistics Inc.</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Account ID</h3>
                <p className="text-base font-bold text-on-surface">SWIFT-99283-TL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Hub */}
        <div className="md:col-span-8 bg-primary text-on-primary rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-headline">
              <HelpCircle className="w-5 h-5" />
              Contact Hub
            </h2>
            <div className="grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-70">Email Address</h3>
                    <p className="text-base font-medium">m.sterling@swiftlogistics.com</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-70">Primary Phone</h3>
                      <p className="text-base font-medium">+1 (555) 342-9901</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-70">Emergency Dispatch</h3>
                      <p className="text-base font-medium">+1 (555) 342-9999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20 text-xs italic opacity-80 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Prefer automated SMS for status updates.
          </div>
        </div>

        {/* Section 3: Billing & Financials */}
        <div className="md:col-span-12 lg:col-span-4 bg-surface-container-high rounded-xl p-6 shadow-sm border border-outline-variant/30">
          <h2 className="text-lg font-bold mb-6 text-tertiary flex items-center gap-2 font-headline">
            <Wallet className="w-5 h-5" />
            Billing & Financials
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Billing Address</h3>
              <p className="text-on-surface leading-relaxed text-sm">
                442 Industrial Parkway, Suite 200<br/>
                South San Francisco, CA 94080
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Tax ID</h3>
                <p className="font-medium text-sm">XX-XXX4491</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Terms</h3>
                <p className="font-medium text-sm">Net 30</p>
              </div>
            </div>
            <div className="p-4 bg-surface rounded-lg border border-outline-variant/20">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Payment Method</h3>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-secondary" />
                <span className="font-medium text-sm">Visa ending in 8832</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Registered Vehicles */}
        <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-headline">
              <Car className="w-5 h-5" />
              Registered Vehicles
            </h2>
            <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">12 Units Total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  <th className="pb-3 px-4">Make / Model</th>
                  <th className="pb-3 px-4">Year</th>
                  <th className="pb-3 px-4">License Plate</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4 font-medium">Freightliner Cascadia</td>
                  <td className="py-4 px-4 text-stone-500">2023</td>
                  <td className="py-4 px-4 font-mono font-bold text-stone-600">8ABC123</td>
                </tr>
                <tr className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4 font-medium">Peterbilt 579</td>
                  <td className="py-4 px-4 text-stone-500">2022</td>
                  <td className="py-4 px-4 font-mono font-bold text-stone-600">4XYZ980</td>
                </tr>
                <tr className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4 font-medium">Kenworth T680</td>
                  <td className="py-4 px-4 text-stone-500">2021</td>
                  <td className="py-4 px-4 font-mono font-bold text-stone-600">9LMN552</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 py-2 text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-1">
            View Full Fleet Registry
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Section 5: Recent Trip History */}
        <div className="md:col-span-12 bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-headline">
              <History className="w-5 h-5" />
              Recent Trip History
            </h2>
            <button className="text-primary text-sm font-bold hover:underline">View All Activities</button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-background border border-outline-variant/10 rounded-lg hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm">Heavy Duty Tow - Oakland Yard</h4>
                  <p className="text-xs text-stone-500">Trip ID: #88219 • Jun 12, 2024 • Dispatch: John Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Service</p>
                  <p className="text-xs font-medium text-on-surface">Emergency Recovery</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$450.00</span>
                  <span className="text-[10px] text-primary font-bold px-2 py-0.5 bg-primary/10 rounded uppercase">Paid</span>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-primary transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-outline-variant/10 rounded-lg hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm">Jumpstart / Service Call</h4>
                  <p className="text-xs text-stone-500">Trip ID: #88155 • Jun 08, 2024 • Dispatch: Sarah Lee</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Service</p>
                  <p className="text-xs font-medium text-on-surface">Roadside Assist</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$125.00</span>
                  <span className="text-[10px] text-primary font-bold px-2 py-0.5 bg-primary/10 rounded uppercase">Paid</span>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-primary transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-outline-variant/10 rounded-lg hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm">Standard Tow - Hwy 101</h4>
                  <p className="text-xs text-stone-500">Trip ID: #88001 • Jun 02, 2024 • Dispatch: Mike Ross</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Service</p>
                  <p className="text-xs font-medium text-on-surface">Local Towing</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$0.00</span>
                  <span className="text-[10px] text-error font-bold px-2 py-0.5 bg-error/10 rounded uppercase">Cancelled</span>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
