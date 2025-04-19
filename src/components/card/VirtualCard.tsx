import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { mockTransactionHistory } from "@/data/mockData";
import { ArrowUpRight, CreditCard, IndianRupee, RefreshCw } from "lucide-react";

export default function VirtualCard() {
  const { user, updateCardBalance } = useAuth();
  const { toast } = useToast();
  const [rechargeAmount, setRechargeAmount] = useState<number>(100);
  const [isRecharging, setIsRecharging] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      const latestTransactions = mockTransactionHistory
        .filter(txn => txn.userId === user.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setRecentTransactions(latestTransactions);
    }, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, [user]);

  const handleRecharge = () => {
    if (rechargeAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
      });
      return;
    }
    
    setIsRecharging(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const newBalance = user.cardBalance + rechargeAmount;
        updateCardBalance(newBalance);
        
        toast({
          title: "Recharge successful",
          description: `₹${rechargeAmount} has been added to your card`,
        });
        
        setRechargeAmount(100);
      }
      setIsRecharging(false);
    }, 1500);
  };

  // Filter transactions for the current user
  const userTransactions = user 
    ? mockTransactionHistory
        .filter(txn => txn.userId === user.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-transit-blue">YatraPay Virtual Card</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card Display */}
        <div>
          <div className="card-gradient rounded-2xl shadow-lg p-6 text-white mb-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -right-5 -bottom-10 w-32 h-32 bg-white/10 rounded-full"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-sm font-medium opacity-80">YatraPay Transit Card</h3>
                <p className="text-3xl font-bold mt-1">₹{user?.cardBalance}</p>
              </div>
              <CreditCard className="h-8 w-8" />
            </div>
            
            <div className="mb-6">
              <p className="text-sm opacity-80">Card Holder</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm opacity-80">Card ID</p>
                <p className="font-medium">{user?.id.substring(0, 8)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Valid Thru</p>
                <p className="font-medium">04/28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold mb-3 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Quick Recharge
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Button variant="outline" onClick={() => setRechargeAmount(100)}>₹100</Button>
              <Button variant="outline" onClick={() => setRechargeAmount(200)}>₹200</Button>
              <Button variant="outline" onClick={() => setRechargeAmount(500)}>₹500</Button>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number" 
                  value={rechargeAmount} 
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  className="pl-8"
                  min={1}
                />
              </div>
              <Button 
                className="bg-transit-blue hover:bg-blue-700"
                onClick={handleRecharge}
                disabled={isRecharging}
              >
                {isRecharging ? "Processing..." : "Recharge"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="recharges">Recharges</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>
            
            <Card>
              <CardContent className="p-6">
                <TabsContent value="all" className="space-y-4 mt-0">
                  {userTransactions.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No transactions found.</p>
                  ) : (
                    userTransactions.map(txn => (
                      <div key={txn.id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="font-medium flex items-center">
                            {txn.type === 'recharge' ? (
                              <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <CreditCard className="h-4 w-4 mr-2 text-transit-blue" />
                            )}
                            {txn.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(txn.date).toLocaleString()}
                          </div>
                        </div>
                        <div className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-700'}`}>
                          {txn.amount > 0 ? '+' : ''}{txn.amount} ₹
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="recharges" className="space-y-4 mt-0">
                  {userTransactions.filter(txn => txn.type === 'recharge').length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No recharges found.</p>
                  ) : (
                    userTransactions
                      .filter(txn => txn.type === 'recharge')
                      .map(txn => (
                        <div key={txn.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <div className="font-medium flex items-center">
                              <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                              {txn.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(txn.date).toLocaleString()}
                            </div>
                          </div>
                          <div className="font-semibold text-green-600">
                            +{txn.amount} ₹
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="tickets" className="space-y-4 mt-0">
                  {userTransactions.filter(txn => txn.type === 'ticket').length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No ticket purchases found.</p>
                  ) : (
                    userTransactions
                      .filter(txn => txn.type === 'ticket')
                      .map(txn => (
                        <div key={txn.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <div className="font-medium flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-transit-blue" />
                              {txn.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(txn.date).toLocaleString()}
                            </div>
                          </div>
                          <div className="font-semibold text-gray-700">
                            {txn.amount} ₹
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
