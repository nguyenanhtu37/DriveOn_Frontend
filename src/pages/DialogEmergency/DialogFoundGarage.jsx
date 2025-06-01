import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Star } from "lucide-react";

export const FoundGarage = ({ foundGarage, handleCancel }) => {
  return (
    <div className=" flex items-center justify-center ">
      {/* Success background animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="w-full space-y-6">
        {/* Success Header */}
        <Card className="backdrop-blur-xl bg-white/60 border border-white/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Garage found!
            </h2>
            <p className="text-gray-600">
              The garage has accepted your request.
            </p>
          </CardContent>
        </Card>

        {/* Garage Info */}
        <Card className="backdrop-blur-xl bg-white/60 border border-white/20 shadow-2xl overflow-hidden">
          <div className="relative">
            <img
              src={foundGarage.interiorImages[0]}
              alt={foundGarage.name}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="absolute top-4 right-4 flex items-center gap-2 backdrop-blur-sm bg-white/20 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Đang đến</span>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-1">
                  {foundGarage.name}
                </h3>
                <p className="text-gray-600 text-sm">{foundGarage.address}</p>
              </div>
              <div className="flex items-center gap-1 backdrop-blur-sm bg-blue-100/80 rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-sm">{foundGarage.rating}</span>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-yellow-50/80 rounded-2xl p-4 mb-6">
              <h4 className="font-semibold text-sm text-yellow-800 mb-2">
                Notes
              </h4>
              <p className="text-sm text-yellow-700 font-medium">
                The garage has agreed to accept your request. Please proactively
                contact the garage via the phone number below for the fastest
                support.
                <br /> <br /> 📞 Garage phone number: {foundGarage.phone}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => window.open(`tel:${foundGarage.phone}`)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call now
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl backdrop-blur-sm bg-white/50"
                onClick={handleCancel}
              >
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
