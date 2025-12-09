import { Event, RSVP, User } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@eventhub.com',
    role: 'admin',
    avatar: 'https://github.com/shadcn.png',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Innovators Summit 2025',
    description: 'Join the leading minds in technology for a day of innovation and networking. Topics include AI, Blockchain, and Quantum Computing.',
    date: '2025-06-15T09:00:00',
    location: 'San Francisco Convention Center',
    category: 'Technology',
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    coordinators: [
      { name: 'John Doe', email: 'john@techsummit.com', phone: '+1 (555) 123-4567' },
      { name: 'Jane Smith', email: 'jane@techsummit.com', phone: '+1 (555) 987-6543' }
    ],
    attendees: 150,
    capacity: 500,
  },
  {
    id: '2',
    title: 'Global Music Festival',
    description: 'A weekend of music, food, and art featuring top artists from around the world.',
    date: '2025-07-20T14:00:00',
    location: 'Hyde Park, London',
    category: 'Entertainment',
    price: 150,
    image: 'https://images.unsplash.com/photo-1459749411177-8c275d026473?auto=format&fit=crop&q=80&w=1000',
    coordinators: [
      { name: 'Mike Ross', email: 'mike@musicfest.com', phone: '+44 20 7946 0123' }
    ],
    attendees: 4500,
    capacity: 5000,
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch 10 promising startups pitch their ideas to a panel of investors.',
    date: '2025-05-10T18:00:00',
    location: 'Innovation Hub, New York',
    category: 'Business',
    price: 0,
    prizeMoney: 50000, // Added prize money
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000',
    coordinators: [
      { name: 'Sarah Lee', email: 'sarah@startuphub.com', phone: '+1 (212) 555-0199' }
    ],
    attendees: 85,
    capacity: 100,
  },
  {
    id: '4',
    title: 'Past: Winter Coding Bootcamp',
    description: 'An intensive coding bootcamp for beginners.',
    date: '2024-12-10T09:00:00',
    location: 'Online',
    category: 'Education',
    price: 50,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    coordinators: [
      { name: 'David Kim', email: 'david@bootcamp.com', phone: '+1 (555) 000-1111' }
    ],
    attendees: 200,
    capacity: 200,
  }
];

export const MOCK_RSVPS: RSVP[] = [
  {
    id: 'r1',
    eventId: '1',
    userId: '1',
    status: 'confirmed',
    timestamp: '2025-01-15T10:30:00',
    ticketCode: 'TIS-2025-AJ1',
  },
  {
    id: 'r2',
    eventId: '4', // Past event
    userId: '1',
    status: 'confirmed',
    timestamp: '2024-11-20T14:00:00',
    ticketCode: 'WCB-2024-AJ1',
  }
];
