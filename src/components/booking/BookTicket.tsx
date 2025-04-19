import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBusRoutes, mockBusSchedules, mockSeatLayout } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, Search } from "lucide-react";

type Seat = {
  id: string;
  isBooked: boolean;
  price: number;
  type: string;
};

export default function BookTicket() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [step, setStep] = useState<'search' | 'select-seat' | 'confirmation'>('search');
  
  const { toast } = useToast();
  const { user, updateCardBalance } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Set today's date as default
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleSearch = () => {
    if (!fromCity || !toCity || !date) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all search fields",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter routes based on search criteria
      // In a real app, this would be a backend search
      const results = mockBusRoutes.filter(route => {
        return route.origin.toLowerCase().includes(fromCity.toLowerCase()) || 
               route.destination.toLowerCase().includes(toCity.toLowerCase());
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    
    // Find schedules for this route
    const schedules = mockBusSchedules.filter(schedule => schedule.routeId === routeId);
    
    if (schedules.length > 0) {
      setSelectedSchedule(schedules[0]);
      setSeats(mockSeatLayout); // In a real app, you'd fetch the seat layout for this specific bus
      setStep('select-seat');
    } else {
      toast({
        variant: "destructive",
        title: "No schedules found",
        description: "No schedules are available for this route",
      });
    }
  };

  const toggleSeatSelection = (seatId: string, isBooked: boolean) => {
    if (isBooked) return; // Cannot select already booked seats
    
    setSelectedSeats(prev => {
      // If already selected, remove it
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      // Otherwise add it to selection
      return [...prev, seatId];
    });
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast({
        variant: "destructive",
        title: "No seats selected",
        description: "Please select at least one seat",
      });
      return;
    }
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to book tickets",
      });
      navigate("/login");
      return;
    }
    
    const route = mockBusRoutes.find(route => route.id === selectedRoute);
    const totalPrice = selectedSeats.length * (route?.fare || 0);
    
    if (user.cardBalance < totalPrice) {
      toast({
        variant: "destructive",
        title: "Insufficient balance",
        description: `Your card balance is ₹${user.cardBalance}, but the total cost is ₹${totalPrice}`,
      });
      return;
    }
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user's card balance
      const newBalance = user.cardBalance - totalPrice;
      updateCardBalance(newBalance);
      
      // Mark seats as booked
      setSeats(prev => prev.map(seat => {
        if (selectedSeats.includes(seat.id)) {
          return { ...seat, isBooked: true };
        }
        return seat;
      }));
      
      // Update available seats in schedule
      if (selectedSchedule) {
        const updatedSchedule = {
          ...selectedSchedule,
          availableSeats: selectedSchedule.availableSeats - selectedSeats.length
        };
        setSelectedSchedule(updatedSchedule);
      }
      
      toast({
        title: "Booking successful",
        description: `You have successfully booked ${selectedSeats.length} seat(s) for ₹${totalPrice}`,
      });
      
      setStep('confirmation');
      setIsBooking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-transit-blue">Book Bus Ticket</h1>
      
      <Tabs defaultValue="one-way" className="mb-6">
        <TabsList>
          <TabsTrigger value="one-way">One Way</TabsTrigger>
          <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {step === 'search' && (
        <>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="from" className="mb-1 block">From</Label>
                  <div className="flex">
                    <MapPin className="text-transit-blue mr-2 h-5 w-5 self-center" />
                    <Input 
                      id="from"
                      placeholder="Enter departure city"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="to" className="mb-1 block">To</Label>
                  <div className="flex">
                    <MapPin className="text-transit-blue mr-2 h-5 w-5 self-center" />
                    <Input 
                      id="to"
                      placeholder="Enter destination city"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="date" className="mb-1 block">Date</Label>
                  <div className="flex">
                    <Calendar className="text-transit-blue mr-2 h-5 w-5 self-center" />
                    <Input 
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full md:w-auto bg-transit-blue hover:bg-blue-700"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> Search Buses
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {searchResults.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-sm bg-transit-blue text-white px-2 py-1 rounded-full mr-2">
                  {searchResults.length}
                </span>
                Available Routes
              </h2>
              
              <div className="space-y-4">
                {searchResults.map(route => {
                  const schedule = mockBusSchedules.find(s => s.routeId === route.id);
                  
                  return (
                    <Card 
                      key={route.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleRouteSelect(route.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold text-lg">{route.name}</h3>
                            <div className="text-sm text-muted-foreground mb-2">
                              {route.distance} • {route.duration}
                            </div>
                            
                            <div className="flex items-center">
                              <div className="flex flex-col items-center">
                                <span className="bg-transit-blue w-3 h-3 rounded-full"></span>
                                <span className="bg-gray-300 w-0.5 h-10"></span>
                                <span className="bg-transit-teal w-3 h-3 rounded-full"></span>
                              </div>
                              
                              <div className="ml-3">
                                <div className="flex items-center">
                                  <span className="font-medium">{route.origin}</span>
                                  {schedule && (
                                    <span className="ml-2 text-sm text-gray-500">
                                      <Clock className="inline h-3 w-3 mr-1" />
                                      {schedule.departureTime}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center mt-4">
                                  <span className="font-medium">{route.destination}</span>
                                  {schedule && (
                                    <span className="ml-2 text-sm text-gray-500">
                                      <Clock className="inline h-3 w-3 mr-1" />
                                      {schedule.arrivalTime}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="text-lg font-bold text-transit-blue">₹{route.fare}</div>
                            {schedule && (
                              <div className="text-sm mb-3">
                                <span className={`font-medium ${schedule.availableSeats > 5 ? 'text-green-600' : 'text-orange-500'}`}>
                                  {schedule.availableSeats} seats
                                </span>
                                <span className="text-gray-400"> available</span>
                              </div>
                            )}
                            <Button className="bg-transit-teal hover:bg-teal-700">
                              Select <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
      
      {step === 'select-seat' && selectedSchedule && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Seats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gray-100 rounded-lg inline-block text-center">
                    <div className="w-20 h-10 bg-gray-300 rounded-t-xl mx-auto mb-8 flex items-center justify-center text-gray-600 font-medium">
                      Driver
                    </div>
                    
                    {/* Seat layout grid */}
                    <div className="grid grid-cols-4 gap-1">
                      {seats.map((seat) => (
                        <div
                          key={seat.id}
                          onClick={() => toggleSeatSelection(seat.id, seat.isBooked)}
                          className={`seat ${
                            seat.isBooked
                              ? 'seat-booked'
                              : selectedSeats.includes(seat.id)
                              ? 'seat-selected'
                              : 'seat-available'
                          }`}
                        >
                          {seat.id}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-white border-2 border-transit-teal mr-2"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-transit-teal mr-2"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-gray-200 border-2 border-gray-300 mr-2"></div>
                    <span className="text-sm">Booked</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRoute && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">
                      {mockBusRoutes.find(route => route.id === selectedRoute)?.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-4">
                      {date} • {selectedSchedule.departureTime} - {selectedSchedule.arrivalTime}
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <div className="bg-transit-blue w-3 h-3 rounded-full"></div>
                      <div className="ml-2 font-medium">
                        {mockBusRoutes.find(route => route.id === selectedRoute)?.origin}
                      </div>
                    </div>
                    <div className="ml-1.5 h-6 w-0.5 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className="bg-transit-teal w-3 h-3 rounded-full"></div>
                      <div className="ml-2 font-medium">
                        {mockBusRoutes.find(route => route.id === selectedRoute)?.destination}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Selected Seats</span>
                    <span>
                      {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-medium">
                    <span>Fare × {selectedSeats.length}</span>
                    <span>
                      ₹{(mockBusRoutes.find(route => route.id === selectedRoute)?.fare || 0) * selectedSeats.length}
                    </span>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    {user ? (
                      <div>Your card balance: <span className="font-medium">₹{user.cardBalance}</span></div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/login")}
                      >
                        Login to book
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-transit-blue hover:bg-blue-700"
                    disabled={selectedSeats.length === 0 || isBooking || !user}
                    onClick={handleBooking}
                  >
                    {isBooking ? "Processing..." : `Book Ticket (₹${(mockBusRoutes.find(route => route.id === selectedRoute)?.fare || 0) * selectedSeats.length})`}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setStep('search')}
                  >
                    Go Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {step === 'confirmation' && selectedSchedule && (
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-1">Booking Confirmed!</h2>
              <p className="text-gray-500">Your ticket has been successfully booked.</p>
            </div>
            
            {selectedRoute && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg">
                  {mockBusRoutes.find(route => route.id === selectedRoute)?.name}
                </h3>
                <div className="text-sm text-gray-500 mb-4">
                  {date} • {selectedSchedule.departureTime} - {selectedSchedule.arrivalTime}
                </div>
                
                <div className="flex items-center mb-1">
                  <div className="bg-transit-blue w-3 h-3 rounded-full"></div>
                  <div className="ml-2 font-medium">
                    {mockBusRoutes.find(route => route.id === selectedRoute)?.origin}
                  </div>
                </div>
                <div className="ml-1.5 h-6 w-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="bg-transit-teal w-3 h-3 rounded-full"></div>
                  <div className="ml-2 font-medium">
                    {mockBusRoutes.find(route => route.id === selectedRoute)?.destination}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Bus Number</span>
                    <span className="font-medium">{selectedSchedule.busNumber}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Seats</span>
                    <span className="font-medium">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Amount Paid</span>
                    <span className="font-medium">₹{(mockBusRoutes.find(route => route.id === selectedRoute)?.fare || 0) * selectedSeats.length}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              <Button onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep('search');
                  setSelectedRoute(null);
                  setSelectedSchedule(null);
                  setSelectedSeats([]);
                }}
              >
                Book Another Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
