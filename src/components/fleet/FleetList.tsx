import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Filter, Navigation, PlusCircle, ShieldCheck, Truck } from 'lucide-react';
import { FleetManagementProps } from './types';

export const FleetList: React.FC<FleetManagementProps> = ({ onViewChange }) => {
  const { t } = useTranslation();

  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">{t('fleet_overview', 'Fleet Overview')}</h1>
            <p className="text-secondary font-body max-w-lg">{t('manage_your_active_towing_units__monitor', 'Manage your active towing units, monitor vehicle health, and optimize dispatch efficiency across the territory.')}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface rounded-lg font-bold hover:bg-surface-dim transition-colors">
              <Filter className="w-5 h-5 text-xl" />
              {t('filter', 'Filter')}
            </button>
            <button onClick={() => onViewChange?.('fleet/add-truck')} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">
              <PlusCircle className="w-5 h-5 text-xl" />
              {t('register_truck', 'Register Truck')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('total_trucks', 'Total Trucks')}</span>
              <Truck className="text-primary-container p-2 bg-primary/5 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">12</span>
              <span className="text-xs text-primary font-bold ml-2">{t('2_this_month', '+2 this month')}</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('active_now', 'Active Now')}</span>
              <Navigation className="text-primary p-2 bg-primary/10 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">08</span>
              <span className="text-xs text-on-surface-variant font-label ml-2">{t('67__utilization', '67% utilization')}</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <span className="text-secondary font-semibold font-label">{t('safety_rating', 'Safety Rating')}</span>
              <ShieldCheck className="text-emerald-600 p-2 bg-emerald-50 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">4.9</span>
              <span className="text-xs text-emerald-600 font-bold ml-2">{t('excellence', 'Excellence')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FleetCard
            title={t('unit_701', 'Unit-701')}
            subtitle={t('heavy_duty_flatbed', 'Heavy Duty Flatbed')}
            status={t('available', 'Available')}
            statusClassName="bg-primary/10 text-primary"
            driver={t('marcus_chen', 'Marcus Chen')}
            currentTask={t('standing_by', 'Standing By')}
            odometer={t('42_500_mi', '42,500 mi')}
            fuel="85%"
            fuelClassName="bg-primary"
            truckImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBV9RrDlgQt10wjv-bQRD-Uj3HH7MBaP89PmJ9wV-_V_XcDPpnnH4WxkkACkQkBcQ_6fd1GYKwIB2MjnLPLRUkxLNnxKrqotvWIm9EaLTCqdBUqDn_7hUZ1ytKbHU76E3UTjPbWzYtZtX_D4I9BejVod1NH1KL8gifGRatuP-tW3tus2CFoF8jp5nZzFY4UmpGdOT6br1gfESZGyAP9PA4i7WaZlbAA8F45rJpIYiI2nGrf7uuz4t5viyqikUVcNXSUw2DtpTFnnNw"
            driverImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAOU5eEl3BK4wK2W431XG2ss4wl3ppBXzkSyUXClZ5LxZ0VdP39PyUwlyzfAWppczTsHTfkg3zePGQO7c8oxROaBFg5dlwFH5jrj8ODUP50gkekd8OtlD7fCaG--BUg6Gw3DoavPyfhVw8KSfYYDB776MK3y4dON10184hUaKSatX3LCWyzxhshL1qN5snYxnUEpWq5PkRHz_GasznxU4FE-AhFGdF2H1DMBfmqxKn5OoYsCEMCVeX4efp9jpSOPM9JdJANERZMBik"
            onViewChange={onViewChange}
          />

          <FleetCard
            title={t('unit_412', 'Unit-412')}
            subtitle={t('standard_wheel_lift', 'Standard Wheel-Lift')}
            status={t('busy', 'Busy')}
            statusClassName="bg-tertiary/10 text-tertiary"
            driver={t('sarah_miller', 'Sarah Miller')}
            currentTask={t('rt_8820_recovery', '#RT-8820 Recovery')}
            odometer={t('12_140_mi', '12,140 mi')}
            fuel="32%"
            fuelClassName="bg-tertiary"
            currentTaskClassName="text-tertiary"
            truckImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBSTOiQkMpCfxZb_QF2VD8e7-uAYmkjClrbjOygneXj0ectczilIiBXogoLmFzLADcOx32XNkf7cDsKfamhqRNrJRinxDNfQliDv7PijxmRauHiY4Jwew-PU0-lqJr6A8yFNhgkf39do_16YgKCvp5-GnWRAu1oKtozxRbLIi2YXFNRsy-ZuHZICJGCeo_9mxz9maRYRc67cJD_cW-YOWSw4aiF8aJBhaiJjdj2UPD35omq6FjrGiVWYV9EAFIfvSA8r8Suc5BHlO4"
            driverImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBQnPjXYUWT2JsGCatVA9cCyeBRwKPOpafDfrTydTeT0eHdbXsXNoQV8_P69ngv0DWbIKnPwml1QM9uvrM1cVXQADQwYVhoAPL6JP1kzLfGEdrKSbbc8X5LR3RxeWo1r6wdPcuPafkhHMAY3O44HZnc1WMNGh-gRYpMtWV4PYh-qUgGcAxW8ubgjZ_QcPyZUsfYomTlLmg-jGDRygm4aFrXkIIqbvrEo6GnFJAsJLB0D6_tMKPF0wyEj5duUxBl-l22Nmw1Ywt4VFo"
            onViewChange={onViewChange}
          />

          <FleetCard
            title={t('unit_905', 'Unit-905')}
            subtitle={t('boom___integrated_wrecker', 'Boom / Integrated Wrecker')}
            status={t('out_of_service', 'Out of Service')}
            statusClassName="bg-surface-container-low text-on-surface-variant"
            driver={t('none', 'None')}
            currentTask="Awaiting Assignment"
            odometer={t('88_092_mi', '88,092 mi')}
            fuel="100%"
            fuelClassName="bg-surface-container-high"
            cardBodyClassName="opacity-70"
            truckImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAe7Kv8XgKU832CZW8VMe4DrYSIzpzqCuth80-G05kZBtLVjdw30pqAlziekp8wb9R6-jzcbxp4hT7x059qKt0j-pxNvJbDLvc9ryjyGg9djHaNZq3vpjTZAombgQatOzdEVqeAsAZm1DzhM_LvTOqC-HyM491nuiLxe5bfA9uv5P9nZ_LBB7R5S5JUYqxxiAeiBV2WD-_kdYJyH3icrIQv5Jk75XurfM4Ly0yp1wTMTQ--BWDBADiPrTkDeMkiVFdYxRt2Jq8tL20"
            onViewChange={onViewChange}
          />

          <FleetCard
            title={t('unit_203', 'Unit-203')}
            subtitle={t('light_duty_roll_back', 'Light Duty Roll-back')}
            status={t('available', 'Available')}
            statusClassName="bg-primary/10 text-primary"
            driver={t('elena_rodriguez', 'Elena Rodriguez')}
            currentTask={t('idle___south_post', 'Idle - South Post')}
            odometer={t('5_402_mi', '5,402 mi')}
            fuel="60%"
            fuelClassName="bg-primary"
            truckImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCwitDA4_Z2OkkZX6PVttxZ1oiOTP38M6_PTq_ElcXf50k1xcrRKLv2Ycmk3eGwiI8atAMYQk2AzJsnm_gjc0xrni9t_vUwQvOrvMuCr_W7lFRczf76c6ItMSOM-RYY3KnQCQ81EKBpN7C7AAfZhTjCREiWEs2gvhoQ3wSK9kesO4pOs1cxNJZelLngIHNT-SflfdqztF3KE-rq72iAMMKfucJZtr6Mz9B78iQSeR7IuWP3RMsOb0XyP_PR8FPPAS5QDu5uanDYy94"
            driverImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDk0ZiWti-QRL_832cXQV9X1MoeG7v5p9lpkxpcp6BeiFZRlWty8zsvJenoF4kTLFdevMM1BogzcG1BRgjyoj9MgVEGk9mAuIlcLL8sA5ime4-hA18vY9Jc3EU5en8DOQC9kvJXT0tgPET2ul1hvKgHF_YOKBfjX1AjeVOLjX-hE7jNUCP1v_G4L0R-MWyxI2FiNfLZeUytPVUCpinRR4kf3WIzWtaIKZDbtzYLTG861I6H1KqOWriGZvbyRmO1MoqDk5kIhoeM4c8"
            onViewChange={onViewChange}
          />
        </div>
      </div>
    </main>
  );
};

