import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useViewGarageList } from "@/app/stores/entity/garage";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
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
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .marquee-content {
            animation: marquee ${duration} linear infinite;
            animation-play-state: ${pauseOnHover ? 'running' : 'paused'};
          }
        `}
      </style>
      <div className="marquee-content flex whitespace-nowrap">
        {children}
        <div className="w-[2000px]"></div>
        {children}
      </div>
    </div>
  );
};

const features = [
  {
    title: "Premium Listing",
    description: "Your garage appears at the top of search results and gets priority visibility",
    icon: Star,
  },
  {
    title: "Maintenance Reminder",
    description: "Automated maintenance scheduling and customer notification system",
    icon: CheckCircle2,
  },
  {
    title: "Priority Support",
    description: "24/7 dedicated customer support with faster response times",
    icon: CheckCircle2,
  },
  {
    title: "Custom Branding",
    description: "Personalized profile, logo placement, and premium branding options",
    icon: CheckCircle2,
  },
  {
    title: "Marketing Tools",
    description: "Access to promotional tools, campaigns, and social media integration",
    icon: CheckCircle2,
  },
  {
    title: "Business Insights",
    description: "Detailed reports, analytics, and performance metrics",
    icon: CheckCircle2,
  },
  {
    title: "Customer Management",
    description: "Advanced CRM tools for better customer relationship management",
    icon: CheckCircle2,
  },
  {
    title: "Inventory Control",
    description: "Smart inventory management and parts tracking system",
    icon: CheckCircle2,
  },
  {
    title: "Emergency Services",
    description: "Priority listing in emergency service requests",
    icon: CheckCircle2,
  },
];

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

function GarageProFeatures() {
  const navigate = useNavigate();
  const viewGarageList = useViewGarageList();
  const listGaragePro = viewGarageList.data?.garagePros || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex justify-end mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <span className="animate-pulse">⚡</span>
                Limited Time Offer
              </span>
            </motion.div>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="bg-gradient-to-r from-red-100 to-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                Premium Features
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Upgrade to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
                Garage Pro
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your garage business with premium features and exclusive benefits
            </motion.p>
          </div>

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

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
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

          {/* Add new section after Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Exclusive Pro Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get access to premium features that will help you grow your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Search Visibility</h3>
                    <p className="text-gray-600">
                      Your garage appears at the top of search results, increasing your visibility and attracting more customers
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Maintenance System</h3>
                    <p className="text-gray-600">Automated maintenance scheduling and reminders to keep your customers&apos; vehicles in top condition</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Add statistics section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-24 bg-gradient-to-r from-red-50 to-white rounded-2xl p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">3x</div>
                <p className="text-gray-600">More Customer Inquiries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">50%</div>
                <p className="text-gray-600">Higher Customer Retention</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                <p className="text-gray-600">Priority Support</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gradient-to-r from-red-50 to-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-red-500/5"></div>
            <div className="relative">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Ready to Transform Your Garage?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join thousands of satisfied garage owners who have upgraded to Pro and are growing their business
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="px-12 py-7 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg hover:shadow-red-200 transition-all duration-300 group"
                  onClick={() => navigate("/garageRegistration")}
                >
                  <span className="flex items-center">
                    Upgrade Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default GarageProFeatures; 