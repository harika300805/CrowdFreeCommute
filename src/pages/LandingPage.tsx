
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Bus, Clock } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transit-blue to-transit-teal opacity-20"></div>
            <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 h-40 bg-white animate-bus-move">
              <div className="relative w-20 h-10 mt-4 ml-4 bg-transit-blue rounded-md">
                <div className="absolute bottom-0 left-1 w-4 h-4 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-1 w-4 h-4 bg-black rounded-full"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transit-blue">
                Smart Ticketing for Smarter Commutes
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                Book bus tickets, track real-time locations, and manage your travel with our integrated virtual card system.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="text-lg py-6 px-8 bg-transit-blue hover:bg-blue-700"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg py-6 px-8 border-transit-teal text-transit-teal hover:bg-transit-teal hover:text-white"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-transit-blue">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-transit-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Virtual Card</h3>
                  <p className="text-gray-600">
                    Manage your transit card digitally. Recharge, track spending, and pay for tickets seamlessly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <Bus className="h-8 w-8 text-transit-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Ticketing</h3>
                  <p className="text-gray-600">
                    Book tickets in advance with real-time seat selection. No more waiting in queues.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-transit-amber" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
                  <p className="text-gray-600">
                    Track your bus in real-time. Know exactly when it will arrive at your stop.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-transit-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Get instant updates on seat availability, bus delays, and schedule changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Cities Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-transit-blue">
              Available in Major Indian Cities
            </h2>
            <p className="text-center text-lg mb-12 text-gray-600">
              Expanding to new locations every month
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 
                'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'].map(city => (
                <div 
                  key={city} 
                  className="bg-white border rounded-lg py-3 px-4 text-center hover:shadow-md transition-shadow"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Commute?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
              Join thousands of commuters who've switched to smart ticketing. Save time, track buses, and never worry about carrying cash again.
            </p>
            <Button 
              className="bg-transit-teal hover:bg-teal-700 text-lg py-6 px-8"
              onClick={() => navigate("/register")}
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-transit-blue mb-2">YatraPay</h3>
              <p className="text-gray-600 max-w-xs">
                Smart ticketing solutions for modern public transportation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-transit-blue">Features</a></li>
                  <li><a href="#" className="hover:text-transit-blue">Pricing</a></li>
                  <li><a href="#" className="hover:text-transit-blue">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-transit-blue">About Us</a></li>
                  <li><a href="#" className="hover:text-transit-blue">Careers</a></li>
                  <li><a href="#" className="hover:text-transit-blue">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-transit-blue">Privacy</a></li>
                  <li><a href="#" className="hover:text-transit-blue">Terms</a></li>
                  <li><a href="#" className="hover:text-transit-blue">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; 2023 YatraPay. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-transit-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-transit-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-transit-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