type FleetCardProps = {
  title: string;
  subtitle: string;
  status: string;
  statusClassName: string;
  driver: string;
  currentTask: string;
  odometer: string;
  fuel: string;
  fuelClassName: string;
  truckImage: string;
  onViewChange?: (view: string) => void;
  driverImage?: string;
  cardBodyClassName?: string;
  currentTaskClassName?: string;
};

const FleetCard: React.FC<FleetCardProps> = ({
  title,
  subtitle,
  status,
  statusClassName,
  driver,
  currentTask,
  odometer,
  fuel,
  fuelClassName,
  truckImage,
  onViewChange,
  driverImage,
  cardBodyClassName,
  currentTaskClassName,
}) => (
  <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
        <img alt="Tow truck" className="w-full h-full object-cover" src={truckImage} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold font-headline">{title}</h3>
            <p className="text-secondary font-label text-sm">{subtitle}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusClassName}`}>{status}</span>
        </div>
      </div>
    </div>
    <div className={`grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4 ${cardBodyClassName ?? ''}`}>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Assigned Driver</span>
        {driverImage ? (
          <div className="flex items-center gap-2">
            <img className="w-6 h-6 rounded-full" alt={driver} src={driverImage} />
            <span className="font-bold text-on-surface">{driver}</span>
          </div>
        ) : (
          <span className="font-bold text-on-surface">{driver}</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Current Task</span>
        <span className={`font-bold ${currentTaskClassName ?? 'text-on-surface'}`}>{currentTask}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Odometer</span>
        <span className="font-bold text-on-surface">{odometer}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">Fuel Level</span>
        <div className="flex items-center gap-2">
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className={`h-full ${fuelClassName}`} style={{ width: fuel }} />
          </div>
          <span className="font-bold text-on-surface">{fuel}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-5">
      <button
        onClick={() => onViewChange?.('fleet/truck-details')}
        className="px-4 py-1.5 rounded-lg text-xs font-bold border border-primary/30 text-primary hover:bg-primary/5 transition-colors flex items-center gap-1"
      >
        <Eye className="w-3.5 h-3.5" />
        View Details
      </button>
      <button
        onClick={() => onViewChange?.('fleet/edit-truck')}
        className="px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
      >
        Edit Truck
      </button>
    </div>
  </div>
);
