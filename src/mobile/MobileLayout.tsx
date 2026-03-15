import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useMobileAuth } from "../hooks/useMobileAuth";
import {
  Home,
  Send,
  Wallet,
  Activity,
  User,
  Copy,
  ArrowDownToLine,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Card, CardContent } from "../components/ui/card";

// Bottom navigation tabs
const mobileNavItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/send", label: "Send", icon: Send },
  { path: "/wallet", label: "Wallet", icon: Wallet },
  { path: "/activity", label: "Activity", icon: Activity },
  { path: "/profile", label: "Profile", icon: User },
];

// Mock saved contacts
const savedContacts = [
  { id: "1", name: "Adigun", location: "Lokoja", payId: "adigun.payafrica", avatar: "A" },
  { id: "2", name: "Blessing", location: "Abuja", payId: "blessing.payafrica", avatar: "B" },
  { id: "3", name: "Samuel", location: "Accra", payId: "samuel.payafrica", avatar: "S" },
];

// Mock recent transactions
const recentTransactions = [
  { id: "1", type: "sent", name: "Adigun", amount: "₦40,000", usdAmount: "$29", time: "2 minutes ago", icon: ArrowUpRight },
  { id: "2", type: "received", name: "Samuel", amount: "$50", usdAmount: "", time: "Yesterday", icon: ArrowDownToLine },
];

// Quick actions
const quickActions = [
  { id: "send", label: "Send", icon: Send, path: "/send" },
  { id: "receive", label: "Receive", icon: ArrowDownToLine, path: "/receive" },
  { id: "add", label: "Add Money", icon: ArrowUpRight, path: "/wallet" },
  { id: "withdraw", label: "Withdraw", icon: ArrowUpRight, path: "/wallet" },
];

function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useMobileAuth();

  // Use user data or defaults
  const userName = user?.fullName || user?.email?.split('@')[0] || "User";
  const payAfricaId = user?.payAfricaId || "yourname.payafrica";
  const balance = user?.balance || 0;

  return (
    <>
      {/* Home Screen Header */}
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 text-sm">Good morning,</p>
            <h1 className="text-2xl font-bold text-black">{userName}</h1>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-orange-500 text-white font-bold">
              {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* PayAfrica ID Card */}
        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">PayAfrica ID</p>
            <p className="font-semibold text-black">{payAfricaId}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            onClick={() => navigator.clipboard.writeText(payAfricaId)}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 mb-6">
        <Card className="bg-black border-0 shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm mb-1">Total Balance</p>
            <p className="text-4xl font-bold text-white mb-4">{balance.toFixed(2)} USDC</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                <action.icon className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Contacts */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-black">Saved Contacts</h2>
          <Button variant="ghost" size="sm" className="text-orange-500">
            See all
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {savedContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => navigate(`/send?to=${contact.payId}`)}
              className="flex flex-col items-center min-w-[80px]"
            >
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-lg font-semibold text-gray-700">{contact.avatar}</span>
              </div>
              <p className="text-sm font-medium text-black">{contact.name}</p>
              <p className="text-xs text-gray-500">{contact.location}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-black">Recent Transactions</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-orange-500"
            onClick={() => navigate("/activity")}
          >
            See all
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {recentTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-4 ${
                  index < recentTransactions.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "sent" ? "bg-red-100" : "bg-green-100"
                  }`}>
                    <tx.icon className={`h-5 w-5 ${
                      tx.type === "sent" ? "text-red-500" : "text-green-500"
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      {tx.type === "sent" ? "Sent to" : "Received from"} {tx.name}
                    </p>
                    <p className="text-sm text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    tx.type === "sent" ? "text-red-500" : "text-green-500"
                  }`}>
                    {tx.type === "sent" ? "-" : "+"}{tx.amount}
                  </p>
                  {tx.usdAmount && (
                    <p className="text-sm text-gray-500">{tx.usdAmount}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function MobileLayout() {
  const location = useLocation();
  const { user } = useMobileAuth();
  
  // Check if we're on the home route (index)
  const isHomeRoute = location.pathname === "/" || location.pathname === "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        {isHomeRoute ? (
          <HomeScreen />
        ) : (
          <Outlet context={{ user, savedContacts, recentTransactions }} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-4 ${
                  isActive ? "text-orange-500" : "text-gray-500"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Re-export for use in routes
export { mobileNavItems };
export default MobileLayout;
