
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <RegisterForm />
      </div>
    </div>
  );
}
