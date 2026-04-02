import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, AlertTriangle, UserPlus, Users, Car, Search, X, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Label } from './ui/Inputs';
import { cn } from '../lib/utils';
import { Client, Base } from '../types';
import { createClient, createTrip, listClients, listFleet } from '../lib/api';

export const DispatchForm = () => {
  const { t } = useTranslation();
  const [bases, setBases] = useState<Base[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClientList, setShowClientList] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [clientType, setClientType] = useState<'existing' | 'new'>('existing');
  const [vehicleType, setVehicleType] = useState<'client' | 'manual'>('manual');
  const [urgency, setUrgency] = useState<'normal' | 'high'>('normal');
  const [occupants, setOccupants] = useState(2);
  const [baseId, setBaseId] = useState('');
  const [originAddress, setOriginAddress] = useState('Main St. & 4th Ave, Portland, OR');
  const [destinationAddress, setDestinationAddress] = useState('St. Jude Medical Center, OR');
  const [distance, setDistance] = useState('0 km');
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientMembership, setNewClientMembership] = useState('Standard');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([listFleet(), listClients()])
      .then(([fleet, clientsResponse]) => {
        if (!mounted) {
          return;
        }
        const derivedBases: Base[] = fleet.map((truck) => ({
          id: truck.id,
          name: `${truck.unitNumber} - ${truck.status}`,
        }));
        setBases(derivedBases);
        setBaseId(derivedBases[0]?.id || '');
        setClients(clientsResponse);
      })
      .catch((error) => {
        if (!mounted) {
          return;
        }
        setErrorMessage(error instanceof Error ? error.message : 'Could not load dispatch data');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!originAddress.trim() || !destinationAddress.trim()) {
      setErrorMessage('Origin and destination are required');
      return;
    }

    setLoading(true);
    try {
      let client = selectedClient;

      if (clientType === 'new') {
        if (!newClientName.trim() || !newClientPhone.trim()) {
          throw new Error('Name and phone are required for a new client');
        }
        const created = await createClient({
          name: newClientName.trim(),
          phone: newClientPhone.trim(),
          membership: newClientMembership,
        });
        setClients((previous) => [created, ...previous]);
        client = created;
      }

      if (!client) {
        throw new Error('Select a client before creating dispatch');
      }

      await createTrip({
        clientId: client.id,
        clientName: client.name,
        originAddress: originAddress.trim(),
        destinationAddress: destinationAddress.trim(),
        distance: distance.trim() || '0 km',
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setSearchQuery('');
      setShowClientList(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not create dispatch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full bg-surface overflow-y-auto custom-scrollbar border-l border-outline-variant/30">
      <div className="p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-3xl font-bold text-on-surface">{t("nav.newTrip", "New Dispatch")}</h2>
          <button className="text-outline hover:text-on-surface-variant transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {errorMessage ? (
            <div className="rounded-lg border border-red-300/60 bg-red-100/70 px-3 py-2 text-sm text-red-800">
              {errorMessage}
            </div>
          ) : null}

          {/* Service Information */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Info className="text-primary w-5 h-5 fill-primary/20" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{t('service_information', 'Service Information')}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>{t('base_selection', 'Base Selection')}</Label>
                <Select value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                  {bases.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </Select>
              </div>
              <div>
                <Label>{t('service_type', 'Service Type')}</Label>
                <Select>
                  <option>{t('recovery', 'Recovery')}</option>
                  <option>{t('flatbed', 'Flatbed')}</option>
                  <option>{t('jumpstart', 'Jumpstart')}</option>
                </Select>
              </div>
              <div>
                <Label>{t('urgency', 'Urgency')}</Label>
                <div className="flex bg-surface-container-low rounded-xl p-1 h-14">
                  <button 
                    type="button" 
                    onClick={() => setUrgency('normal')}
                    className={cn(
                      "flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all",
                      urgency === 'normal' ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container/50"
                    )}
                  >
                    Normal
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setUrgency('high')}
                    className={cn(
                      "flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all",
                      urgency === 'high' ? "bg-error text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container/50"
                    )}
                  >
                    High
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Incident Details */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-tertiary w-5 h-5 fill-tertiary/20" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{t('incident_details', 'Incident Details')}</h4>
            </div>
            <div className="space-y-6">
              <div>
                <Label>{t('incident_type', 'Incident Type')}</Label>
                <Select>
                  <option>{t('mechanical_failure', 'Mechanical Failure')}</option>
                  <option>{t('collision', 'Collision')}</option>
                  <option>{t('illegal_parking', 'Illegal Parking')}</option>
                </Select>
              </div>
              <div>
                <Label>{t('description', 'Description')}</Label>
                <textarea 
                  className="w-full bg-surface-container-low border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-4 px-4 font-body text-sm transition-all h-32 resize-none outline-none" 
                  placeholder={t('describe_the_scene_and_vehicle_condition', 'Describe the scene and vehicle condition...')}
                />
              </div>
            </div>
          </section>

          {/* Client & Trip Data */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <UserPlus className="text-on-surface-variant w-5 h-5 fill-stone-600/20" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{t('client___trip_data', 'Client & Trip Data')}</h4>
              </div>
              <div className="flex bg-surface-container-low rounded-lg p-1">
                <button 
                  type="button" 
                  onClick={() => setClientType('existing')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold rounded-md transition-all",
                    clientType === 'existing' ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container/50"
                  )}
                >
                  Existing Client
                </button>
                <button 
                  type="button" 
                  onClick={() => setClientType('new')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold rounded-md transition-all",
                    clientType === 'new' ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container/50"
                  )}
                >
                  New Client
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {clientType === 'existing' ? (
                <>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <Label className="mb-0">{t('find_client', 'Find Client')}</Label>
                      <button 
                        type="button" 
                        onClick={() => setShowClientList(!showClientList)}
                        className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        {showClientList ? "Hide List" : "Select from List"}
                      </button>
                    </div>
                    <div className="relative">
                      <Input 
                        className="pl-12" 
                        placeholder={t('search_by_name__phone__or_membership_id', 'Search by name, phone, or membership ID...')} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                    </div>
                    
                    {showClientList && (
                      <div className="bg-surface border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                        {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(client => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => {
                              setSelectedClient(client);
                              setShowClientList(false);
                              setSearchQuery('');
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors border-b border-outline-variant/30 last:border-0"
                          >
                            <p className="text-sm font-bold">{client.name}</p>
                            <p className="text-[10px] text-on-surface-variant">{client.membership} • {client.phone}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Client Preview */}
                  {selectedClient ? (
                    <div className="p-5 bg-surface-container-high rounded-xl border border-primary/20 flex items-center gap-4 group animate-in fade-in slide-in-from-top-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-on-surface">{selectedClient.name}</p>
                        <p className="text-xs text-on-surface-variant font-semibold">{selectedClient.membership} Member • {selectedClient.phone}</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setSelectedClient(null)}
                        className="text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="p-5 bg-surface-container-low border border-dashed border-outline-variant/50 rounded-xl flex items-center justify-center gap-3 text-outline">
                      <Search className="w-5 h-5" />
                      <span className="text-sm font-medium">{t('no_client_selected', 'No client selected')}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('full_name', 'Full Name')}</Label>
                    <Input value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder={t('john_doe', 'John Doe')} />
                  </div>
                  <div>
                    <Label>{t('phone_number', 'Phone Number')}</Label>
                    <Input value={newClientPhone} onChange={(e) => setNewClientPhone(e.target.value)} placeholder="(503) 000-0000" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('membership__optional', 'Membership (Optional)')}</Label>
                    <Select value={newClientMembership} onChange={(e) => setNewClientMembership(e.target.value)}>
                      <option value="Standard">{t('standard', 'Standard')}</option>
                      <option value="Premium">{t('premium', 'Premium')}</option>
                      <option value="Gold">{t('gold', 'Gold')}</option>
                    </Select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>{t('origin_address', 'Origin Address')}</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_rgba(74,124,89,0.1)]" />
                    <Input value={originAddress} onChange={(e) => setOriginAddress(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>{t('destination_address', 'Destination Address')}</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary flex-shrink-0 shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_rgba(112,92,48,0.1)]" />
                    <Input value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>{t('distance', 'Distance')}</Label>
                  <Input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="0 km" />
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Details */}
          <section className="pb-32">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Car className="text-on-surface-variant w-5 h-5 fill-stone-600/20" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{t('vehicle_details', 'Vehicle Details')}</h4>
              </div>
              <div className="flex bg-surface-container-low rounded-lg p-1">
                <button 
                  type="button" 
                  onClick={() => setVehicleType('client')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold rounded-md transition-all",
                    vehicleType === 'client' ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container/50"
                  )}
                >
                  Client Vehicles
                </button>
                <button 
                  type="button" 
                  onClick={() => setVehicleType('manual')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold rounded-md transition-all",
                    vehicleType === 'manual' ? "bg-surface shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container/50"
                  )}
                >
                  Manual Entry
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {vehicleType === 'client' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => setSelectedVehicle('v1')}
                    className={cn(
                      "p-4 rounded-xl text-left shadow-sm transition-all border-2",
                      selectedVehicle === 'v1' ? "bg-surface border-primary" : "bg-surface-container-low border-outline-variant/30 hover:border-primary/50"
                    )}
                  >
                    <p className="font-bold text-sm">{t('2022_ford_f_150', '2022 Ford F-150')}</p>
                    <p className="text-[10px] text-on-surface-variant font-semibold">{t('silver___7a9_x42', 'Silver • 7A9-X42')}</p>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedVehicle('v2')}
                    className={cn(
                      "p-4 rounded-xl text-left shadow-sm transition-all border-2",
                      selectedVehicle === 'v2' ? "bg-surface border-primary" : "bg-surface-container-low border-outline-variant/30 hover:border-primary/50"
                    )}
                  >
                    <p className="font-bold text-sm">{t('2019_tesla_model_3', '2019 Tesla Model 3')}</p>
                    <p className="text-[10px] text-on-surface-variant font-semibold">{t('white___b3k_l99', 'White • B3K-L99')}</p>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('year___make___model', 'Year / Make / Model')}</Label>
                    <Input placeholder={t('2022_ford_f_150', '2022 Ford F-150')} />
                  </div>
                  <div>
                    <Label>{t('color___plate', 'Color / Plate')}</Label>
                    <Input placeholder={t('silver___7a9_x42', 'Silver / 7A9-X42')} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <Label>{t('number_of_occupants', 'Number of Occupants')}</Label>
                  <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-xl h-16">
                    <button 
                      type="button" 
                      onClick={() => setOccupants(Math.max(1, occupants - 1))}
                      className="w-12 h-12 rounded-lg bg-surface shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <Users className="text-outline w-5 h-5" />
                      <span className="font-bold text-on-surface text-base">{occupants} People</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setOccupants(occupants + 1)}
                      className="w-12 h-12 rounded-lg bg-surface shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>

      {/* Sticky CTA Button */}
      <div className="sticky bottom-0 left-0 w-full p-10 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30 flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-2xl h-16 text-lg gap-3"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-surface/30 border-t-white rounded-full animate-spin" />
          ) : success ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
          {success ? t('dispatch_created', 'Dispatch Created!') : t('create_dispatch_trip', 'Create Dispatch Trip')}
        </Button>
      </div>
    </section>
  );
};
