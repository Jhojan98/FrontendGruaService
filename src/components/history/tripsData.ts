import { Trip } from '../../types';

export const MOCK_TRIPS: Trip[] = [
  {
    id: '#TR-88219',
    clientId: 'c1',
    clientName: 'Swift Logistics Inc.',
    origin: 'Interstate 35, Mile 234',
    destination: 'Swift Logistics Terminal',
    distance: '7.0 mi',
    status: 'Completed',
    towTruck: 'Unit-701',
    date: 'Oct 24, 2023',
    time: '14:30 PM'
  },
  {
    id: '#TR-8819',
    clientId: 'c2',
    clientName: 'Sarah Lopez',
    origin: 'Downtown Plaza',
    destination: 'Longhaul Garage',
    distance: '34.8 km',
    status: 'In Progress',
    towTruck: 'Heavy Duty 02',
    date: 'Oct 24, 2023',
    time: '16:15 PM'
  },
  {
    id: '#TR-8815',
    clientId: 'c3',
    clientName: 'Michael K.',
    origin: 'I-95 Exit 42',
    destination: 'Impound Yard B',
    distance: '8.2 km',
    status: 'Pending',
    towTruck: 'Wrecker 01',
    date: 'Oct 23, 2023',
    time: '09:00 AM'
  },
  {
    id: '#TR-8810',
    clientId: 'c4',
    clientName: 'Riley White',
    origin: 'Lakeside Marina',
    destination: 'City Body Shop',
    distance: '21.5 km',
    status: 'Completed',
    towTruck: 'Flatbed 07',
    date: 'Oct 23, 2023',
    time: '18:45 PM'
  }
];
