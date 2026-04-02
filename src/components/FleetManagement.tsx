import { useTranslation } from 'react-i18next';
import React from 'react';
import { 
  Filter, 
  PlusCircle, 
  Truck, 
  Navigation, 
  Wrench, 
  ShieldCheck, 
  History 
} from 'lucide-react';

export const FleetManagement = () => {
  const { t } = useTranslation();
  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">
              <PlusCircle className="w-5 h-5 text-xl" />
              {t('register_truck', 'Register Truck')}
            </button>
          </div>
        </div>

        {/* Metrics Bar - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              <span className="text-secondary font-semibold font-label">{t('in_maintenance', 'In Maintenance')}</span>
              <Wrench className="text-tertiary p-2 bg-tertiary/10 rounded-lg w-10 h-10" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-headline">02</span>
              <span className="text-xs text-tertiary font-bold ml-2">{t('due_tomorrow', 'Due tomorrow')}</span>
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

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fleet Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                <img alt="White flatbed tow truck" className="w-full h-full object-cover" data-alt="Modern white flatbed tow truck parked in a tidy service yard during a bright clear morning" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV9RrDlgQt10wjv-bQRD-Uj3HH7MBaP89PmJ9wV-_V_XcDPpnnH4WxkkACkQkBcQ_6fd1GYKwIB2MjnLPLRUkxLNnxKrqotvWIm9EaLTCqdBUqDn_7hUZ1ytKbHU76E3UTjPbWzYtZtX_D4I9BejVod1NH1KL8gifGRatuP-tW3tus2CFoF8jp5nZzFY4UmpGdOT6br1gfESZGyAP9PA4i7WaZlbAA8F45rJpIYiI2nGrf7uuz4t5viyqikUVcNXSUw2DtpTFnnNw"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-headline">{t('unit_701', 'Unit-701')}</h3>
                    <p className="text-secondary font-label text-sm">{t('heavy_duty_flatbed', 'Heavy Duty Flatbed')}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{t('available', 'Available')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4">
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('assigned_driver', 'Assigned Driver')}</span>
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6 rounded-full" data-alt="Close up of a friendly professional truck driver smiling at the camera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOU5eEl3BK4wK2W431XG2ss4wl3ppBXzkSyUXClZ5LxZ0VdP39PyUwlyzfAWppczTsHTfkg3zePGQO7c8oxROaBFg5dlwFH5jrj8ODUP50gkekd8OtlD7fCaG--BUg6Gw3DoavPyfhVw8KSfYYDB776MK3y4dON10184hUaKSatX3LCWyzxhshL1qN5snYxnUEpWq5PkRHz_GasznxU4FE-AhFGdF2H1DMBfmqxKn5OoYsCEMCVeX4efp9jpSOPM9JdJANERZMBik"/>
                  <span className="font-bold text-on-surface">{t('marcus_chen', 'Marcus Chen')}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('current_task', 'Current Task')}</span>
                <span className="font-bold text-on-surface">{t('standing_by', 'Standing By')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('odometer', 'Odometer')}</span>
                <span className="font-bold text-on-surface">{t('42_500_mi', '42,500 mi')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('fuel_level', 'Fuel Level')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[85%]"></div>
                  </div>
                  <span className="font-bold text-on-surface">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                <img alt="Red wheel lift tow truck" className="w-full h-full object-cover" data-alt="Heavy duty red tow truck with hydraulic equipment under dramatic twilight sky lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSTOiQkMpCfxZb_QF2VD8e7-uAYmkjClrbjOygneXj0ectczilIiBXogoLmFzLADcOx32XNkf7cDsKfamhqRNrJRinxDNfQliDv7PijxmRauHiY4Jwew-PU0-lqJr6A8yFNhgkf39do_16YgKCvp5-GnWRAu1oKtozxRbLIi2YXFNRsy-ZuHZICJGCeo_9mxz9maRYRc67cJD_cW-YOWSw4aiF8aJBhaiJjdj2UPD35omq6FjrGiVWYV9EAFIfvSA8r8Suc5BHlO4"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-headline">{t('unit_412', 'Unit-412')}</h3>
                    <p className="text-secondary font-label text-sm">{t('standard_wheel_lift', 'Standard Wheel-Lift')}</p>
                  </div>
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-full uppercase tracking-wider">{t('busy', 'Busy')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4">
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('assigned_driver', 'Assigned Driver')}</span>
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6 rounded-full" data-alt="Portrait of an experienced male service driver with a beard and safety gear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQnPjXYUWT2JsGCatVA9cCyeBRwKPOpafDfrTydTeT0eHdbXsXNoQV8_P69ngv0DWbIKnPwml1QM9uvrM1cVXQADQwYVhoAPL6JP1kzLfGEdrKSbbc8X5LR3RxeWo1r6wdPcuPafkhHMAY3O44HZnc1WMNGh-gRYpMtWV4PYh-qUgGcAxW8ubgjZ_QcPyZUsfYomTlLmg-jGDRygm4aFrXkIIqbvrEo6GnFJAsJLB0D6_tMKPF0wyEj5duUxBl-l22Nmw1Ywt4VFo"/>
                  <span className="font-bold text-on-surface">{t('sarah_miller', 'Sarah Miller')}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('current_task', 'Current Task')}</span>
                <span className="font-bold text-tertiary">{t('rt_8820_recovery', '#RT-8820 Recovery')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('odometer', 'Odometer')}</span>
                <span className="font-bold text-on-surface">{t('12_140_mi', '12,140 mi')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('fuel_level', 'Fuel Level')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[32%]"></div>
                  </div>
                  <span className="font-bold text-tertiary">32%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                <img alt="Large wrecker truck" className="w-full h-full object-cover" data-alt="Side profile of a powerful black wrecker truck with industrial chains and rigging equipment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe7Kv8XgKU832CZW8VMe4DrYSIzpzqCuth80-G05kZBtLVjdw30pqAlziekp8wb9R6-jzcbxp4hT7x059qKt0j-pxNvJbDLvc9ryjyGg9djHaNZq3vpjTZAombgQatOzdEVqeAsAZm1DzhM_LvTOqC-HyM491nuiLxe5bfA9uv5P9nZ_LBB7R5S5JUYqxxiAeiBV2WD-_kdYJyH3icrIQv5Jk75XurfM4Ly0yp1wTMTQ--BWDBADiPrTkDeMkiVFdYxRt2Jq8tL20"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-headline">{t('unit_905', 'Unit-905')}</h3>
                    <p className="text-secondary font-label text-sm">{t('boom___integrated_wrecker', 'Boom / Integrated Wrecker')}</p>
                  </div>
                  <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-wider">{t('out_of_service', 'Out of Service')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4 opacity-70">
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('assigned_driver', 'Assigned Driver')}</span>
                <span className="font-bold text-on-surface">{t('none', 'None')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('current_task', 'Current Task')}</span>
                <span className="font-bold text-error">{t('brake_alignment', 'Brake Alignment')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('odometer', 'Odometer')}</span>
                <span className="font-bold text-on-surface">{t('88_092_mi', '88,092 mi')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('fuel_level', 'Fuel Level')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-surface-container-high h-full w-[100%]"></div>
                  </div>
                  <span className="font-bold text-on-surface">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                <img alt="White light duty tow truck" className="w-full h-full object-cover" data-alt="Clean white light-duty tow truck driving through a coastal highway during golden hour" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwitDA4_Z2OkkZX6PVttxZ1oiOTP38M6_PTq_ElcXf50k1xcrRKLv2Ycmk3eGwiI8atAMYQk2AzJsnm_gjc0xrni9t_vUwQvOrvMuCr_W7lFRczf76c6ItMSOM-RYY3KnQCQ81EKBpN7C7AAfZhTjCREiWEs2gvhoQ3wSK9kesO4pOs1cxNJZelLngIHNT-SflfdqztF3KE-rq72iAMMKfucJZtr6Mz9B78iQSeR7IuWP3RMsOb0XyP_PR8FPPAS5QDu5uanDYy94"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-headline">{t('unit_203', 'Unit-203')}</h3>
                    <p className="text-secondary font-label text-sm">{t('light_duty_roll_back', 'Light Duty Roll-back')}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{t('available', 'Available')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-outline-variant/10 pt-4">
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('assigned_driver', 'Assigned Driver')}</span>
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6 rounded-full" data-alt="Close up of a professional female driver in uniform looking focused" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk0ZiWti-QRL_832cXQV9X1MoeG7v5p9lpkxpcp6BeiFZRlWty8zsvJenoF4kTLFdevMM1BogzcG1BRgjyoj9MgVEGk9mAuIlcLL8sA5ime4-hA18vY9Jc3EU5en8DOQC9kvJXT0tgPET2ul1hvKgHF_YOKBfjX1AjeVOLjX-hE7jNUCP1v_G4L0R-MWyxI2FiNfLZeUytPVUCpinRR4kf3WIzWtaIKZDbtzYLTG861I6H1KqOWriGZvbyRmO1MoqDk5kIhoeM4c8"/>
                  <span className="font-bold text-on-surface">{t('elena_rodriguez', 'Elena Rodriguez')}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('current_task', 'Current Task')}</span>
                <span className="font-bold text-on-surface">{t('idle___south_post', 'Idle - South Post')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('odometer', 'Odometer')}</span>
                <span className="font-bold text-on-surface">{t('5_402_mi', '5,402 mi')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label uppercase text-[10px] tracking-widest mb-1">{t('fuel_level', 'Fuel Level')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[60%]"></div>
                  </div>
                  <span className="font-bold text-on-surface">60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Schedule (Secondary Content Section) */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <History className="w-6 h-6 text-tertiary" />
            {t('maintenance_queue', 'Maintenance Queue')}
          </h2>
          <div className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10">
            <table className="w-full text-left font-body">
              <thead className="bg-surface-container-high border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">{t('unit_id', 'Unit ID')}</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">{t('service_type', 'Service Type')}</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">{t('due_date', 'Due Date')}</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">{t('priority', 'Priority')}</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary text-right">{t('actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-bold">{t('unit_550', 'Unit-550')}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{t('annual_inspection', 'Annual Inspection')}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{t('tomorrow', 'Tomorrow')}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-0.5 bg-tertiary/10 text-tertiary rounded font-bold uppercase">{t('medium', 'Medium')}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary font-bold hover:underline">{t('schedule', 'Schedule')}</button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-bold">{t('unit_212', 'Unit-212')}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{t('oil__amp__filter_change', 'Oil &amp; Filter Change')}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{t('aug_12__2024', 'Aug 12, 2024')}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-0.5 bg-surface-container-low text-on-surface-variant rounded font-bold uppercase">{t('low', 'Low')}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary font-bold hover:underline">{t('schedule', 'Schedule')}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};