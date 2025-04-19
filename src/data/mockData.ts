// Mock User Data
export const mockUserData = [
  {
    id: 'user-1',
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    cardBalance: 500
  },
  {
    id: 'user-2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    cardBalance: 750
  }
];

// Mock Bus Routes
export const mockBusRoutes = [
  {
    id: 'route-1',
    name: 'Bangalore - Mysore Express',
    origin: 'Majestic Bus Stand',
    destination: 'Mysore Bus Stand',
    fare: 150,
    distance: '145 km',
    duration: '3.5 hrs'
  },
  {
    id: 'route-2',
    name: 'Chennai - Pondicherry Coastal',
    origin: 'Chennai Central',
    destination: 'Pondicherry Bus Terminal',
    fare: 120,
    distance: '170 km',
    duration: '3 hrs'
  },
  {
    id: 'route-3',
    name: 'Hyderabad - Tirupati Temple',
    origin: 'Hyderabad Central Bus Station',
    destination: 'Tirupati Bus Stand',
    fare: 450,
    distance: '600 km',
    duration: '10 hrs'
  },
  {
    id: 'route-4',
    name: 'Kochi - Munnar Hills',
    origin: 'Kochi Bus Terminal',
    destination: 'Munnar Bus Stand',
    fare: 180,
    distance: '130 km',
    duration: '4 hrs'
  },
  {
    id: 'route-5',
    name: 'Coimbatore - Madurai Express',
    origin: 'Coimbatore Bus Stand',
    destination: 'Madurai Periyar',
    fare: 200,
    distance: '220 km',
    duration: '5 hrs'
  },
  {
    id: 'route-6',
    name: 'Mangalore - Udupi Coastal',
    origin: 'Mangalore Central',
    destination: 'Udupi Bus Stand',
    fare: 80,
    distance: '60 km',
    duration: '1.5 hrs'
  }
];

// Mock Bus Schedules
export const mockBusSchedules = [
  {
    id: 'schedule-1',
    routeId: 'route-1',
    busNumber: 'KA-01-F-1234',
    departureTime: '07:00',
    arrivalTime: '10:30',
    availableSeats: 32,
    totalSeats: 40,
    currentLocation: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    nextStop: 'Mandya'
  },
  {
    id: 'schedule-2',
    routeId: 'route-2',
    busNumber: 'TN-01-G-5678',
    departureTime: '08:30',
    arrivalTime: '11:30',
    availableSeats: 25,
    totalSeats: 40,
    currentLocation: { lat: 13.0827, lng: 80.2707 }, // Chennai
    nextStop: 'Mahabalipuram'
  },
  {
    id: 'schedule-3',
    routeId: 'route-3',
    busNumber: 'AP-01-H-9012',
    departureTime: '20:00',
    arrivalTime: '06:00',
    availableSeats: 35,
    totalSeats: 45,
    currentLocation: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
    nextStop: 'Kurnool'
  },
  {
    id: 'schedule-4',
    routeId: 'route-4',
    busNumber: 'KL-01-J-3456',
    departureTime: '09:00',
    arrivalTime: '13:00',
    availableSeats: 28,
    totalSeats: 40,
    currentLocation: { lat: 9.9312, lng: 76.2673 }, // Kochi
    nextStop: 'Adimali'
  },
  {
    id: 'schedule-5',
    routeId: 'route-5',
    busNumber: 'TN-01-K-7890',
    departureTime: '10:00',
    arrivalTime: '15:00',
    availableSeats: 30,
    totalSeats: 40,
    currentLocation: { lat: 11.0168, lng: 76.9558 }, // Coimbatore
    nextStop: 'Dindigul'
  }
];

