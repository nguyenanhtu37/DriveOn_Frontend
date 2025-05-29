import { Calendar, Phone, Search } from "lucide-react";

export const KeyFeature = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Key Features
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to keep your vehicle running smoothly and handle
            unexpected situations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-red-50 rounded-xl p-8 text-center space-y-4 transition-all hover:shadow-lg">
            <div className="mx-auto bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              Emergency Roadside Assistance
            </h3>
            <p className="text-gray-600">
              Get immediate help when you need it most. Connect with nearby
              services for towing, jump starts, and more.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-red-50 rounded-xl p-8 text-center space-y-4 transition-all hover:shadow-lg">
            <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              Appointment Scheduling
            </h3>
            <p className="text-gray-600">
              Book maintenance and repairs at your convenience. View available
              slots and confirm instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-red-50 rounded-xl p-8 text-center space-y-4 transition-all hover:shadow-lg">
            <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary">
              Garage Directory & Reviews
            </h3>
            <p className="text-gray-600">
              Find trusted garages with verified reviews. Compare services,
              prices, and expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
