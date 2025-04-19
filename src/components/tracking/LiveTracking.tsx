
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBusRoutes, mockBusSchedules } from "@/data/mockData";
import { Map, MapPin, Search } from "lucide-react";

export default function LiveTracking() {
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRoutes, setFilteredRoutes] = useState(mockBusRoutes);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [busLocation, setBusLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockBusRoutes.filter(route => 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes(mockBusRoutes);
    }
  }, [searchTerm]);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    const busesOnRoute = mockBusSchedules.filter(schedule => schedule.routeId === routeId);
    if (busesOnRoute.length > 0) {
      setSelectedBus(busesOnRoute[0]);
      setBusLocation(busesOnRoute[0].currentLocation);
    } else {
      setSelectedBus(null);
      setBusLocation(null);
    }
  };

  const refreshLocation = () => {
    if (!selectedBus) return;
    
    setIsLoading(true);
    
    // Simulate API call to get updated location
    setTimeout(() => {
      // Randomly adjust the location slightly for simulation
      const jitter = 0.01;
      const newLat = selectedBus.currentLocation.lat + (Math.random() - 0.5) * jitter;
      const newLng = selectedBus.currentLocation.lng + (Math.random() - 0.5) * jitter;
      
      setBusLocation({ lat: newLat, lng: newLng });
      setIsLoading(false);
    }, 1000);
  };

  // Simulate map display with a placeholder
  const renderMapPlaceholder = () => {
    if (!busLocation) return null;
    
    return (
      <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 bg-gray-200 opacity-50">
          <div className="grid grid-cols-12 h-full">
            {Array(12).fill(0).map((_, colIndex) => (
              <div key={`col-${colIndex}`} className="border-r border-gray-300">
                {Array(12).fill(0).map((_, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="border-b border-gray-300 h-8"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Route path simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-1 bg-transit-blue rounded opacity-50"></div>
        </div>
        
        {/* Origin and destination markers */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <div className="bg-transit-blue w-4 h-4 rounded-full"></div>
          </div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
            {mockBusRoutes.find(route => route.id === selectedRoute)?.origin}
          </div>
        </div>
        
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <div className="bg-transit-teal w-4 h-4 rounded-full"></div>
          </div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
            {mockBusRoutes.find(route => route.id === selectedRoute)?.destination}
          </div>
        </div>
        
        {/* Bus icon */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-transit-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
            Bus {selectedBus?.busNumber}
          </div>
        </div>
        
        {/* Map attribution */}
        <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-white bg-opacity-70 px-2 py-0.5 rounded">
          YatraPay Maps
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-transit-blue">Live Bus Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search and select panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Find Your Bus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="search">Search by route, origin or destination</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="e.g. Delhi, Mumbai, Express"
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Select Route</Label>
                <Select value={selectedRoute} onValueChange={handleRouteSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a route" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredRoutes.map(route => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedBus && (
                <div className="mt-6 pt-4 border-t">
                  <div className="font-medium mb-2">Bus Details</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Bus Number:</div>
                    <div className="font-medium">{selectedBus.busNumber}</div>
                    
                    <div className="text-muted-foreground">Departure:</div>
                    <div className="font-medium">{selectedBus.departureTime}</div>
                    
                    <div className="text-muted-foreground">Arrival:</div>
                    <div className="font-medium">{selectedBus.arrivalTime}</div>
                    
                    <div className="text-muted-foreground">Next Stop:</div>
                    <div className="font-medium">{selectedBus.nextStop}</div>
                    
                    <div className="text-muted-foreground">Available Seats:</div>
                    <div className="font-medium">{selectedBus.availableSeats} / {selectedBus.totalSeats}</div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-transit-blue hover:bg-blue-700"
                    onClick={refreshLocation}
                    disabled={isLoading}
                  >
                    {isLoading ? "Refreshing..." : "Refresh Location"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Map container */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2" /> 
                Live Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBus ? (
                renderMapPlaceholder()
              ) : (
                <div className="h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Select a route to view live location</p>
                </div>
              )}
              
              {selectedBus && (
                <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="font-medium mb-1">Current Status</div>
                  <div className="text-muted-foreground">
                    The bus is currently {selectedBus.nextStop ? `approaching ${selectedBus.nextStop}` : "en route"}.
                    Estimated arrival at destination: {selectedBus.arrivalTime}.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
