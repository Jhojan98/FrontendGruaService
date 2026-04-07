export interface DriverRecord {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: 'Available' | 'On Trip' | 'Off Duty';
  shift: 'Morning' | 'Evening' | 'Night' | 'Rotating';
  phone: string;
  score: string;
  trips: string;
  image: string;
}

export const drivers: DriverRecord[] = [
  {
    id: 'DR-1147',
    name: 'Marcus Reed',
    role: 'Senior Recovery Operator',
    unit: 'Unit-701',
    status: 'Available',
    shift: 'Morning',
    phone: '+1 (555) 334-8877',
    score: '4.9',
    trips: '64',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 'DR-2019',
    name: 'Elena Rodriguez',
    role: 'Light Duty Specialist',
    unit: 'Unit-203',
    status: 'On Trip',
    shift: 'Evening',
    phone: '+1 (555) 717-2044',
    score: '4.8',
    trips: '58',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 'DR-3091',
    name: 'Noah Kim',
    role: 'Tow Operator',
    unit: 'Unit-412',
    status: 'Off Duty',
    shift: 'Night',
    phone: '+1 (555) 222-1198',
    score: '4.7',
    trips: '49',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 'DR-4070',
    name: 'Ava Patel',
    role: 'Heavy Duty Operator',
    unit: 'Unit-905',
    status: 'Available',
    shift: 'Rotating',
    phone: '+1 (555) 980-4412',
    score: '4.9',
    trips: '71',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200',
  },
];
