
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Bus, History } from "lucide-react";
import { mockTransactionHistory, mockBusSchedules, mockBusRoutes } from "@/data/mockData";

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [upcomingBuses, setUpcomingBuses] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Filter transactions for the current user
      const userTransactions = mockTransactionHistory
        .filter(txn => txn.userId === user.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      
      setRecentTransactions(userTransactions);
      
      // Get upcoming bus schedules
      const upcoming = mockBusSchedules
        .slice(0, 3)
        .map(schedule => {
          const route = mockBusRoutes.find(route => route.id === schedule.routeId);
          return {
            ...schedule,
            routeName: route?.name,
            origin: route?.origin,
            destination: route?.destination
          };
        });
      
      setUpcomingBuses(upcoming);
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-transit-blue">Hello, {user?.name}!</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/card")}>
          <CardContent className="p-6 flex flex-col items-center">
            <CreditCard className="h-12 w-12 text-transit-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Virtual Card</h3>
            <div className="text-2xl font-bold text-transit-teal mb-3">₹{user?.cardBalance}</div>
            <Button className="w-full bg-transit-blue hover:bg-blue-700">Manage Card</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/booking")}>
          <CardContent className="p-6 flex flex-col items-center">
            <Bus className="h-12 w-12 text-transit-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Book Ticket</h3>
            <p className="text-gray-500 mb-3 text-center">Quick & easy ticket booking</p>
            <Button className="w-full bg-transit-blue hover:bg-blue-700">Search Routes</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/live-tracking")}>
          <CardContent className="p-6 flex flex-col items-center">
            <MapPin className="h-12 w-12 text-transit-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Tracking</h3>
            <p className="text-gray-500 mb-3 text-center">Track your bus in real-time</p>
            <Button className="w-full bg-transit-blue hover:bg-blue-700">Track Now</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions & Upcoming Buses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <History className="h-5 w-5 mr-2 text-transit-blue" />
              <CardTitle>Recent Transactions</CardTitle>
            </div>
            <Button variant="ghost" onClick={() => navigate("/card")}>View All</Button>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">No recent transactions.</p>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map(txn => (
                  <div key={txn.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">{txn.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-700'}`}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount} ₹
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Bus className="h-5 w-5 mr-2 text-transit-blue" />
              <CardTitle>Upcoming Buses</CardTitle>
            </div>
            <Button variant="ghost" onClick={() => navigate("/booking")}>Book Ticket</Button>
          </CardHeader>
          <CardContent>
            {upcomingBuses.map(bus => (
              <div key={bus.id} className="mb-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{bus.routeName}</span>
                  <span className="bg-transit-blue text-white text-xs px-2 py-1 rounded-full">
                    {bus.availableSeats} seats
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{bus.origin}</span>
                  <span>→</span>
                  <span>{bus.destination}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Bus: {bus.busNumber}</span>
                  <span>{bus.departureTime} - {bus.arrivalTime}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
