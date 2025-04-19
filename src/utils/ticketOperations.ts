
import { mockBusSchedules, mockTransactionHistory, mockSeatLayout } from "@/data/mockData";

interface BookingDetails {
  userId: string;
  routeId: string;
  selectedSeats: string[];
  fare: number;
  busNumber: string;
  routeName: string;
}

export const updateAfterBooking = (booking: BookingDetails) => {
  // Find the schedule for this route
  const scheduleIndex = mockBusSchedules.findIndex(
    schedule => schedule.routeId === booking.routeId
  );

  if (scheduleIndex === -1) {
    throw new Error("Schedule not found");
  }

  // Update seat availability in the schedule
  mockBusSchedules[scheduleIndex] = {
    ...mockBusSchedules[scheduleIndex],
    availableSeats: mockBusSchedules[scheduleIndex].availableSeats - booking.selectedSeats.length
  };

  // Update seat layout to mark selected seats as booked
  booking.selectedSeats.forEach(seatId => {
    const seatIndex = mockSeatLayout.findIndex(seat => seat.id === seatId);
    if (seatIndex !== -1) {
      mockSeatLayout[seatIndex] = {
        ...mockSeatLayout[seatIndex],
        isBooked: true
      };
    }
  });

  // Add transaction record
  const transaction = {
    id: `txn-${Date.now()}`,
    userId: booking.userId,
    type: 'ticket',
    amount: -booking.fare,
    date: new Date().toISOString(),
    description: `Ticket for ${booking.routeName} (${booking.busNumber})`
  };

  mockTransactionHistory.push(transaction);

  return {
    updatedSchedule: mockBusSchedules[scheduleIndex],
    updatedSeats: mockSeatLayout.filter(seat => booking.selectedSeats.includes(seat.id)),
    transaction
  };
};

export const simulateBusMovement = (scheduleId: string) => {
  const schedule = mockBusSchedules.find(s => s.id === scheduleId);
  if (!schedule) return null;

  // Simulate movement by adding small random changes to coordinates
  const jitter = 0.01;
  const newLat = schedule.currentLocation.lat + (Math.random() - 0.5) * jitter;
  const newLng = schedule.currentLocation.lng + (Math.random() - 0.5) * jitter;

  // Update the schedule's current location
  schedule.currentLocation = { lat: newLat, lng: newLng };

  return {
    location: schedule.currentLocation,
    nextStop: schedule.nextStop
  };
};
