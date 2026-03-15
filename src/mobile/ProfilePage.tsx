import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Users,
  FileCheck,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Copy,
  QrCode,
  Share2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

// Mock user data
const userData = {
  name: "Adigun Olamide",
  email: "adigun@example.com",
  payAfricaId: "adigun.payafrica",
  phone: "+234 801 234 5678",
  kycStatus: "verified",
};

const settingsItems = [
  { id: "security", label: "Security", icon: Shield, description: "Password, 2FA, biometric" },
  { id: "beneficiaries", label: "Saved Beneficiaries", icon: Users, description: "Manage saved contacts" },
  { id: "kyc", label: "KYC Verification", icon: FileCheck, description: "Identity verification status" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Push & email preferences" },
  { id: "help", label: "Help & Support", icon: HelpCircle, description: "FAQ, contact support" },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleCopyId = () => {
    navigator.clipboard.writeText(userData.payAfricaId);
  };

  const handleShareId = () => {
    // In a real app, this would open share sheet
    console.log("Share ID");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/mobile")}
          className="text-gray-600 -ml-2"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-black mt-2">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 pb-4">
        <Card className="bg-black border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-orange-500 text-white text-xl font-bold">
                  {userData.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                <p className="text-gray-400 text-sm">{userData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PayAfrica ID Section */}
      <div className="px-4 pb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">PayAfrica ID</p>
                <p className="font-semibold text-black">{userData.payAfricaId}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopyId} className="text-orange-500">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShareId} className="text-orange-500">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate("/mobile/receive")}
                  className="text-orange-500"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Details */}
      <div className="px-4 pb-4">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-black">{userData.email}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-black">{userData.phone}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings List */}
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-black mb-3">Settings</h3>
        <Card>
          <CardContent className="p-0">
            {settingsItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => console.log(item.id)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index < settingsItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-black">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-8">
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => console.log("Logout")}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
