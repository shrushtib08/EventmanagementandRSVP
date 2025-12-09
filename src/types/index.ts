export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Coordinator {
  name: string;
  email: string;
  phone: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: number;
  prizeMoney?: number; // Added prize money field
  image: string;
  coordinators: Coordinator[];
  attendees: number;
  capacity: number;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  timestamp: string;
  ticketCode: string;
}
