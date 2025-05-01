import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200">
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h3 className="font-bold text-lg text-[#e53935]">Drive On</h3>
            </div>
            <p className="text-sm text-gray-600">
              The leading platform connecting drivers with trusted auto repair
              shops and garages across Vietnam.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#e53935]">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#e53935]">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#e53935]">
                <FaTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Find Garages
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Garage Register
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Pro Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Car Repair
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Oil Change
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Tire Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e53935] flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#e53935] mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#e53935] mr-2" />
                <span className="text-sm text-gray-600">0944549140</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#e53935] mr-2" />
                <span className="text-sm text-gray-600">
                  support@driveon.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Drive On. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-[#e53935]"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-[#e53935]"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-[#e53935]"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
