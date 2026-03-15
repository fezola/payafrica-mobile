import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownToLine,
  RefreshCcw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

// Mock transactions
const allTransactions = [
  { 
    id: "1", 
    type: "sent", 
    name: "Adigun Olamide", 
    payId: "adigun.payafrica",
    amount: "₦40,000", 
    usdAmount: "$29.00", 
    time: "2 minutes ago",
    status: "completed"
  },
  { 
    id: "2", 
    type: "received", 
    name: "Samuel Kwame", 
    payId: "samuel.payafrica",
    amount: "$50.00", 
    usdAmount: "", 
    time: "Yesterday",
    status: "completed"
  },
  { 
    id: "3", 
    type: "sent", 
    name: "Blessing Emmanuel", 
    payId: "blessing.payafrica",
    amount: "₦25,000", 
    usdAmount: "$18.12", 
    time: "2 days ago",
    status: "completed"
  },
  { 
    id: "4", 
    type: "converted", 
    name: "USDC to NGN", 
    payId: "",
    amount: "$100.00 → ₦138,000", 
    usdAmount: "", 
    time: "3 days ago",
    status: "completed"
  },
  { 
    id: "5", 
    type: "received", 
    name: "David Chen", 
    payId: "david.payafrica",
    amount: "$25.00", 
    usdAmount: "", 
    time: "1 week ago",
    status: "completed"
  },
  { 
    id: "6", 
    type: "sent", 
    name: "Mary Johnson", 
    payId: "mary.payafrica",
    amount: "₦15,000", 
    usdAmount: "$10.87", 
    time: "1 week ago",
    status: "completed"
  },
];

type FilterType = "all" | "sent" | "received" | "converted";

export default function ActivityPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
    { id: "converted", label: "Converted" },
  ];

  const filteredTransactions = activeFilter === "all"
    ? allTransactions
    : allTransactions.filter(tx => tx.type === activeFilter);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sent":
        return ArrowUpRight;
      case "received":
        return ArrowDownToLine;
      case "converted":
        return RefreshCcw;
      default:
        return ArrowUpRight;
    }
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
        <h1 className="text-2xl font-bold text-black mt-2">Activity</h1>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4 border-b">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <Card>
            <CardContent className="p-0">
              {filteredTransactions.map((tx, index) => {
                const Icon = getTransactionIcon(tx.type);
                return (
                  <div
                    key={tx.id}
                    className={`flex items-center justify-between p-4 ${
                      index < filteredTransactions.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tx.type === "sent" 
                          ? "bg-red-100" 
                          : tx.type === "received"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          tx.type === "sent" 
                            ? "text-red-500" 
                            : tx.type === "received"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-black truncate">
                          {tx.type === "sent" ? `Sent to ${tx.name}` : 
                           tx.type === "received" ? `Received from ${tx.name}` : 
                           tx.name}
                        </p>
                        {tx.payId && (
                          <p className="text-sm text-gray-500 truncate">{tx.payId}</p>
                        )}
                        <p className="text-xs text-gray-400">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className={`font-semibold ${
                        tx.type === "sent" ? "text-red-500" : 
                        tx.type === "received" ? "text-green-500" : 
                        "text-blue-500"
                      }`}>
                        {tx.type === "sent" ? "-" : "+"}{tx.amount}
                      </p>
                      {tx.usdAmount && (
                        <p className="text-sm text-gray-500">{tx.usdAmount}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
