import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Save,
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
import { updateDriver } from './driversData';
import type { DriverRecord } from './driversTypes';

interface EditDriverProfileProps {
  driver: DriverRecord;
  onCancel: () => void;
  onSave: (driver: DriverRecord) => void;
}

export const EditDriverProfile: React.FC<EditDriverProfileProps> = ({ driver, onCancel, onSave }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(driver.name);
  const [role, setRole] = useState(driver.role);
  const [unit, setUnit] = useState(driver.unit);
  const [statusValue, setStatusValue] = useState<DriverRecord['status']>(driver.status);
  const [shift, setShift] = useState<DriverRecord['shift']>(driver.shift);
  const [phone, setPhone] = useState(driver.phone);
  const [score, setScore] = useState(driver.score);
  const [trips, setTrips] = useState(driver.trips);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateDriver(
        driver.id,
        {
          name,
          role,
          unit,
          status: statusValue,
          shift,
          phone,
          score: Number(score),
          trips: Number(trips),
        },
        imageFile,
      );
      onSave(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('drivers.failed_update'));
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
              <h2 className="text-3xl font-bold text-on-background tracking-tight font-headline">{t('drivers.edit_form_title')} - {driver.name}</h2>
              <p className="text-sm text-on-surface-variant mt-1">{t('drivers.edit_form_subtitle')}</p>
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
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              type="button"
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              {saving ? t('drivers.saving') : t('drivers.save_profile')}
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 bg-error/10 border border-error/20 rounded-xl p-4">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 pb-20">
          <div className="flex-1 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
              <form className="space-y-10" onSubmit={(event) => event.preventDefault()}>
                <section>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <img
                        src={imagePreviewUrl || driver.image}
                        alt={driver.name}
                        className="h-24 w-24 rounded-2xl border border-outline-variant object-cover"
                      />
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
                        type="text"
                      />
                    </Field>

                    <Field label={t('drivers.date_of_birth')}>
                      <input
                        defaultValue="1989-04-17"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="date"
                      />
                    </Field>

                    <Field label={t('drivers.email_address')}>
                      <input
                        defaultValue="m.reed@terratowing.com"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="email"
                      />
                    </Field>

                    <Field label={t('drivers.phone_number')}>
                      <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="tel"
                      />
                    </Field>

                    <Field className="md:col-span-2" label={t('drivers.home_address')}>
                      <textarea
                        defaultValue="2148 Pine Valley Rd, Portland, OR 97205"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                        defaultValue="DL-77881234"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="text"
                      />
                    </Field>

                    <Field label={t('drivers.class')}>
                      <select
                        defaultValue="Class A"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option>Class A</option>
                        <option>Class B</option>
                        <option>Class C</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.state_of_issue')}>
                      <input
                        defaultValue="OR"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="text"
                      />
                    </Field>

                    <Field className="lg:col-span-2" label={t('drivers.expiration_date')}>
                      <input
                        defaultValue="2027-10-30"
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
                        <option value={unit}>{unit}</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.employment_type')}>
                      <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="Tow Operator">Tow Operator</option>
                        <option value="Senior Recovery Operator">Senior Recovery Operator</option>
                        <option value="Heavy Duty Operator">Heavy Duty Operator</option>
                        <option value="Light Duty Specialist">Light Duty Specialist</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.status')}>
                      <select
                        value={statusValue}
                        onChange={(event) => setStatusValue(event.target.value as DriverRecord['status'])}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="Available">Available</option>
                        <option value="On Trip">On Trip</option>
                        <option value="Off Duty">Off Duty</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.shift')}>
                      <select
                        value={shift}
                        onChange={(event) => setShift(event.target.value as DriverRecord['shift'])}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                        <option value="Rotating">Rotating</option>
                      </select>
                    </Field>

                    <Field label={t('drivers.safety_score')}>
                      <input
                        value={score}
                        onChange={(event) => setScore(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </Field>

                    <Field label={t('drivers.trips')}>
                      <input
                        value={trips}
                        onChange={(event) => setTrips(event.target.value)}
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="number"
                        min="0"
                        step="1"
                      />
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
                <h4 className="font-bold text-on-surface mb-2">{t('drivers.need_bulk_update')}</h4>
                <p className="text-xs text-on-surface-variant mb-4">{t('drivers.bulk_update_desc')}</p>
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
                  <span className="text-primary font-bold">{t('drivers.verified')}</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-[92%]" />
                </div>
                <p className="text-[10px] text-on-surface-variant">{t('drivers.compliance_ready_hint')}</p>
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
