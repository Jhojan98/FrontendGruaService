import React from 'react';
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

interface EditDriverProfileProps {
  onCancel: () => void;
  onSave: () => void;
}

export const EditDriverProfile: React.FC<EditDriverProfileProps> = ({ onCancel, onSave }) => {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-on-background tracking-tight font-headline">Edit Driver Profile - Marcus Reed</h2>
              <p className="text-sm text-on-surface-variant mt-1">Update profile, compliance details, and fleet assignment.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              type="button"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 pb-20">
          <div className="flex-1 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
              <form className="space-y-10" onSubmit={(event) => event.preventDefault()}>
                <section>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300&h=300"
                        alt="Marcus Reed"
                        className="h-24 w-24 rounded-2xl border border-outline-variant object-cover"
                      />
                      <button
                        className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-lg shadow-md hover:scale-105 transition-transform"
                        type="button"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">Driver Profile Photo</h3>
                      <p className="text-sm text-on-surface-variant mt-1">Upload a clear front-facing portrait. Max size 5MB.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-bold text-on-surface">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Full Name">
                      <input
                        defaultValue="Marcus Reed"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="text"
                      />
                    </Field>

                    <Field label="Date of Birth">
                      <input
                        defaultValue="1989-04-17"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="date"
                      />
                    </Field>

                    <Field label="Email Address">
                      <input
                        defaultValue="m.reed@terratowing.com"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="email"
                      />
                    </Field>

                    <Field label="Phone Number">
                      <input
                        defaultValue="+1 (555) 334-8877"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="tel"
                      />
                    </Field>

                    <Field className="md:col-span-2" label="Home Address">
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
                    <h3 className="text-lg font-bold text-on-surface">License Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Field className="lg:col-span-2" label="License Number">
                      <input
                        defaultValue="DL-77881234"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="text"
                      />
                    </Field>

                    <Field label="Class">
                      <select
                        defaultValue="Class A"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option>Class A</option>
                        <option>Class B</option>
                        <option>Class C</option>
                      </select>
                    </Field>

                    <Field label="State of Issue">
                      <input
                        defaultValue="OR"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        type="text"
                      />
                    </Field>

                    <Field className="lg:col-span-2" label="Expiration Date">
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
                    <h3 className="text-lg font-bold text-on-surface">Fleet Assignment</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Initial Vehicle Assignment">
                      <select
                        defaultValue="Unit #TRK-102 (Flatbed)"
                        className="w-full bg-background border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option>Select Unit...</option>
                        <option>Unit #TRK-102 (Flatbed)</option>
                        <option>Unit #TRK-405 (Tow Truck)</option>
                        <option>Unit #VAN-08 (Support)</option>
                      </select>
                    </Field>

                    <Field label="Employment Type">
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input className="text-primary focus:ring-primary h-4 w-4" defaultChecked name="employment" type="radio" />
                          <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Full-time</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input className="text-primary focus:ring-primary h-4 w-4" name="employment" type="radio" />
                          <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Contractor</span>
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
                <h4 className="font-bold text-on-tertiary-container">Helpful Tips</h4>
              </div>
              <ul className="space-y-4 text-sm text-on-tertiary-fixed-variant leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    Verify the <strong>License Class</strong> continues to match assigned unit requirements after role changes.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    Keep the <strong>Expiration Date</strong> current to avoid assignment blocking on active dispatch queues.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="text-tertiary font-bold">•</span>
                  <p>
                    If employment status changes, remember to review insurance and compliance documentation.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-high rounded-xl p-6 overflow-hidden relative group border border-outline-variant/20">
              <div className="relative z-10">
                <h4 className="font-bold text-on-surface mb-2">Need bulk update?</h4>
                <p className="text-xs text-on-surface-variant mb-4">Update multiple driver assignments using template import.</p>
                <button className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Download Template
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <Upload className="absolute -bottom-4 -right-4 w-20 h-20 text-outline-variant/20 group-hover:scale-110 transition-transform" />
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-3">Compliance Check</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>Background Check</span>
                  <span className="text-primary font-bold">Verified</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-[92%]" />
                </div>
                <p className="text-[10px] text-on-surface-variant">Profile is compliant and ready for dispatch scheduling.</p>
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
