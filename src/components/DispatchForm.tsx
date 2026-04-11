import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, AlertTriangle, UserPlus, Users, Car, Search, X, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Label } from './ui/Inputs';
import { cn } from '../lib/utils';
import { Base, Client, ClientVehicle } from '../types';
import { motion } from 'motion/react';
import {
  createTrip,
  createClient,
  DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY,
  listClients,
  listClientVehicles,
} from '../lib/api';

type NewClientFieldErrors = {
  name?: string;
  phone?: string;
  contactPerson?: string;
  email?: string;
};

type ManualVehicleFieldErrors = {
  year?: string;
  make?: string;
  model?: string;
  color?: string;
  plate?: string;
};

const PHONE_PATTERN = /^[+()\-\s0-9]{7,20}$/;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PLATE_PATTERN = /^[A-Za-z0-9\-\s]{4,12}$/;

export const DispatchForm = () => {
  const { t } = useTranslation();
  const [bases, setBases] = useState<Base[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClientList, setShowClientList] = useState(true);
  const [clientVehicles, setClientVehicles] = useState<ClientVehicle[]>([]);
  const [loadingClientVehicles, setLoadingClientVehicles] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [clientType, setClientType] = useState<'existing' | 'new'>('existing');
  const [vehicleType, setVehicleType] = useState<'client' | 'manual'>('manual');
  const [urgency, setUrgency] = useState<'normal' | 'high'>('normal');
  const [occupants, setOccupants] = useState(2);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientContactPerson, setNewClientContactPerson] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientStatus, setNewClientStatus] = useState<'active' | 'inactive' | 'suspended'>('active');
  const [newClientType, setNewClientType] = useState<'corporate' | 'individual'>('individual');
  const [creatingClient, setCreatingClient] = useState(false);
  const [newClientError, setNewClientError] = useState<string | null>(null);
  const [newClientFieldErrors, setNewClientFieldErrors] = useState<NewClientFieldErrors>({});
  const [manualVehicle, setManualVehicle] = useState({
    year: '',
    make: '',
    model: '',
    color: '',
    plate: '',
  });
  const [manualVehicleFieldErrors, setManualVehicleFieldErrors] = useState<ManualVehicleFieldErrors>({});
  const [dispatchValidationError, setDispatchValidationError] = useState<string | null>(null);
  const [originAddress, setOriginAddress] = useState('Main St. & 4th Ave, Portland, OR');
  const [destinationAddress, setDestinationAddress] = useState('St. Jude Medical Center, OR');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/bases').then(res => res.json()).then(setBases);

    listClients()
      .then((loadedClients) => {
        setClients(loadedClients);

        const reviewedClientId = sessionStorage.getItem(DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY);
        if (!reviewedClientId) {
          return;
        }

        const reviewedClient = loadedClients.find((client) => client.id === reviewedClientId);
        if (!reviewedClient) {
          return;
        }

        setSelectedClient(reviewedClient);
        setClientType('existing');
        setVehicleType('client');
        sessionStorage.removeItem(DISPATCH_PREFILL_CLIENT_ID_STORAGE_KEY);
      })
      .catch(() => setClients([]));
  }, []);

  useEffect(() => {
    if (!selectedClient) {
      setClientVehicles([]);
      setSelectedVehicle(null);
      return;
    }

    setLoadingClientVehicles(true);
    listClientVehicles(selectedClient.id)
      .then((vehicles) => {
        setClientVehicles(vehicles);
        setSelectedVehicle((current) => (current && vehicles.some((v) => v.id === current) ? current : null));
      })
      .catch(() => {
        setClientVehicles([]);
        setSelectedVehicle(null);
      })
      .finally(() => setLoadingClientVehicles(false));
  }, [selectedClient]);

  const handleCreateAndSelectClient = async () => {
    const normalizedName = newClientName.trim();
    const normalizedPhone = newClientPhone.trim();
    const normalizedContact = newClientContactPerson.trim();
    const normalizedEmail = newClientEmail.trim().toLowerCase();

    const nextErrors: NewClientFieldErrors = {};
    if (!normalizedName) {
      nextErrors.name = 'Name is required.';
    }
    if (!normalizedPhone) {
      nextErrors.phone = 'Phone is required.';
    } else if (!PHONE_PATTERN.test(normalizedPhone)) {
      nextErrors.phone = 'Phone must be 7-20 chars and only numbers, spaces, +, -, ().';
    }
    if (!normalizedContact) {
      nextErrors.contactPerson = 'Contact person is required.';
    }
    if (!normalizedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
      nextErrors.email = 'Invalid email format.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setNewClientFieldErrors(nextErrors);
      setNewClientError('Complete name, phone, contact person and email to continue.');
      return;
    }

    setCreatingClient(true);
    setNewClientError(null);
    setNewClientFieldErrors({});
    try {
      const created = await createClient({
        name: normalizedName,
        phone: normalizedPhone,
        status: newClientStatus,
        contact_person: normalizedContact,
        email: normalizedEmail,
        client_type: newClientType,
      });

      setClients((prev) => [created, ...prev.filter((client) => client.id !== created.id)]);
      setSelectedClient(created);
      setClientType('existing');
      setShowClientList(true);
      setVehicleType('client');
      setSearchQuery('');
      setNewClientName('');
      setNewClientPhone('');
      setNewClientContactPerson('');
      setNewClientEmail('');
      setNewClientStatus('active');
      setNewClientType('individual');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create client';
      setNewClientError(message);
    } finally {
      setCreatingClient(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return (
      client.name.toLowerCase().includes(query) ||
      client.phone.toLowerCase().includes(query) ||
      client.status.toLowerCase().includes(query)
    );
  });

  const validateManualVehicle = (): boolean => {
    const year = manualVehicle.year.trim();
    const make = manualVehicle.make.trim();
    const model = manualVehicle.model.trim();
    const color = manualVehicle.color.trim();
    const plate = manualVehicle.plate.trim();

    const nextErrors: ManualVehicleFieldErrors = {};
    const currentYear = new Date().getFullYear() + 1;
    if (!year) {
      nextErrors.year = 'Year is required.';
    } else if (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > currentYear) {
      nextErrors.year = `Use a valid year between 1900 and ${currentYear}.`;
    }
    if (!make) {
      nextErrors.make = 'Make is required.';
    }
    if (!model) {
      nextErrors.model = 'Model is required.';
    }
    if (!color) {
      nextErrors.color = 'Color is required.';
    }
    if (!plate) {
      nextErrors.plate = 'Plate is required.';
    } else if (!PLATE_PATTERN.test(plate)) {
      nextErrors.plate = 'Plate must be 4-12 chars using letters, numbers, spaces or -.';
    }

    setManualVehicleFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (clientType === 'existing' && !selectedClient) {
      setDispatchValidationError('Select an existing client before creating dispatch.');
      return;
    }

    if (vehicleType === 'client') {
      if (selectedClient && clientVehicles.length > 0 && !selectedVehicle) {
        setDispatchValidationError('Select one client vehicle or switch to manual entry.');
        return;
      }
      if (selectedClient && clientVehicles.length === 0) {
        setDispatchValidationError('Selected client has no vehicles. Use manual entry.');
        return;
      }
      setManualVehicleFieldErrors({});
    }

    if (vehicleType === 'manual' && !validateManualVehicle()) {
      setDispatchValidationError('Review manual vehicle details before continuing.');
      return;
    }

    const normalizedOrigin = originAddress.trim();
    const normalizedDestination = destinationAddress.trim();
    if (!normalizedOrigin || !normalizedDestination) {
      setDispatchValidationError('Origin and destination are required.');
      return;
    }

    setDispatchValidationError(null);
    setLoading(true);
    try {
      const tripDistance = vehicleType === 'manual' ? '0 km' : '0 km';
      const clientId = selectedClient?.id;
      if (!clientId) {
        throw new Error('Client is required.');
      }

      await createTrip({
        clientId,
        clientName: selectedClient?.name,
        originAddress: normalizedOrigin,
        destinationAddress: normalizedDestination,
        distance: tripDistance,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setDispatchValidationError(error instanceof Error ? error.message : 'Failed to create dispatch.');
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
          {/* Service Information */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Info className="text-primary w-5 h-5 fill-primary/20" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{t('service_information', 'Service Information')}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>{t('base_selection', 'Base Selection')}</Label>
                <Select defaultValue="base-1">
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
                    onClick={() => {
                      setClientType('new');
                      setVehicleType('manual');
                      setDispatchValidationError(null);
                    }}
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
                        placeholder={t('search_by_name__phone__or_status', 'Search by name, phone, or status...')} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                    </div>
                    
                    {showClientList && (
                      <div className="bg-surface border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                        {filteredClients.map(client => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => {
                              setSelectedClient(client);
                              setVehicleType('client');
                              setShowClientList(false);
                              setSearchQuery('');
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors border-b border-outline-variant/30 last:border-0"
                          >
                            <p className="text-sm font-bold">{client.name}</p>
                            <p className="text-[10px] text-on-surface-variant">{client.status} • {client.phone}</p>
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
                        <p className="text-xs text-on-surface-variant font-semibold">{selectedClient.status} • {selectedClient.phone}</p>
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
                    <Input placeholder={t('john_doe', 'John Doe')} value={newClientName} onChange={(e) => {
                      setNewClientName(e.target.value);
                      setNewClientFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }} />
                    {newClientFieldErrors.name ? <p className="mt-1 text-xs text-error">{newClientFieldErrors.name}</p> : null}
                  </div>
                  <div>
                    <Label>{t('phone_number', 'Phone Number')}</Label>
                    <Input placeholder="(503) 000-0000" value={newClientPhone} onChange={(e) => {
                      setNewClientPhone(e.target.value);
                      setNewClientFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }} />
                    {newClientFieldErrors.phone ? <p className="mt-1 text-xs text-error">{newClientFieldErrors.phone}</p> : null}
                  </div>
                  <div>
                    <Label>{t('contact_person', 'Contact Person')}</Label>
                    <Input placeholder={t('john_doe', 'John Doe')} value={newClientContactPerson} onChange={(e) => {
                      setNewClientContactPerson(e.target.value);
                      setNewClientFieldErrors((prev) => ({ ...prev, contactPerson: undefined }));
                    }} />
                    {newClientFieldErrors.contactPerson ? <p className="mt-1 text-xs text-error">{newClientFieldErrors.contactPerson}</p> : null}
                  </div>
                  <div>
                    <Label>{t('email_address', 'Email Address')}</Label>
                    <Input placeholder="cliente@empresa.com" value={newClientEmail} onChange={(e) => {
                      setNewClientEmail(e.target.value);
                      setNewClientFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }} />
                    {newClientFieldErrors.email ? <p className="mt-1 text-xs text-error">{newClientFieldErrors.email}</p> : null}
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('status', 'Status')}</Label>
                    <Select value={newClientStatus} onChange={(e) => setNewClientStatus(e.target.value as 'active' | 'inactive' | 'suspended')}>
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                      <option value="suspended">suspended</option>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('client_type', 'Client Type')}</Label>
                    <Select value={newClientType} onChange={(e) => setNewClientType(e.target.value as 'corporate' | 'individual')}>
                      <option value="corporate">corporate</option>
                      <option value="individual">individual</option>
                    </Select>
                  </div>
                  {newClientError ? <p className="md:col-span-2 text-xs text-error">{newClientError}</p> : null}
                  <div className="md:col-span-2">
                    <Button type="button" onClick={() => { void handleCreateAndSelectClient(); }} disabled={creatingClient} className="h-12 w-full md:w-auto">
                      {creatingClient ? 'Saving client...' : 'Save Client and Use in Dispatch'}
                    </Button>
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
                <div className="space-y-4">
                  {!selectedClient ? (
                    <div className="p-4 rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low text-sm text-on-surface-variant">
                      Select an existing client to load associated vehicles.
                    </div>
                  ) : loadingClientVehicles ? (
                    <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm text-on-surface-variant">
                      Loading client vehicles...
                    </div>
                  ) : clientVehicles.length === 0 ? (
                    <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm text-on-surface-variant">
                      This client has no vehicles yet. You can switch to Manual Entry.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {clientVehicles.map((vehicle) => {
                        const vehicleLabel = `${vehicle.make} ${vehicle.model}`.trim();
                        return (
                          <button
                            key={vehicle.id}
                            type="button"
                            onClick={() => setSelectedVehicle(vehicle.id)}
                            className={cn(
                              "p-4 rounded-xl text-left shadow-sm transition-all border-2",
                              selectedVehicle === vehicle.id ? "bg-surface border-primary" : "bg-surface-container-low border-outline-variant/30 hover:border-primary/50"
                            )}
                          >
                            <p className="font-bold text-sm">{vehicleLabel}</p>
                            <p className="text-[10px] text-on-surface-variant font-semibold">
                              {vehicle.is_active ? 'Active' : 'Inactive'} • {vehicle.license_plate}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('vehicle_year', 'Vehicle Year')}</Label>
                    <Input
                      placeholder="2022"
                      value={manualVehicle.year}
                      onChange={(e) => {
                        setManualVehicle((prev) => ({ ...prev, year: e.target.value }));
                        setManualVehicleFieldErrors((prev) => ({ ...prev, year: undefined }));
                      }}
                    />
                    {manualVehicleFieldErrors.year ? <p className="mt-1 text-xs text-error">{manualVehicleFieldErrors.year}</p> : null}
                  </div>
                  <div>
                    <Label>{t('vehicle_make', 'Make')}</Label>
                    <Input
                      placeholder="Ford"
                      value={manualVehicle.make}
                      onChange={(e) => {
                        setManualVehicle((prev) => ({ ...prev, make: e.target.value }));
                        setManualVehicleFieldErrors((prev) => ({ ...prev, make: undefined }));
                      }}
                    />
                    {manualVehicleFieldErrors.make ? <p className="mt-1 text-xs text-error">{manualVehicleFieldErrors.make}</p> : null}
                  </div>
                  <div>
                    <Label>{t('vehicle_model', 'Model')}</Label>
                    <Input
                      placeholder="F-150"
                      value={manualVehicle.model}
                      onChange={(e) => {
                        setManualVehicle((prev) => ({ ...prev, model: e.target.value }));
                        setManualVehicleFieldErrors((prev) => ({ ...prev, model: undefined }));
                      }}
                    />
                    {manualVehicleFieldErrors.model ? <p className="mt-1 text-xs text-error">{manualVehicleFieldErrors.model}</p> : null}
                  </div>
                  <div>
                    <Label>{t('vehicle_color', 'Color')}</Label>
                    <Input
                      placeholder="Silver"
                      value={manualVehicle.color}
                      onChange={(e) => {
                        setManualVehicle((prev) => ({ ...prev, color: e.target.value }));
                        setManualVehicleFieldErrors((prev) => ({ ...prev, color: undefined }));
                      }}
                    />
                    {manualVehicleFieldErrors.color ? <p className="mt-1 text-xs text-error">{manualVehicleFieldErrors.color}</p> : null}
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('license_plate', 'License Plate')}</Label>
                    <Input
                      placeholder="7A9-X42"
                      value={manualVehicle.plate}
                      onChange={(e) => {
                        setManualVehicle((prev) => ({ ...prev, plate: e.target.value.toUpperCase() }));
                        setManualVehicleFieldErrors((prev) => ({ ...prev, plate: undefined }));
                      }}
                    />
                    {manualVehicleFieldErrors.plate ? <p className="mt-1 text-xs text-error">{manualVehicleFieldErrors.plate}</p> : null}
                  </div>
                </div>
              )}

              {dispatchValidationError ? <p className="text-xs text-error">{dispatchValidationError}</p> : null}

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
