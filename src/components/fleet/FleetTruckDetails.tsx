import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Gauge, History, IdCard, Route, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { assignFleetTruckDriver, getFleetTruck, listDrivers } from '../../lib/api';
import { DriverListItem, FleetTruck } from '../../types';
import { FleetManagementProps } from './types';

const SELECTED_DRIVER_ID = 'selected_driver_id';

export const FleetTruckDetails: React.FC<FleetManagementProps> = ({ onViewChange, selectedTruckId, fleet = [], refreshFleet }) => {
  const { t } = useTranslation();
  const fallbackTruck = fleet.find((item) => item.id === selectedTruckId) ?? fleet[0] ?? null;
  const [truck, setTruck] = useState<FleetTruck | null>(fallbackTruck);
  const [drivers, setDrivers] = useState<DriverListItem[]>([]);
  const [showDriverSelector, setShowDriverSelector] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');
  const [assignmentError, setAssignmentError] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const hasAssignedDriver = Boolean(truck?.assignedDriverId && truck?.assignedDriverName);

  useEffect(() => {
    if (!selectedTruckId) {
      setTruck(fallbackTruck);
      return;
    }
    getFleetTruck(selectedTruckId)
      .then((data) => setTruck(data))
      .catch(() => setTruck(fallbackTruck));
  }, [fallbackTruck, selectedTruckId]);

  const assignableDrivers = useMemo(
    () =>
      drivers.filter((driver) => {
        if (driver.id === truck?.assignedDriverId) {
          return true;
        }
        const hasOtherTruckAssigned = Boolean(driver.assignedTruckId && driver.assignedTruckId !== truck?.id);
        return !hasOtherTruckAssigned && driver.status === 'Available';
      }),
    [drivers, truck?.assignedDriverId, truck?.id],
  );

  const noAvailableDrivers = assignableDrivers.length === 0;

  const handleViewProfile = () => {
    if (!truck?.assignedDriverId) {
      return;
    }
    sessionStorage.setItem(SELECTED_DRIVER_ID, truck.assignedDriverId);
    onViewChange?.('drivers/driver-details');
  };

  const handleChangeDriver = () => {
    if (!truck) {
      return;
    }
    setShowDriverSelector(true);
    setAssignmentError(null);
    setSelectedDriverId(truck.assignedDriverId ?? '');
    listDrivers()
      .then((items) => setDrivers(items))
      .catch(() => {
        setDrivers([]);
        setAssignmentError(t('fleet_details.failed_load_drivers', 'Failed to load drivers list.'));
      });
  };

  const handleAssignDriver = async () => {
    if (!truck || !selectedDriverId) {
      setAssignmentError(t('fleet_details.select_driver_required', 'Select a driver to assign.'));
      return;
    }
    if (noAvailableDrivers) {
      setAssignmentError(t('fleet_details.no_available_drivers_now', 'No available drivers at the moment.'));
      return;
    }
    setAssignmentError(null);
    setIsAssigning(true);
    try {
      const updated = await assignFleetTruckDriver(truck.id, { driverId: selectedDriverId });
      setTruck(updated);
      await refreshFleet?.();
      setShowDriverSelector(false);
      setSelectedDriverId(updated.assignedDriverId ?? '');
    } catch (error) {
      setAssignmentError(error instanceof Error ? error.message : t('fleet_details.failed_assign_driver', 'Failed to assign driver.'));
    } finally {
      setIsAssigning(false);
    }
  };

  if (!truck) {
    return (
      <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => onViewChange?.('fleet')} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          <p className="text-on-surface-variant mt-4">{t('fleet_details.no_truck_selected', 'No truck selected.')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full overflow-y-auto p-6 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onViewChange?.('fleet')} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <div>
              <h2 className="text-3xl font-black text-on-background tracking-tight font-headline">{truck.unitNumber}</h2>
              <p className="text-sm text-on-surface-variant mt-1">{truck.type} • {truck.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onViewChange?.('fleet/edit-truck')}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Edit Truck
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 h-80 rounded-xl overflow-hidden relative shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
            <img
              alt="Tow truck"
              className="w-full h-full object-cover"
              src={truck.imageUrl ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmltKXcD4Jpsp4dURjFjx8s21fFjuF0Yx67p79cfr-ZnwtOxfPq13AmFXYx0lrwUhJsKb-yin8SEn1Ddtxb_T78bK0uSSrazX3V7_eFvYlMyR0bdXaOo-xxzdYP3iWn_FnJT8pe4GOgNOjR31x2WsUE1LtgUYZQQgF73QPk4n_98M9L0CzhoRBQGzubiwbFSP4J7nCIjwHV_-UaIv55oJUe8WH6VePXwyBC-1SmO-07NhI4o0gHZP1RwF_otrq6EhBvUohEbXT1dA'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-lg">
                  <Route className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80">Last Known Location</p>
                  <p className="text-lg font-bold">I-95 North, Exit 12 (Savannah, GA)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Current Assignment</h3>
              <Route className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant">Pickup</span>
                <span className="font-bold">Main St. & 4th Ave</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant">Dropoff</span>
                <span className="font-bold">Terra Service Center</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex items-start justify-between">
                <span className="text-on-surface-variant">Assigned Driver</span>
                <span className="font-bold text-primary">{hasAssignedDriver ? truck.assignedDriverName : 'Unassigned'}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant">Estimated Completion</span>
                <span className="font-bold">14:45 PM</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <Gauge className="w-5 h-5 text-tertiary" />
              <h3 className="text-xl font-bold">Technical Specs</h3>
            </div>
            <div className="space-y-3 text-sm">
              <InfoLine label="Make / Model" value={truck.type} />
              <InfoLine label="Year" value="N/A" />
              <InfoLine label="VIN" value="1XPKD4X9PD123456" mono />
              <InfoLine label="License Plate" value={truck.unitNumber} />
            </div>
          </div>

          <div className="md:col-span-8 bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <IdCard className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Assigned Driver</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleChangeDriver}
                  className="px-4 py-2 border border-primary text-primary text-sm font-bold rounded-lg hover:bg-primary/5 transition-colors"
                  type="button"
                >
                  Change Driver
                </button>
                <button
                  onClick={handleViewProfile}
                  disabled={!hasAssignedDriver}
                  className="px-4 py-2 bg-background text-on-surface-variant text-sm font-bold rounded-lg border border-outline-variant/50 hover:border-outline-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  View Profile
                </button>
              </div>
            </div>

            {showDriverSelector && (
              <div className="mb-4 rounded-xl border border-outline-variant/30 bg-background p-4">
                <p className="text-sm font-bold text-on-surface mb-2">Assign Available Driver</p>
                <select
                  value={selectedDriverId}
                  onChange={(event) => setSelectedDriverId(event.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm"
                  disabled={noAvailableDrivers}
                >
                  <option value="">{noAvailableDrivers ? t('fleet_details.no_available_drivers', 'No available drivers') : t('fleet_details.select_driver', 'Select a driver...')}</option>
                  {drivers.map((driver) => {
                    const alreadyAssignedToOtherTruck = Boolean(driver.assignedTruckId && driver.assignedTruckId !== truck.id);
                    const disabled = alreadyAssignedToOtherTruck || (driver.status !== 'Available' && driver.id !== truck.assignedDriverId);
                    const assignmentLabel = alreadyAssignedToOtherTruck
                      ? ` - ${t('fleet_details.assigned_to', 'Assigned to')} ${driver.assignedTruckUnit ?? driver.assignedTruckId}`
                      : '';
                    return (
                      <option key={driver.id} value={driver.id} disabled={disabled}>
                        {driver.name} ({driver.status}){assignmentLabel}
                      </option>
                    );
                  })}
                </select>
                {noAvailableDrivers && <p className="text-xs text-on-surface-variant mt-2">{t('fleet_details.no_available_drivers_now', 'No available drivers right now.')}</p>}
                {assignmentError && <p className="text-xs text-error mt-2">{assignmentError}</p>}
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleAssignDriver}
                    disabled={isAssigning || noAvailableDrivers}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold disabled:opacity-50"
                  >
                    {isAssigning ? t('fleet_details.assigning', 'Assigning...') : t('fleet_details.assign', 'Assign')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDriverSelector(false)}
                    className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-bold"
                  >
                    {t('drivers.cancel', 'Cancel')}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                alt={hasAssignedDriver ? truck.assignedDriverName ?? 'Assigned Driver' : 'Unassigned'}
                className="rounded-2xl object-cover border-4 border-white shadow-sm w-44 h-44"
                src={truck.assignedDriverImage ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBibuny2Od0TY_CvKhVxM1zqKT-D3O6E823cS_f7aswcAX1jYtxR7RP7OJYtETbvU_AX1vXcrubfvTdoee5cypnp2qfXpnv1j5LKTF4dmr5GN57-jAMouevjsMH-S02wJJ-JmWTMQYEThXVLD6XYmC0FZJRcUp1FN-yTdfEHO_VBANAyTkV4eDOQ_jqEe5ZPDUXrfEVdp2oVMA1nwS9q1nwOrFYy5hJ7S-SR-tYGr1uf9rddVlpjmYj9MnuNLEq2cFpJSGiB5Wjb-M'}
              />
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-3xl font-black text-on-background mb-1">{hasAssignedDriver ? truck.assignedDriverName : 'Unassigned'}</h4>
                <p className="text-primary font-bold tracking-wide uppercase text-xs">{truck.assignedDriverStatus ?? 'No active driver status'}</p>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Driver Rating</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-2xl font-black">4.9</span>
                      <Star className="w-4 h-4 text-tertiary fill-tertiary" />
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Lifetime Trips</p>
                    <p className="text-2xl font-black mt-1">1,422</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-6 md:p-8 border border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-tertiary" />
            <h3 className="text-2xl font-bold">Trip History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-on-surface-variant text-xs uppercase tracking-widest font-bold border-b border-outline-variant/40">
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3">Route</th>
                  <th className="pb-3 px-3">Distance</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {[
                  ['Oct 24, 2023', '822 Maple St. → Terra Yard B', '12.4 mi'],
                  ['Oct 23, 2023', 'Hwy 17 Overpass → Midtown Collision', '8.7 mi'],
                  ['Oct 22, 2023', 'Downtown Square → Terra Service Center', '3.1 mi'],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 px-3 font-bold">{row[0]}</td>
                    <td className="py-3 px-3">{row[1]}</td>
                    <td className="py-3 px-3 font-mono font-bold">{row[2]}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">Completed</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="px-3 py-1.5 border border-outline-variant text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface transition-colors">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const InfoLine = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex justify-between py-2 border-b border-outline-variant/20 last:border-b-0">
    <span className="text-on-surface-variant text-sm">{label}</span>
    <span className={`font-bold text-sm ${mono ? 'font-mono' : ''}`}>{value}</span>
  </div>
);
