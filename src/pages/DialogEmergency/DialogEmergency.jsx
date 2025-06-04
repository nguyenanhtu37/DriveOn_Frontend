import { useCancelRescueRequest } from "@/app/stores/entity/emergency";
import {
  useCloseDialog,
  useDialogData,
  useDialogOpen,
} from "@/app/stores/view/dialog";
import { useUserStore } from "@/app/stores/view/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FoundGarage } from "./FoundGarage";

const DialogEmergency = () => {
  const [searchProgress, setSearchProgress] = useState(0);
  const isOpen = useDialogOpen("DialogEmergency");
  const [foundGarage, setFoundGarage] = useState();
  const data = useDialogData("DialogEmergency");
  const { socket } = useUserStore();

  const mutation = useCancelRescueRequest();

  const handleCancel = () => {
    if (data) {
      mutation.mutate(
        { emergencyId: data?._id },
        {
          onSuccess: () => {
            setSearchProgress(0);
          },
          onError: (error) => {
            console.error("Error canceling rescue request:", error);
          },
        }
      );
    }
    setSearchProgress(0);
    setFoundGarage(null);
    closeDialog("DialogEmergency");
  };

  const closeDialog = useCloseDialog();
  useEffect(() => {
    if (!data) return;

    const totalSteps = 100;
    const totalDuration = 2 * 60 * 1000;
    const intervalTime = totalDuration / totalSteps;

    const interval = setInterval(() => {
      if (foundGarage) {
        clearInterval(interval);
        return;
      }
      setSearchProgress((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          if (data) {
            mutation.mutate(
              { emergencyId: data._id },
              {
                onSuccess: () => {
                  setSearchProgress(0);
                  setFoundGarage(null);
                  closeDialog("DialogEmergency");
                },
                onError: (error) => {
                  console.error("Error canceling rescue request:", error);
                },
              }
            );
          }
          return totalSteps;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [closeDialog, data, foundGarage, mutation]);

  useEffect(() => {
    if (!socket) return;

    socket.on("acceptedRescue", (data) => {
      setFoundGarage(data.garage);
    });

    return () => {
      socket.off("acceptedRescue");
    };
  }, [socket]);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        hiddenClose={true}
        className="p-0 max-w-xl bg-transparent outline-none border-none"
      >
        {foundGarage ? (
          <FoundGarage foundGarage={foundGarage} handleCancel={handleCancel} />
        ) : (
          <div>
            <Card className="w-full bg-white border border-white/20 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping opacity-20"></div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Looking for garage...
                </h2>
                <p className="text-gray-600 mb-6">
                  Analyzing and connecting to the best garage
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${searchProgress}%` }}
                  ></div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { text: "Scan garage within 10km radius...", delay: 0 },
                    { text: "Check operating status...", delay: 1000 },
                    {
                      text: "Waiting for Garage to accept request...",
                      delay: 2000,
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 text-left transition-opacity duration-500 ${
                        searchProgress > index * 33
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          searchProgress > index * 33
                            ? "bg-gradient-to-r from-orange-500 to-red-500 animate-pulse"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600">{step.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl  bg-white/50"
                  onClick={handleCancel}
                >
                  Cancel request
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogEmergency;
