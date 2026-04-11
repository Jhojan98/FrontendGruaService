import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  UserPlus,
  Camera,
  Pencil,
  User,
  Badge,
  Truck,
  Lightbulb,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createDriver } from './driversData';
import type { DriverRecord } from './driversTypes';
import { listFleet } from '../../lib/api';
import type { FleetTruck } from '../../types';

interface AddDriverFormProps {
  onCancel: () => void;
  onCreated: (driver: DriverRecord) => void;
}

const PHONE_PATTERN = /^[+()\-\s0-9]{7,20}$/;
const UNIT_PATTERN = /^Unit-[A-Za-z0-9]{1,20}$/;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const PREFILL_DRIVER_UNIT = 'prefill_driver_unit';

export const AddDriverForm: React.FC<AddDriverFormProps> = ({ onCancel, onCreated }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState(() => sessionStorage.getItem(PREFILL_DRIVER_UNIT) ?? 'Unit-000');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fleetUnits, setFleetUnits] = useState<FleetTruck[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    listFleet()
      .then((trucks) => setFleetUnits(trucks))
      .catch(() => setFleetUnits([]));
  }, []);

  useEffect(() => {
    const prefilledUnit = sessionStorage.getItem(PREFILL_DRIVER_UNIT);
    if (prefilledUnit) {
      setUnit(prefilledUnit);
      sessionStorage.removeItem(PREFILL_DRIVER_UNIT);
    }
  }, []);

  const availableUnits = fleetUnits.filter((truck) => !truck.assignedDriverId).sort((a, b) => a.unitNumber.localeCompare(b.unitNumber));

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleCreate = async () => {
    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();
    const normalizedUnit = unit.trim();

    if (normalizedName.length < 2 || normalizedName.length > 255) {
      setError('Driver name must be between 2 and 255 characters.');
      return;
    }
    if (!PHONE_PATTERN.test(normalizedPhone)) {
      setError('Phone must be 7-20 chars and only contain numbers, spaces, +, -, ().');
      return;
    }
    if (!UNIT_PATTERN.test(normalizedUnit) || normalizedUnit === 'Unit-000') {
      setError('Select a valid assigned unit in the format Unit-XXX.');
      return;
    }
    if (imageFile) {
      if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
        setError('Profile image must be JPG, PNG, or WEBP.');
        return;
      }
      if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
        setError('Profile image must be 5MB or smaller.');
        return;
      }
    }

    setSaving(true);
    setError(null);
    try {
      const created = await createDriver(
        {
          name: normalizedName,
          role: 'Tow Operator',
          unit: normalizedUnit,
          status: 'Available',
          shift: 'Morning',
          phone: normalizedPhone,
          score: 4.5,
          trips: 0,
        },
        imageFile,
      );
      onCreated(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('drivers.failed_create'));
      setSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-on-background tracking-tight font-headline">{t('drivers.add_form_title')}</h2>
              <p className="text-sm text-on-surface-variant mt-1">{t('drivers.add_form_subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors"
              type="button"
            >
              {t('drivers.cancel')}
            </button>
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              type="button"
              disabled={saving}
            >
              <UserPlus className="w-4 h-4" />
              {saving ? t('drivers.registering') : t('drivers.register_driver')}
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 bg-error/10 border border-error/20 rounded-xl p-4">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
              <form className="space-y-10" onSubmit={(event) => event.preventDefault()}>
                <section>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="h-24 w-24 rounded-2xl bg-surface-container-high border-2 border-dashed border-outline-variant flex items-center justify-center overflow-hidden">
                        {imagePreviewUrl ? (
                          <img src={imagePreviewUrl} alt={t('drivers.driver_profile_photo')} className="h-full w-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-outline" />
                        )}
                      </div>
                      <button
                        className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-lg shadow-md hover:scale-105 transition-transform"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">{t('drivers.photo_title')}</h3>
                      <p className="text-sm text-on-surface-variant mt-1">{t('drivers.photo_hint')}</p>
                      {imageFile && <p className="text-xs text-primary mt-1">{t('drivers.selected_file')} {imageFile.name}</p>}
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-bold text-on-surface">{t('drivers.personal_info')}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={t('drivers.full_name')}>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.full_name_placeholder')}
                        type="text"
                      />
                    </Field>

                    <Field label={t('drivers.date_of_birth')}>
                      <input
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="date"
                      />
                    </Field>

                    <Field label={t('drivers.email_address')}>
                      <input
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.email_placeholder')}
                        type="email"
                      />
                    </Field>

                    <Field label={t('drivers.phone_number')}>
                      <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.phone_placeholder')}
                        type="tel"
                      />
                    </Field>

                    <Field className="md:col-span-2" label={t('drivers.home_address')}>
                      <textarea
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.home_address_placeholder')}
                        rows={2}
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                    <Badge className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-bold text-on-surface">{t('drivers.license_details')}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Field className="lg:col-span-2" label={t('drivers.license_number')}>
                      <input
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.license_placeholder')}
                        type="text"
                      />
                    </Field>

                    <Field label={t('drivers.class')}>
                      <select className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>Class A</option>
                        <option>Class B</option>
                        <option>Class C</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.state_of_issue')}>
                      <input
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={t('drivers.state_placeholder')}
                        type="text"
                      />
                    </Field>

                    <Field className="lg:col-span-2" label={t('drivers.expiration_date')}>
                      <input
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="date"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-bold text-on-surface">{t('drivers.fleet_assignment')}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={t('drivers.initial_vehicle_assignment')}>
                      <select
                        value={unit}
                        onChange={(event) => setUnit(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="Unit-000">{t('drivers.select_unit')}</option>
                        {availableUnits.map((truck) => (
                          <option key={truck.id} value={truck.unitNumber}>
                            {truck.unitNumber} ({truck.type})
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label={t('drivers.employment_type')}>
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input className="text-primary focus:ring-primary h-4 w-4" defaultChecked name="employment" type="radio" />
                          <span className="text-sm text-on-surface group-hover:text-primary transition-colors">{t('drivers.full_time')}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input className="text-primary focus:ring-primary h-4 w-4" name="employment" type="radio" />
                          <span className="text-sm text-on-surface group-hover:text-primary transition-colors">{t('drivers.contractor')}</span>
                        </label>
                      </div>
                    </Field>
                  </div>
                </section>

              </form>
            </div>
          </div>

          <aside className="lg:w-80 space-y-6">
            <div className="bg-tertiary-fixed/30 rounded-xl p-6 border border-tertiary-container/20">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-tertiary" />
                <h4 className="font-bold text-on-tertiary-container">{t('drivers.helpful_tips')}</h4>
              </div>
              <ul className="space-y-4 text-sm text-on-tertiary-fixed-variant leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    {t('drivers.tip_1')}
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    {t('drivers.tip_2')}
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    {t('drivers.tip_3')}
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-high rounded-xl p-6 overflow-hidden relative group border border-outline-variant/20">
              <div className="relative z-10">
                <h4 className="font-bold text-on-surface mb-2">{t('drivers.need_bulk_import')}</h4>
                <p className="text-xs text-on-surface-variant mb-4">{t('drivers.bulk_import_desc')}</p>
                <button className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {t('drivers.download_template')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <Upload className="absolute -bottom-4 -right-4 w-20 h-20 text-outline-variant/20 group-hover:scale-110 transition-transform" />
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-3">{t('drivers.compliance_check')}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>{t('drivers.background_check')}</span>
                  <span className="text-tertiary font-bold">{t('drivers.pending')}</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-tertiary h-1.5 rounded-full w-[45%]" />
                </div>
                <p className="text-[10px] text-on-surface-variant">{t('drivers.background_verification_hint')}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={className}>
    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1 block mb-1.5">{label}</label>
    {children}
  </div>
);
