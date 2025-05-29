import { Button } from "@/components/ui/button";
import {
  Car,
  Calendar,
  Search,
  Star,
  Phone,
  Wrench,
  Building2,
  CheckCircle,
} from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { Header } from "./components/Header";
import { KeyFeature } from "./components/KeyFeature";
import { Stats } from "./components/Stats";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}

        <HeroSection />

        {/* Key Features Section */}
        <KeyFeature />

        {/* Stats Section */}
        <Stats />

        {/* For Car Owners Section */}
        <section id="for-car-owners" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-900">
                    For Car Owners
                  </h2>
                  <p className="text-lg text-gray-600">
                    Take the stress out of car maintenance and repairs with our
                    user-friendly platform.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Convenience</p>
                        <p className="text-gray-600">
                          Book services anytime, anywhere from your mobile
                          device
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">
                          Transparency
                        </p>
                        <p className="text-gray-600">
                          See upfront pricing and detailed service descriptions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Reliability</p>
                        <p className="text-gray-600">
                          Connect with verified garages with real customer
                          reviews
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">
                          Emergency Support
                        </p>
                        <p className="text-gray-600">
                          Get immediate assistance when you need it most
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-blue-800 hover:bg-blue-900">
                    Find a Garage Near You
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl order-1 md:order-2">
                <img
                  src="/placeholder.svg?height=1000&width=800"
                  alt="Car owner using DriveOn app"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Garages Section */}
        <section id="for-garages" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=1000&width=800"
                  alt="Garage owner using DriveOn dashboard"
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-900">
                  For Garages
                </h2>
                <p className="text-lg text-gray-600">
                  Grow your business and streamline operations with our
                  comprehensive platform.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Increased Visibility
                      </p>
                      <p className="text-gray-600">
                        Get discovered by thousands of car owners in your area
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Efficient Booking Management
                      </p>
                      <p className="text-gray-600">
                        Manage your calendar and appointments in one place
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Business Growth
                      </p>
                      <p className="text-gray-600">
                        Expand your customer base and increase revenue
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Customer Insights
                      </p>
                      <p className="text-gray-600">
                        Access data and feedback to improve your services
                      </p>
                    </div>
                  </li>
                </ul>
                <Button className="bg-blue-800 hover:bg-blue-900">
                  Join Our Network
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-900">
                How It Works
              </h2>
            </div>

            {/* For Car Owners */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">
                For Car Owners
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 relative">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-blue-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    Search
                  </h4>
                  <p className="text-gray-600">
                    Find garages near you with the services you need
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 relative">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-blue-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    Compare
                  </h4>
                  <p className="text-gray-600">
                    Read reviews and compare prices and services
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 relative">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-blue-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Book</h4>
                  <p className="text-gray-600">
                    Schedule an appointment at your preferred time
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    Relax
                  </h4>
                  <p className="text-gray-600">
                    Get your car serviced with peace of mind
                  </p>
                </div>
              </div>
            </div>

            {/* For Garages */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">
                For Garages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 relative">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-blue-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Join</h4>
                  <p className="text-gray-600">
                    Create your profile and showcase your services
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 relative">
                      <Wrench className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block absolute top-8 left-full h-0.5 w-full -ml-4 bg-blue-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    Manage
                  </h4>
                  <p className="text-gray-600">
                    Set your availability and manage bookings
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Grow</h4>
                  <p className="text-gray-600">
                    Expand your customer base and increase revenue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-900">
                What Our Users Say
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}

              <Card className="relative bg-blue-50 rounded-xl p-8  overflow-hidden">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-gray-600 italic">
                  "DriveOn saved me when my car broke down on the highway. I
                  found emergency assistance within minutes!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="User"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Car Owner</p>
                  </div>
                </div>
                <BorderBeam duration={8} size={100} />
              </Card>

              {/* Testimonial 2 */}
              <div className="bg-blue-50 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-gray-600 italic">
                  "As a garage owner, DriveOn has transformed how we manage
                  appointments. Our customer base has grown by 40%!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="User"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">
                      Michael Rodriguez
                    </p>
                    <p className="text-sm text-gray-500">Garage Owner</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-blue-50 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5" />
                </div>
                <p className="text-gray-600 italic">
                  "I love being able to compare garages and read reviews before
                  booking. Makes me feel confident in my choice."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="User"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">David Chen</p>
                    <p className="text-sm text-gray-500">Car Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-8">
              Trusted by Leading Garages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-center">
                  <img
                    src="/placeholder.svg?height=80&width=160"
                    alt={`Partner logo ${i}`}
                    width={160}
                    height={80}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-blue-900 text-white">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Transform Your Car Service Experience?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied car owners and garages on the DriveOn
              platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 h-12 px-8"
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-800 h-12 px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                <Car className="h-6 w-6 text-orange-500" />
                <span>DriveOn</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Connecting car owners with reliable repair services nationwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">For Car Owners</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Find a Garage
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Emergency Assistance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Maintenance Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Service History
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">For Garages</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Join Our Network
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Partner Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DriveOn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
