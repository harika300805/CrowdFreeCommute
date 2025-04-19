
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
    name: 'Delhi - Gurugram Express',
    origin: 'Delhi ISBT',
    destination: 'Gurugram Bus Terminal',
    fare: 50,
    distance: '32 km',
    duration: '45 min'
  },
  {
    id: 'route-2',
    name: 'Mumbai - Pune Shuttle',
    origin: 'Mumbai Central',
    destination: 'Pune Station',
    fare: 120,
    distance: '150 km',
    duration: '3 hrs'
  },
  {
    id: 'route-3',
    name: 'Bangalore - Mysore Traveller',
    origin: 'Majestic Bus Stand',
    destination: 'Mysore Bus Stand',
    fare: 100,
    distance: '145 km',
    duration: '3.5 hrs'
  },
  {
    id: 'route-4',
    name: 'Chennai - Pondicherry Coastal',
    origin: 'Chennai Central',
    destination: 'Pondicherry Bus Terminal',
    fare: 85,
    distance: '170 km',
    duration: '3 hrs'
  },
  {
    id: 'route-5',
    name: 'Hyderabad - Warangal Express',
    origin: 'Hyderabad Central Bus Station',
    destination: 'Warangal Bus Stand',
    fare: 90,
    distance: '145 km',
    duration: '2.5 hrs'
  },
  {
    id: 'route-6',
    name: 'Kolkata - Siliguri Hill Connect',
    origin: 'Kolkata Esplanade',
    destination: 'Siliguri Bus Terminal',
    fare: 180,
    distance: '570 km',
    duration: '12 hrs'
  }
];

// Mock Bus Schedules
export const mockBusSchedules = [
  {
    id: 'schedule-1',
    routeId: 'route-1',
    busNumber: 'DL-1234',
    departureTime: '07:00',
    arrivalTime: '07:45',
    availableSeats: 32,
    totalSeats: 40,
    currentLocation: { lat: 28.6139, lng: 77.2090 }, // Delhi
    nextStop: 'Dhaula Kuan'
  },
  {
    id: 'schedule-2',
    routeId: 'route-1',
    busNumber: 'DL-5678',
    departureTime: '08:30',
    arrivalTime: '09:15',
    availableSeats: 15,
    totalSeats: 40,
    currentLocation: { lat: 28.5891, lng: 77.0762 }, // Near Gurugram
    nextStop: 'Cyber City'
  },
  {
    id: 'schedule-3',
    routeId: 'route-2',
    busNumber: 'MH-1234',
    departureTime: '06:00',
    arrivalTime: '09:00',
    availableSeats: 22,
    totalSeats: 45,
    currentLocation: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    nextStop: 'Lonavala'
  },
  {
    id: 'schedule-4',
    routeId: 'route-3',
    busNumber: 'KA-1234',
    departureTime: '09:00',
    arrivalTime: '12:30',
    availableSeats: 18,
    totalSeats: 40,
    currentLocation: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    nextStop: 'Mandya'
  },
  {
    id: 'schedule-5',
    routeId: 'route-4',
    busNumber: 'TN-1234',
    departureTime: '10:00',
    arrivalTime: '13:00',
    availableSeats: 25,
    totalSeats: 40,
    currentLocation: { lat: 13.0827, lng: 80.2707 }, // Chennai
    nextStop: 'Mahabalipuram'
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

// Mock Transaction History
export const mockTransactionHistory = [
  {
    id: 'txn-1',
    userId: 'user-1',
    type: 'recharge',
    amount: 200,
    date: '2023-04-15T10:30:00Z',
    description: 'Card recharge via UPI'
  },
  {
    id: 'txn-2',
    userId: 'user-1',
    type: 'ticket',
    amount: -50,
    date: '2023-04-16T08:15:00Z',
    description: 'Ticket for Delhi - Gurugram Express'
  },
  {
    id: 'txn-3',
    userId: 'user-1',
    type: 'recharge',
    amount: 500,
    date: '2023-04-20T14:45:00Z',
    description: 'Card recharge via Credit Card'
  },
  {
    id: 'txn-4',
    userId: 'user-1',
    type: 'ticket',
    amount: -100,
    date: '2023-04-22T07:30:00Z',
    description: 'Ticket for Bangalore - Mysore Traveller'
  }
];
