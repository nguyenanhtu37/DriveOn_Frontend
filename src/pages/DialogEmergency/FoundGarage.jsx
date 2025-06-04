import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Star } from "lucide-react";

export const FoundGarage = ({ foundGarage, handleCancel }) => {
  return (
    <div className="overflow-y-auto">
      {/* Success background animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 md:w-96 md:h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 md:w-96 md:h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className=" space-y-3 ">
        {/* Success Header */}
        <Card className="backdrop-blur-xl bg-white border border-white/20 shadow-2xl">
          <CardContent className="p-4 md:p-8 text-center">
            <div className="relative mb-3 md:mb-6">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-7 h-7 md:w-10 md:h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1">
              Garage found!
            </h2>
            <p className="text-xs md:text-base text-gray-600">
              The garage has accepted your request.
            </p>
          </CardContent>
        </Card>

        {/* Garage Info */}
        <Card className="backdrop-blur-xl bg-white border border-white/20 shadow-2xl overflow-hidden">
          <div className="relative">
            <img
              src={foundGarage.interiorImages[0]}
              alt={foundGarage.name}
              className="w-full h-28 md:h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-1.5 backdrop-blur-sm bg-white/20 rounded-full px-2 py-0.5 md:px-3 md:py-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-[10px] md:text-xs font-medium">
                Đang đến
              </span>
            </div>
          </div>

          <CardContent className="p-3 md:p-6">
            <div className="flex items-start justify-between mb-2 md:mb-4">
              <div>
                <h3 className="font-bold text-base md:text-xl text-gray-800 mb-0.5">
                  {foundGarage.name}
                </h3>
                <p className="text-[10px] md:text-sm text-gray-600">
                  {foundGarage.address}
                </p>
              </div>
              <div className="flex items-center gap-1 backdrop-blur-sm bg-blue-100/80 rounded-full px-1.5 py-0.5 md:px-3 md:py-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                <span className="font-bold text-[10px] md:text-sm">
                  {foundGarage.rating}
                </span>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-yellow-50/80 rounded-lg md:rounded-2xl p-2 md:p-4 mb-3 md:mb-6">
              <h4 className="font-semibold text-[10px] md:text-sm text-yellow-800 mb-1 md:mb-2">
                Notes
              </h4>
              <p className="text-[10px] md:text-sm text-yellow-700 font-medium">
                The garage has agreed to accept your request. Please proactively
                contact the garage via the phone number below for the fastest
                support.
                <br /> <br /> 📞 Garage phone number: {foundGarage.phone}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <Button
                onClick={() => window.open(`tel:${foundGarage.phone}`)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg md:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 text-xs md:text-base py-1.5 md:py-2"
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Call now
              </Button>
              <Button
                variant="outline"
                className="rounded-lg md:rounded-2xl backdrop-blur-sm bg-white/50 text-xs md:text-base py-1.5 md:py-2"
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
