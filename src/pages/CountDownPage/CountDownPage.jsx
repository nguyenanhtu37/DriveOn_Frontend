import { useState, useEffect } from "react";
import {
  Wrench,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CountdownPage() {
  // Set the target date (2 weeks from now by default)
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  });

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
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col">
      <main className="flex-1  mx-auto flex flex-col items-center justify-center px-4 py-12 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-zinc-500 blur-3xl"></div>
        </div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-red-500">COMING SOON</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            The ultimate garage management system for professionals is almost
            here. Get ready to transform your workflow.
          </p>
        </div>

        {isExpired ? (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">It's Here!</h3>
            <p className="text-xl text-zinc-400 mb-8">
              Garage Pro is now available. Start optimizing your garage
              operations today.
            </p>
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Get Started Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
              <CountdownCard
                value={timeLeft.days}
                label="Days"
                icon={<Calendar className="h-6 w-6 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.hours}
                label="Hours"
                icon={<Clock className="h-6 w-6 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.minutes}
                label="Minutes"
                icon={<Clock className="h-6 w-6 text-red-500" />}
              />
              <CountdownCard
                value={timeLeft.seconds}
                label="Seconds"
                icon={<Clock className="h-6 w-6 text-red-500" />}
              />
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Notify Me <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-6 px-4 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500">
            © 2025 Garage Pro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CountdownCard({ value, label, icon }) {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="mb-2">{icon}</div>
        <div className="text-4xl md:text-5xl font-bold mb-1">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="text-sm text-zinc-400 uppercase tracking-wider">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
