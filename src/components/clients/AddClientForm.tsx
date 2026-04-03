import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  PlusCircle, 
  X, 
  Truck, 
  CheckCircle2, 
  Leaf, 
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AddClientFormProps {
  onCancel: () => void;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ onCancel }) => {
  const { t } = useTranslation();
  const [clientType, setClientType] = useState<'corporate' | 'individual'>('corporate');
  const [terms, setTerms] = useState<string>('COD');

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', make: 'Peterbilt', model: '389 Sleeper', licensePlate: 'TRK-9902' }
  ]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', licensePlate: '' });

  const handleAddVehicle = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.licensePlate) {
      setVehicles([...vehicles, { ...newVehicle, id: Date.now().toString() }]);
      setNewVehicle({ make: '', model: '', licensePlate: '' });
      setIsAddingVehicle(false);
    }
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-background">
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-on-background tracking-tight font-headline">{t("add_client.title", "Onboard New Partner")}</h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg border border-outline-variant text-stone-600 hover:bg-surface-container transition-colors font-bold text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                console.log('Saved Client');
                onCancel();
              }} 
              className="px-6 py-2.5 rounded-lg bg-primary text-white shadow-sm hover:opacity-90 active:scale-95 transition-all font-bold text-sm"
            >
              Save Client
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-20">
          <div className="md:col-span-8 space-y-8">
            <section className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-on-surface font-headline">{t("add_client.section.client_info", "Client Information")}</h3>
                <div className="flex bg-surface-container-highest p-1 rounded-full">
                  <button 
                    onClick={() => setClientType('corporate')}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${clientType === 'corporate' ? 'bg-primary text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                  >
                    Corporate
                  </button>
                  <button 
                    onClick={() => setClientType('individual')}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${clientType === 'individual' ? 'bg-primary text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                  >
                    Individual
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 mb-4">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1 mb-3">{t("add_client.profile_photo_label", "Profile Photo / Brand Logo")}</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant text-stone-400">
                      <ImageIcon className="w-8 h-8 text-stone-400" />
                    </div>
                    <div className="space-y-2">
                      <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">
                        Upload New
                      </button>
                      <p className="text-xs text-stone-500">{t("add_client.logo_hint", "JPG, PNG or GIF. Max size 2MB.")}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.company_name", "Company Name")}</label>
                  <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all outline-none text-on-surface" placeholder="e.g. Acme Logistics Corp" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.contact_person", "Contact Person")}</label>
                  <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all outline-none text-on-surface" placeholder="Full name" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.email_address", "Email Address")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                    <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 pl-11 pr-4 transition-all outline-none text-on-surface" placeholder="billing@acme.com" type="email"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.phone_number", "Phone Number")}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                    <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 pl-11 pr-4 transition-all outline-none text-on-surface" placeholder="+1 (555) 000-0000" type="tel"/>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <h3 className="text-xl font-bold text-on-surface mb-6 font-headline">{t("add_client.section.billing", "Billing & Financials")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.street_address", "Street Address")}</label>
                  <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all outline-none text-on-surface" placeholder="123 Industrial Way, Suite 400" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.city", "City")}</label>
                  <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all outline-none text-on-surface" placeholder="e.g. Austin" type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.state", "State")}</label>
                    <select className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all appearance-none outline-none text-on-surface">
                      <option>CA</option>
                      <option>TX</option>
                      <option>NY</option>
                      <option>FL</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.zip_code", "ZIP Code")}</label>
                    <input className="w-full bg-background border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 transition-all outline-none text-on-surface" placeholder="00000" type="text"/>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant block ml-1">{t("add_client.payment_terms", "Payment Terms")}</label>
                <div className="flex flex-wrap gap-3">
                  {['Net 30', 'Net 60', 'COD', 'Prepaid'].map(term => (
                    <label key={term} className="flex-1 min-w-[80px]">
                      <input 
                        type="radio" 
                        name="terms" 
                        className="hidden peer" 
                        checked={terms === term}
                        onChange={() => setTerms(term)}
                      />
                      <div className="p-3 border border-outline-variant rounded-lg text-center cursor-pointer font-bold text-sm text-stone-600 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all">
                        {term}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-4 space-y-8">
            <section className="bg-surface-container-low p-6 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-on-surface font-headline">{t("add_client.section.vehicle_fleet", "Vehicle Fleet")}</h3>
                <button 
                  onClick={() => setIsAddingVehicle(true)}
                  className="text-primary flex items-center gap-1 text-sm font-bold hover:underline"
                >
                  <PlusCircle className="w-4 h-4" /> Add
                </button>
              </div>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                {t("add_client.vehicle_fleet_desc", "Register initial vehicles for this client to speed up future dispatching.")}
              </p>
              
              <div className="space-y-4">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="p-4 bg-background rounded-lg border border-outline-variant relative group transition-all hover:border-primary/50 hover:shadow-sm">
                    <button 
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Make</label>
                        <div className="text-sm font-medium outline-none text-on-surface">{vehicle.make}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Model</label>
                        <div className="text-sm font-medium outline-none text-on-surface">{vehicle.model}</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">License Plate</label>
                      <div className="text-sm font-bold text-primary outline-none">{vehicle.licensePlate}</div>
                    </div>
                  </div>
                ))}
                
                {isAddingVehicle ? (
                  <div className="p-4 bg-background rounded-lg border-2 border-primary/50 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{t("add_client.new_vehicle", "New Vehicle Detail")}</h4>
                    <div className="space-y-3 mb-4">
                      <div>
                        <input 
                          className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary rounded-md py-2 px-3 text-sm outline-none transition-all text-on-surface" 
                          placeholder="Make (e.g. Ford)" 
                          value={newVehicle.make}
                          onChange={e => setNewVehicle({...newVehicle, make: e.target.value})}
                        />
                      </div>
                      <div>
                        <input 
                          className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary rounded-md py-2 px-3 text-sm outline-none transition-all text-on-surface" 
                          placeholder="Model (e.g. F-350)" 
                          value={newVehicle.model}
                          onChange={e => setNewVehicle({...newVehicle, model: e.target.value})}
                        />
                      </div>
                      <div>
                        <input 
                          className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary rounded-md py-2 px-3 text-sm outline-none transition-all text-on-surface uppercase" 
                          placeholder="License Plate" 
                          value={newVehicle.licensePlate}
                          onChange={e => setNewVehicle({...newVehicle, licensePlate: e.target.value.toUpperCase()})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsAddingVehicle(false)}
                        className="flex-1 py-2 rounded-md text-xs font-bold text-stone-500 hover:bg-surface-container-highest transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleAddVehicle}
                        disabled={!newVehicle.make || !newVehicle.model || !newVehicle.licensePlate}
                        className="flex-1 py-2 rounded-md text-xs font-bold bg-primary text-white hover:opacity-90 disabled:opacity-50 transition-all"
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsAddingVehicle(true)}
                    className="p-4 border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center py-8 text-stone-400 cursor-pointer hover:border-primary/40 hover:text-primary transition-all bg-surface-container-highest/30"
                  >
                    <Truck className="w-8 h-8 mb-2 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Vehicle</span>
                  </div>
                )}
              </div>
            </section>
            
            <section className="bg-primary/5 rounded-xl p-6 border border-primary/10 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-primary font-bold mb-3 font-headline">{t("add_client.section.onboarding_guide", "Onboarding Guide")}</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-on-surface-variant items-start">
                    <CheckCircle2 className="text-primary w-4 h-4 mt-0.5 shrink-0" />
                    <span className="font-medium">{t("add_client.guide_contact", "Complete contact details ensure timely billing.")}</span>
                  </li>
                  <li className="flex gap-3 text-sm text-on-surface-variant items-start">
                    <CheckCircle2 className="text-primary w-4 h-4 mt-0.5 shrink-0" />
                    <span className="font-medium">{t("add_client.guide_cod", "COD clients require card-on-file in step 2.")}</span>
                  </li>
                </ul>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                <Leaf className="w-32 h-32 text-primary" />
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-tertiary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
