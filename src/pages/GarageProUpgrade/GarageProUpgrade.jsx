import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Star,
  PenToolIcon as Tool,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PaymentDialog } from "./PaymentDialog";
import { getUser } from "@/app/stores/view/user";
import { useViewGarageList } from "@/app/stores/entity/garage";
import { cn } from "@/lib/utils";

// Marquee Component
const Marquee = ({ children, pauseOnHover = true, className }) => {
  const duration = "30s";
  
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden",
        className
      )}
    >
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-content {
            animation: marquee ${duration} linear infinite;
            animation-play-state: ${pauseOnHover ? 'running' : 'paused'};
            display: flex;
            width: max-content;
          }
        `}
      </style>
      <div className="marquee-content">
        {children}
        {children}
      </div>
    </div>
  );
};

const ProGarageCard = ({ garage, onClick }) => {
  const formatRating = (rating) =>
    typeof rating === "number" ? rating.toFixed(1) : "--";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative w-[300px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Border Beam Effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-[1px] bg-white rounded-xl"></div>
      </div>

      {/* Animated Border Beam */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-[border-beam_8s_linear_infinite]"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-bold">PRO</span>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={garage.interiorImages?.[0] || "/placeholder.svg"}
            className="w-full h-full object-cover"
            alt={garage.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <FaStar className="h-3 w-3 text-yellow-400" />
              <span className="font-medium text-sm text-gray-900">{formatRating(garage.ratingAverage)}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
            {garage.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMapMarkerAlt className="h-3 w-3 flex-shrink-0" />
            <p className="text-xs line-clamp-1">{garage.address}</p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes border-beam {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </motion.div>
  );
};

const features = [
  {
    title: "Top Display Priority",
    description: "Your garage will be featured at the top of search results, increasing visibility and attracting more customers",
    icon: Star,
  },
  {
    title: "Maintenance Reminder",
    description: "Automated system to track vehicle maintenance schedules and send timely reminders to customers",
    icon: CheckCircle2,
  },
  {
    title: "Dedicated Pro Page",
    description: "Exclusive pro garage page showcasing your services and professional expertise",
    icon: CheckCircle2,
  },
];

export const GarageProUpgrade = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const viewGarageList = useViewGarageList();
  const listGaragePro = viewGarageList.data?.garagePros || [];

  const user = getUser();
  const handleOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header
        className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className=" flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: scrolled ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Wrench className="h-6 w-6 text-red-500" />
            </motion.div>
            <Link to="/" className="text-xl font-bold">
              Drive On
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
          <div className=" px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600"
                >
                  Limited Time Offer
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Upgrade to{' '}
                  <motion.span
                    initial={{ color: '#000' }}
                    animate={{ color: '#ef4444' }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-red-500 ml-1"
                  >
                    Garage Pro
                  </motion.span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                >
                  Take your garage management to the next level with advanced
                  features, premium support, and more.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mt-6"
              >
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-200"
                  onClick={handleOpen}
                >
                  Upgrade Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Pro Garages Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Pro Garages
            </h2>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              {listGaragePro.length} Active
            </span>
          </div>
          <div className="relative flex w-screen left-1/2 right-1/2 -translate-x-1/2 flex-col items-center justify-center overflow-hidden bg-white/70 transition-all duration-300">
            <Marquee pauseOnHover>
              {listGaragePro.map((garage) => (
                <div key={garage._id} className="mx-4">
                  <ProGarageCard
                    garage={garage}
                    onClick={() => navigate(`/garageDetail/${garage._id}`)}
                  />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </motion.div>

        <section className="py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-6 lg:grid-cols-2 lg:gap-12"
            >
              <motion.div variants={item}>
                <Card className="border-2 border-muted hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full">
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>Current plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">Free</div>
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Standard garage listing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Basic maintenance tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Standard support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 h-full border-red-500 shadow-lg relative overflow-hidden">
                  <motion.div
                    className="absolute -right-20 -top-20 w-40 h-40 bg-red-500 opacity-10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <CardHeader className="bg-red-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-red-500">Pro</CardTitle>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600"
                      >
                        Recommended
                      </motion.div>
                    </div>
                    <CardDescription>Best for professionals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Top display priority in search results</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automated maintenance reminders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Dedicated pro garage page</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      onClick={handleOpen}
                    >
                      Upgrade Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 px-4 md:px-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group overflow-hidden"
            >
              {/* Magic Card Effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-[1px] bg-white rounded-xl"></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-red-50 to-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>

              {/* Magic Card Border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <section className="py-12 md:py-24 lg:py-32 bg-slate-100 relative overflow-hidden">
          <motion.div
            className="absolute -left-20 top-20 w-40 h-40 bg-red-500 opacity-5 rounded-full"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute right-20 bottom-20 w-60 h-60 bg-red-500 opacity-5 rounded-full"
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className=" px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Upgrade to Pro?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover the benefits that thousands of garage owners are
                  already enjoying.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
            >
              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="rounded-full bg-red-100 p-3"
                >
                  <Tool className="h-6 w-6 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold">Advance customer support</h3>
                <p className="text-center text-muted-foreground">
                  Unlock premium tools and exclusive features tailored for
                  seamless and professional garage management.
                </p>
              </motion.div>
              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="rounded-full bg-red-100 p-3"
                >
                  <Star className="h-6 w-6 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold">Top display priority</h3>
                <p className="text-center text-muted-foreground">
                  Priority display on the system, easier to reach customers
                </p>
              </motion.div>
              <motion.div
                variants={item}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="rounded-full bg-red-100 p-3"
                >
                  <Check className="h-6 w-6 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold">Manage support call</h3>
                <p className="text-center text-muted-foreground">
                  No more limits on vehicles, customers, or features. Scale your
                  business with ease.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Garage?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of satisfied garage owners who have upgraded to
                  Pro.
                </p>
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-200"
                    onClick={handleOpen}
                  >
                    Upgrade to Pro Today
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <PaymentDialog open={open} setOpen={setOpen} />
    </div>
  );
};
