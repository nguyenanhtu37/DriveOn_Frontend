import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGarageDetail } from "@/app/stores/entity/garage";

export default function ExpiredDate() {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);
  const targetDate = useMemo(
    () => new Date(garage.data.expiredTime),
    [garage.data]
  );

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]); // targetDate is now memoized and won't cause unnecessary re-renders

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {isExpired ? (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">It's Here!</h3>
            <p className="text-xl text-gray-500 mb-8">
              Garage Pro has expired. Please re-subscribe to continue optimizing
              your garage operations.
            </p>
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => navigate("/garageProUpgrade")}
            >
              Upgrade GaragePro now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-tight">
              Expired Date
            </h1>
            <p className="text-gray-500 text-center max-w-2xl mb-12">
              Your GaragePro package is a subscription-based service and will
              expire once the countdown ends.
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 mb-12">
              <CountdownCard
                value={timeLeft.days}
                label="DAYS"
                icon={<Calendar className="h-5 w-5 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.hours}
                label="HOURS"
                icon={<Clock className="h-5 w-5 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.minutes}
                label="MINUTES"
                icon={<Clock className="h-5 w-5 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.seconds}
                label="SECONDS"
                icon={<Clock className="h-5 w-5 text-red-500" />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CountdownCard({ value, label, icon }) {
  return (
    <Card className="bg-gray-300 border-0 w-[100px]">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-1">{icon}</div>
        <div className="text-4xl font-bold text-gray-800">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-600 uppercase tracking-wider">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
