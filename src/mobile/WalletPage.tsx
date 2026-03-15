import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpRight,
  RefreshCcw,
  Plus,
  CreditCard,
  Smartphone,
  Building,
  DollarSign,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

// Mock wallet data
const walletData = {
  balance: 245.23,
  assets: [
    { id: "usdc", name: "USD Coin", symbol: "USDC", balance: 245.23, value: 245.23, change: 0.05 },
  ],
};

export default function WalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"main" | "deposit" | "withdraw">("main");

  // Deposit methods
  const depositMethods = [
    { id: "bank", name: "Bank Transfer", icon: Building, description: "Instant transfer from your bank" },
    { id: "card", name: "Debit Card", icon: CreditCard, description: "Pay with Visa or Mastercard" },
    { id: "mobile", name: "Mobile Money", icon: Smartphone, description: "MTN, Airtel, Vodacom" },
  ];

  // Mock deposit account
  const depositAccount = {
    bank: "First Bank of Nigeria",
    accountNumber: "308****8921",
    accountName: "PayAfrica Technologies",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-600 -ml-2"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-black mt-2">Wallet</h1>
      </div>

      {/* Main Wallet View */}
      {activeTab === "main" && (
        <>
          {/* Balance Card */}
          <div className="px-4 mb-6">
            <Card className="bg-black border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-1">USDC Balance</p>
                <p className="text-4xl font-bold text-white mb-4">{walletData.balance.toFixed(2)}</p>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setActiveTab("deposit")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 bg-transparent text-white hover:bg-gray-800"
                    onClick={() => setActiveTab("withdraw")}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="px-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab("deposit")}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Money</span>
              </button>
              <button
                onClick={() => setActiveTab("withdraw")}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowDownToLine className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Withdraw</span>
              </button>
              <button
                onClick={() => navigate("/wallet")}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <RefreshCcw className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Convert</span>
              </button>
            </div>
          </div>

          {/* Assets Section */}
          <div className="px-4">
            <h2 className="text-lg font-semibold text-black mb-3">Assets</h2>
            <Card>
              <CardContent className="p-0">
                {walletData.assets.map((asset, index) => (
                  <div
                    key={asset.id}
                    className={`flex items-center justify-between p-4 ${
                      index < walletData.assets.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-black">{asset.name}</p>
                        <p className="text-sm text-gray-500">{asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-black">{asset.balance.toFixed(2)}</p>
                      <p className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {asset.change >= 0 ? "+" : ""}{asset.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Deposit View */}
      {activeTab === "deposit" && (
        <>
          <div className="px-4 pb-4">
            <h2 className="text-lg font-semibold text-black mb-4">Add Money</h2>
            
            {/* Deposit Methods */}
            <div className="space-y-3">
              {depositMethods.map((method) => (
                <button
                  key={method.id}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-black">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="px-4 pt-4 border-t">
            <h3 className="font-semibold text-black mb-3">Bank Transfer Details</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                  <p className="font-semibold text-black">{depositAccount.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-black">{depositAccount.accountNumber}</p>
                    <Button variant="ghost" size="sm" className="text-orange-500">
                      Copy
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Name</p>
                  <p className="font-semibold text-black">{depositAccount.accountName}</p>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Transfers are converted to USDC automatically
            </p>
          </div>
        </>
      )}

      {/* Withdraw View */}
      {activeTab === "withdraw" && (
        <div className="px-4">
          <h2 className="text-lg font-semibold text-black mb-4">Withdraw</h2>
          
          <div className="mb-6">
            <label className="text-sm text-gray-500 mb-2 block">Amount (USDC)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
              <Input
                type="text"
                placeholder="0.00"
                className="pl-10 text-3xl font-bold h-16 bg-gray-50 border-gray-200 rounded-xl"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Available: {walletData.balance.toFixed(2)} USDC</p>
          </div>

          {/* Withdrawal Methods */}
          <h3 className="font-semibold text-black mb-3">Withdraw to</h3>
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-black">Bank Account</p>
                <p className="text-sm text-gray-500">First Bank - 308****8921</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-black">Mobile Money</p>
                <p className="text-sm text-gray-500">MTN, Airtel, Vodacom</p>
              </div>
            </button>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
          >
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Withdraw
          </Button>
        </div>
      )}
    </div>
  );
}
