import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

// Mock saved beneficiaries
const savedBeneficiaries = [
  { id: "1", name: "Adigun Olamide", payId: "adigun.payafrica", location: "Lokoja", avatar: "A" },
  { id: "2", name: "Blessing Emmanuel", payId: "blessing.payafrica", location: "Abuja", avatar: "B" },
  { id: "3", name: "Samuel Kwame", payId: "samuel.payafrica", location: "Accra", avatar: "S" },
  { id: "4", name: "Mary Johnson", payId: "mary.payafrica", location: "Lagos", avatar: "M" },
  { id: "5", name: "David Chen", payId: "david.payafrica", location: "Nairobi", avatar: "D" },
];

export default function SendMoneyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipientParam = searchParams.get("to");

  const [searchQuery, setSearchQuery] = useState(recipientParam || "");
  const [selectedRecipient, setSelectedRecipient] = useState<typeof savedBeneficiaries[0] | null>(
    recipientParam ? savedBeneficiaries.find(b => b.payId === recipientParam) || null : null
  );
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate USD equivalent (simplified rate: 1 USD = 1380 NGN)
  const ngnAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const usdAmount = ngnAmount / 1380;
  const fee = ngnAmount > 0 ? 100 : 0;

  // Format number with commas
  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9]/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatNumber(e.target.value));
  };

  const handleSelectRecipient = (beneficiary: typeof savedBeneficiaries[0]) => {
    setSelectedRecipient(beneficiary);
    setSearchQuery("");
  };

  const handleSend = () => {
    if (!selectedRecipient || !amount) return;
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const filteredBeneficiaries = savedBeneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.payId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowSuccess(false);
              setSelectedRecipient(null);
              setAmount("");
              setMessage("");
            }}
            className="text-gray-600 -ml-2"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Payment Sent!</h1>
          <p className="text-gray-500 text-center mb-8">
            Your payment of {ngnAmount.toLocaleString()} NGN has been sent successfully.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 w-full mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Recipient receives</span>
              <span className="font-semibold text-black">{usdAmount.toFixed(2)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fee</span>
              <span className="font-semibold text-black">₦{fee}</span>
            </div>
          </div>
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => navigate("/mobile")}
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  // Confirmation Screen
  if (showConfirmation && selectedRecipient) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmation(false)}
            className="text-gray-600 -ml-2"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
        </div>

        <div className="flex-1 px-4">
          <h1 className="text-2xl font-bold text-black mb-6">Confirm Payment</h1>

          {/* Recipient Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">
                    {selectedRecipient.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-black">{selectedRecipient.name}</p>
                  <p className="text-sm text-gray-500">{selectedRecipient.payId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Details */}
          <Card className="mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount sent</span>
                <span className="font-semibold text-black">₦{parseFloat(amount.replace(/,/g, "")).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient receives</span>
                <span className="font-semibold text-green-600">{usdAmount.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee</span>
                <span className="font-semibold text-black">₦{fee}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-black">Total</span>
                <span className="font-bold text-black">₦{(parseFloat(amount.replace(/,/g, "")) + fee).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {message && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Message</p>
              <p className="text-black">{message}</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    );
  }

  // Main Send Money Screen
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
        <h1 className="text-2xl font-bold text-black mt-2">Send Money</h1>
      </div>

      {/* Search Input */}
      {!selectedRecipient && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter PayAfrica ID or username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Selected Recipient */}
      {selectedRecipient && (
        <div className="px-4 pb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-semibold text-gray-700">
                      {selectedRecipient.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">{selectedRecipient.name}</p>
                    <p className="text-sm text-gray-500">{selectedRecipient.payId}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRecipient(null)}
                  className="text-gray-500"
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Saved Beneficiaries List */}
      {!selectedRecipient && searchQuery === "" && (
        <div className="flex-1 px-4">
          <h2 className="text-lg font-semibold text-black mb-3">Saved Beneficiaries</h2>
          <div className="space-y-2">
            {savedBeneficiaries.map((beneficiary) => (
              <button
                key={beneficiary.id}
                onClick={() => handleSelectRecipient(beneficiary)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-semibold text-gray-700">{beneficiary.avatar}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-black">{beneficiary.name}</p>
                  <p className="text-sm text-gray-500">{beneficiary.payId}</p>
                </div>
                <span className="text-sm text-gray-400">{beneficiary.location}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {!selectedRecipient && searchQuery !== "" && filteredBeneficiaries.length > 0 && (
        <div className="flex-1 px-4">
          <div className="space-y-2">
            {filteredBeneficiaries.map((beneficiary) => (
              <button
                key={beneficiary.id}
                onClick={() => handleSelectRecipient(beneficiary)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-semibold text-gray-700">{beneficiary.avatar}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-black">{beneficiary.name}</p>
                  <p className="text-sm text-gray-500">{beneficiary.payId}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Amount Input */}
      {selectedRecipient && (
        <div className="flex-1 px-4">
          <div className="mb-6">
            <label className="text-sm text-gray-500 mb-2 block">Amount in Naira</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₦</span>
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="pl-10 text-3xl font-bold h-16 bg-gray-50 border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Conversion Preview */}
          {ngnAmount > 0 && (
            <Card className="mb-6 bg-gray-50 border-0">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">You send</span>
                  <span className="font-semibold text-black">₦{ngnAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recipient receives</span>
                  <span className="font-semibold text-green-600">{usdAmount.toFixed(2)} USDC</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message Input */}
          <div className="mb-6">
            <label className="text-sm text-gray-500 mb-2 block">Message (optional)</label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="For the project work"
              className="h-12 bg-gray-50 border-gray-200 rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Send Button */}
      {selectedRecipient && (
        <div className="p-4 border-t">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
            onClick={handleSend}
            disabled={!amount || ngnAmount <= 0}
          >
            <Send className="h-5 w-5 mr-2" />
            Send Payment
          </Button>
        </div>
      )}
    </div>
  );
}
