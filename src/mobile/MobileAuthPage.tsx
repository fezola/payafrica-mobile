import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMobileAuth } from "../hooks/useMobileAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Loader2, Phone, User, Mail, Lock, Wallet, ArrowRight, CheckCircle } from "lucide-react";

// Generate PayAfrica ID from name
function generatePayAfricaId(name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, ".");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}.${random}`;
}

// Generate mock Solana address
function generateSolanaAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "";
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

const MobileAuthPage: React.FC = () => {
  const [step, setStep] = useState<"login" | "register" | "phone" | "details" | "success">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("NG");
  const [loading, setLoading] = useState(false);
  const [displayPayAfricaId, setDisplayPayAfricaId] = useState("");
  const [displaySolanaAddress, setDisplaySolanaAddress] = useState("");
  
  const { signIn, signUp } = useMobileAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/");
    }
    setLoading(false);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setStep("details");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);

      // Sign up with the mobile auth hook
      const result = await signUp(email, password, fullName);
      
      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      // Generate PayAfrica ID and Solana address
      const newPayAfricaId = generatePayAfricaId(fullName);
      const newSolanaAddress = generateSolanaAddress();
      
      setDisplayPayAfricaId(newPayAfricaId);
      setDisplaySolanaAddress(newSolanaAddress);
      
      toast.success("Account created successfully!");
      setStep("success");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Account Created!</h1>
          <p className="text-gray-500 text-center mb-8">
            Your PayAfrica account has been created. You can now deposit money and send payments.
          </p>

          <Card className="w-full mb-6">
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Your PayAfrica ID</p>
                <p className="text-xl font-bold text-black">{displayPayAfricaId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Solana Wallet</p>
                <p className="text-sm text-black font-mono truncate">{displaySolanaAddress.substring(0, 20)}...</p>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl"
            onClick={() => navigate("/")}
          >
            Continue to App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Phone registration
  if (step === "phone") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-6 pt-12 pb-8">
          <h1 className="text-2xl font-bold text-black mb-2">Get Started</h1>
          <p className="text-gray-500">Enter your phone number to continue</p>
        </div>

        <div className="px-6">
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setStep("login")}
              className="text-gray-500 text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Registration details
  if (step === "details") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-6 pt-12 pb-8">
          <h1 className="text-2xl font-bold text-black mb-2">Complete Registration</h1>
          <p className="text-gray-500">Set up your PayAfrica account</p>
        </div>

        <div className="px-6 flex-1">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-700">Country</Label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <option value="NG">Nigeria</option>
                <option value="KE">Kenya</option>
                <option value="GH">Ghana</option>
                <option value="ZA">South Africa</option>
                <option value="UG">Uganda</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="text-gray-500 text-sm"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <img 
            src="/payafrica.png" 
            alt="PayAfrica Logo" 
            className="h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-black">PayAfrica</h1>
          <p className="text-gray-500 text-sm mt-1">Send money across Africa</p>
        </div>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="block w-full font-semibold text-orange-500 hover:underline"
              >
                Create New Account
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 py-8 bg-gray-50">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-black">PayAfrica ID</p>
              <p className="text-sm text-gray-500">Send money using your unique ID</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-500 font-bold">$</span>
            </div>
            <div>
              <p className="font-semibold text-black">USDC Wallet</p>
              <p className="text-sm text-gray-500">Funds stored securely as USDC</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-black">Local Deposits</p>
              <p className="text-sm text-gray-500">Deposit in Naira, KES, Cedis and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAuthPage;
