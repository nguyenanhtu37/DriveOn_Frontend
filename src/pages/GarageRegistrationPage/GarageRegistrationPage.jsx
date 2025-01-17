import { Wrench } from "lucide-react";
import React from "react";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

export default function GarageRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 to-white">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up animate-once animate-ease-in-out">
          <Wrench className="mx-auto h-16 w-16 text-accent mb-4 animate-rotate-y animate-infinite animate-duration-[2500ms] animate-ease-in-out" />
          <h1 className="text-4xl font-extrabold font-archivo text-gray-900 sm:text-5xl md:text-6xl">
            Register Your Garage
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our network of professional garages and start managing your
            business more efficiently today.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden animate-slide-up">
          <div className="px-4 py-5 sm:p-6">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