// Seat Layout for Buses
export const mockSeatLayout = [
  { id: '1A', isBooked: false, price: 50, type: 'window' },
  { id: '1B', isBooked: true, price: 50, type: 'aisle' },
  { id: '1C', isBooked: false, price: 50, type: 'aisle' },
  { id: '1D', isBooked: false, price: 50, type: 'window' },
  { id: '2A', isBooked: false, price: 50, type: 'window' },
  { id: '2B', isBooked: false, price: 50, type: 'aisle' },
  { id: '2C', isBooked: true, price: 50, type: 'aisle' },
  { id: '2D', isBooked: false, price: 50, type: 'window' },
  { id: '3A', isBooked: false, price: 50, type: 'window' },
  { id: '3B', isBooked: false, price: 50, type: 'aisle' },
  { id: '3C', isBooked: false, price: 50, type: 'aisle' },
  { id: '3D', isBooked: true, price: 50, type: 'window' },
  { id: '4A', isBooked: false, price: 50, type: 'window' },
  { id: '4B', isBooked: true, price: 50, type: 'aisle' },
  { id: '4C', isBooked: false, price: 50, type: 'aisle' },
  { id: '4D', isBooked: false, price: 50, type: 'window' },
  { id: '5A', isBooked: false, price: 50, type: 'window' },
  { id: '5B', isBooked: false, price: 50, type: 'aisle' },
  { id: '5C', isBooked: false, price: 50, type: 'aisle' },
  { id: '5D', isBooked: false, price: 50, type: 'window' },
  { id: '6A', isBooked: true, price: 50, type: 'window' },
  { id: '6B', isBooked: false, price: 50, type: 'aisle' },
  { id: '6C', isBooked: false, price: 50, type: 'aisle' },
  { id: '6D', isBooked: true, price: 50, type: 'window' },
  { id: '7A', isBooked: false, price: 50, type: 'window' },
  { id: '7B', isBooked: false, price: 50, type: 'aisle' },
  { id: '7C', isBooked: true, price: 50, type: 'aisle' },
  { id: '7D', isBooked: false, price: 50, type: 'window' },
  { id: '8A', isBooked: false, price: 50, type: 'window' },
  { id: '8B', isBooked: false, price: 50, type: 'aisle' },
  { id: '8C', isBooked: false, price: 50, type: 'aisle' },
  { id: '8D', isBooked: false, price: 50, type: 'window' },
  { id: '9A', isBooked: false, price: 50, type: 'window' },
  { id: '9B', isBooked: true, price: 50, type: 'aisle' },
  { id: '9C', isBooked: false, price: 50, type: 'aisle' },
  { id: '9D', isBooked: false, price: 50, type: 'window' },
  { id: '10A', isBooked: false, price: 50, type: 'window' },
  { id: '10B', isBooked: false, price: 50, type: 'aisle' },
  { id: '10C', isBooked: false, price: 50, type: 'aisle' },
  { id: '10D', isBooked: true, price: 50, type: 'window' },
];

// Mock Transaction History with more types of transactions
export const mockTransactionHistory = [
  {
    id: 'txn-1',
    userId: 'user-1',
    type: 'recharge',
    amount: 500,
    date: '2024-04-15T10:30:00Z',
    description: 'Card recharge via UPI'
  },
  {
    id: 'txn-2',
    userId: 'user-1',
    type: 'ticket',
    amount: -150,
    date: '2024-04-16T08:15:00Z',
    description: 'Ticket for Bangalore - Mysore Express'
  },
  {
    id: 'txn-3',
    userId: 'user-1',
    type: 'recharge',
    amount: 1000,
    date: '2024-04-20T14:45:00Z',
    description: 'Card recharge via Credit Card'
  },
  {
    id: 'txn-4',
    userId: 'user-1',
    type: 'ticket',
    amount: -180,
    date: '2024-04-22T07:30:00Z',
    description: 'Ticket for Kochi - Munnar Hills'
  },
  {
    id: 'txn-5',
    userId: 'user-1',
    type: 'refund',
    amount: 180,
    date: '2024-04-22T12:30:00Z',
    description: 'Refund for cancelled Kochi - Munnar ticket'
  },
  {
    id: 'txn-6',
    userId: 'user-1',
    type: 'ticket',
    amount: -120,
    date: '2024-04-23T09:15:00Z',
    description: 'Ticket for Chennai - Pondicherry Coastal'
  }
];
