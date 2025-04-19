
import VirtualCard from "@/components/card/VirtualCard";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function CardPage() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <VirtualCard />
      </div>
    </div>
  );
}
