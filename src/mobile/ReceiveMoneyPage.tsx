import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Copy,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

// Mock user data
const userData = {
  payAfricaId: "adigun.payafrica",
};

export default function ReceiveMoneyPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(userData.payAfricaId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareId = () => {
    // In a real app, this would open share sheet
    if (navigator.share) {
      navigator.share({
        title: "My PayAfrica ID",
        text: `Send me money using my PayAfrica ID: ${userData.payAfricaId}`,
      });
    } else {
      navigator.clipboard.writeText(userData.payAfricaId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        <h1 className="text-2xl font-bold text-black mt-2">Receive Money</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col items-center">
        {/* Instructions */}
        <p className="text-gray-500 text-center mb-8">
          Share your PayAfrica ID or QR code with anyone to receive money
        </p>

        {/* QR Code Card */}
        <Card className="w-full max-w-sm mb-6">
          <CardContent className="p-6 flex flex-col items-center">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl mb-4">
              <QRCodeSVG
                value={userData.payAfricaId}
                size={180}
                level={"H"}
                includeMargin={true}
                style={{
                  width: "180px",
                  height: "180px",
                }}
              />
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              Scan this code to send money
            </p>
          </CardContent>
        </Card>

        {/* PayAfrica ID Card */}
        <Card className="w-full max-w-sm mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-2 text-center">PayAfrica ID</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold text-black">{userData.payAfricaId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full max-w-sm">
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleCopyId}
          >
            {copied ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Copy ID
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={handleShareId}
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share ID
          </Button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl w-full max-w-sm">
          <p className="text-sm text-gray-500 text-center">
            Anyone can send you money using your PayAfrica ID. 
            Funds will be received as USDC in your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
