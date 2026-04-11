import React, { useRef, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Pencil, Save, UserPlus } from 'lucide-react';
import { createFleetTruck, updateFleetTruck } from '../../lib/api';
import { FleetManagementProps } from './types';

type FleetTruckFormProps = FleetManagementProps & {
  isEditing: boolean;
};

const UNIT_PATTERN = /^Unit-[A-Za-z0-9]{1,20}$/;
const TEXT_PATTERN = /^[A-Za-z0-9\s\-]{1,64}$/;

export const FleetTruckForm: React.FC<FleetTruckFormProps> = ({
  isEditing,
  onViewChange,
  selectedTruckId,
  fleet = [],
  refreshFleet,
}) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const selectedTruck = fleet.find((truck) => truck.id === selectedTruckId) ?? null;
  const typeParts = (selectedTruck?.type ?? '').split(' ');
  const defaultMake = typeParts[0] ?? '';
  const defaultModel = typeParts.slice(1).join(' ');

  const handleSave = async () => {
    if (!formRef.current) {
      return;
    }
    const unitInput = formRef.current.querySelector<HTMLInputElement>('input[name="unitNumber"]');
    const makeInput = formRef.current.querySelector<HTMLInputElement>('input[name="make"]');
    const modelInput = formRef.current.querySelector<HTMLInputElement>('input[name="model"]');
    const idInput = formRef.current.querySelector<HTMLInputElement>('input[name="truckId"]');

    const unitNumber = unitInput?.value.trim() ?? '';
    const make = makeInput?.value.trim() ?? '';
    const model = modelInput?.value.trim() ?? '';
    const type = `${make} ${model}`.trim();
    const truckId = idInput?.value.trim() ?? '';

    if (!unitNumber || !type) {
      setSaveError('Unit Number, Make, and Model are required.');
      return;
    }
    if (!UNIT_PATTERN.test(unitNumber)) {
      setSaveError('Unit Number must follow format Unit-XXX (letters/numbers).');
      return;
    }
    if (!TEXT_PATTERN.test(make) || !TEXT_PATTERN.test(model)) {
      setSaveError('Make and Model only allow letters, numbers, spaces, and hyphens (max 64).');
      return;
    }

    if (isEditing && !truckId) {
      setSaveError('No truck selected for update.');
      return;
    }

    setSaveError(null);
    setIsSaving(true);
    try {
      if (isEditing && truckId) {
        await updateFleetTruck(truckId, { unitNumber, type }, imageFile);
      } else {
        await createFleetTruck({ unitNumber, type, lat: 0, lng: 0 }, imageFile);
      }
      await refreshFleet?.();
      onViewChange?.('fleet');
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save truck.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div ref={formRef} className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => onViewChange?.('fleet')} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <div>
              <h2 className="text-4xl font-headline italic text-on-surface mb-1">
                {isEditing ? 'Edit Vehicle Profile' : 'Register New Vehicle'}
              </h2>
              <p className="text-on-surface-variant">Onboard a new unit to the Terra Towing fleet ecosystem.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onViewChange?.('fleet')}
              className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => void handleSave()}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              disabled={isSaving}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {isSaving ? 'Saving...' : 'Save Truck'}
            </button>
          </div>
        </header>

        {isEditing ? <input type="hidden" name="truckId" value={selectedTruckId ?? ''} readOnly /> : null}
        {saveError ? <p className="text-sm text-error mb-4">{saveError}</p> : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-surface-container-low rounded-xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20">
              <h3 className="text-xl font-headline text-on-surface mb-6">Vehicle Identity</h3>
              <div className="mb-6">
                <label className="text-sm font-bold text-on-surface-variant block mb-3">Vehicle Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-xl overflow-hidden border border-outline-variant bg-background">
                      <img
                        src={imagePreviewUrl ?? selectedTruck?.imageUrl ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfLj7yPaWlI7y5cQjVu0HABdZCj04KYk1qwdVXgTtCeTWmmgo_A2RsbaGrXro_yLF5Jeo9P7R23S_DrXkFCsItw8DeRCj6fchebQjOtJoKctTgPjBiXAhpMGN8V6IW5I4DNuW6psOCaqU9QzmRppK1pBcXdwG2AO7jqPqBk33NKeoO9bhg7m7ufiWyQlJJpLsEYV0-eItfVkoG8T6RkpGm8xfmHqkJGWJ1B54cXgk4slqLd1vBWPxihR2nfnPweYtteVavIF1uvOA'}
                        alt="Vehicle preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-lg shadow-md hover:opacity-90 transition-opacity"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const selected = event.target.files?.[0] ?? null;
                        setImageFile(selected);
                        if (!selected) {
                          setImagePreviewUrl(null);
                          return;
                        }
                        const objectUrl = URL.createObjectURL(selected);
                        setImagePreviewUrl(objectUrl);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg border border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 transition-colors flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Change Image
                    </button>
                    <p className="text-xs text-on-surface-variant mt-2">Use a clear side-view photo. JPG or PNG, max 5MB.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VehicleField name="unitNumber" label="Unit Number" defaultValue={isEditing ? (selectedTruck?.unitNumber ?? 'Unit-701') : ''} placeholder="e.g. T-104" />
                <VehicleField label="License Plate" defaultValue={isEditing ? 'TRRA-701' : ''} placeholder="ABC-1234" />
                <VehicleField name="make" label="Make" defaultValue={isEditing ? defaultMake : ''} placeholder="Ford, Kenworth, etc." />
                <VehicleField name="model" label="Model" defaultValue={isEditing ? defaultModel : ''} placeholder="F-550, T680" />
                <div>
                  <label className="text-sm font-bold text-on-surface-variant block mb-2">Year</label>
                  <select defaultValue={isEditing ? '2023' : '2024'} className="w-full bg-background border-outline-variant rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>
                <VehicleField label="Color" defaultValue={isEditing ? 'Forest Green' : ''} placeholder="Forest Green" />
              </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20">
              <h3 className="text-xl font-headline text-on-surface mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <VehicleField
                    label="VIN (Vehicle Identification Number)"
                    defaultValue={isEditing ? '1XPKD4X9PD123456' : ''}
                    placeholder="17-character alphanumeric string"
                  />
                </div>
                <VehicleField label="Engine Type" defaultValue={isEditing ? '6.7L V8 PowerStroke' : ''} placeholder="6.7L V8 PowerStroke" />
                <div>
                  <label className="text-sm font-bold text-on-surface-variant block mb-2">Fuel Type</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-3 rounded-lg border border-primary bg-primary text-on-primary text-sm font-bold">Diesel</button>
                    <button className="flex-1 py-2 px-3 rounded-lg border border-outline-variant text-sm font-bold">Gas</button>
                    <button className="flex-1 py-2 px-3 rounded-lg border border-outline-variant text-sm font-bold">Electric</button>
                  </div>
                </div>
                <VehicleField label="GVWR (lbs)" defaultValue={isEditing ? '19500' : ''} placeholder="19500" type="number" />
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-tertiary-container/30 rounded-xl p-6 border border-tertiary/10">
              <h3 className="font-headline italic text-on-tertiary-container mb-4">Quick Tips</h3>
              <div className="space-y-4 text-sm text-on-tertiary-container leading-relaxed">
                <p><strong>Why is VIN required?</strong><br />The VIN is critical for regulatory compliance and insurance tracking.</p>
                <p className="pt-3 border-t border-tertiary/10"><strong>Accurate GVWR</strong><br />Use the exact manufacturer value to avoid overloading fines.</p>
                <p className="pt-3 border-t border-tertiary/10"><strong>Equipment Sync</strong><br />Correct equipment data improves dispatch-unit matching.</p>
              </div>
            </div>

            <div className="bg-surface-container-high rounded-xl overflow-hidden shadow-sm">
              <div className="h-32 relative">
                <img
                  alt="Fleet preview"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfLj7yPaWlI7y5cQjVu0HABdZCj04KYk1qwdVXgTtCeTWmmgo_A2RsbaGrXro_yLF5Jeo9P7R23S_DrXkFCsItw8DeRCj6fchebQjOtJoKctTgPjBiXAhpMGN8V6IW5I4DNuW6psOCaqU9QzmRppK1pBcXdwG2AO7jqPqBk33NKeoO9bhg7m7ufiWyQlJJpLsEYV0-eItfVkoG8T6RkpGm8xfmHqkJGWJ1B54cXgk4slqLd1vBWPxihR2nfnPweYtteVavIF1uvOA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Fleet Preview</p>
                  <h4 className="font-serif italic text-lg">Terra Standard Unit</h4>
                </div>
              </div>
              <div className="p-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant">Active Units</span><span className="font-bold text-primary">24</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Avg. Utilization</span><span className="font-bold text-tertiary">82%</span></div>
                <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[82%]" /></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const VehicleField = ({
  name,
  label,
  defaultValue,
  placeholder,
  type = 'text',
}: {
  name?: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="text-sm font-bold text-on-surface-variant block mb-2">{label}</label>
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full bg-background border-outline-variant rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);
