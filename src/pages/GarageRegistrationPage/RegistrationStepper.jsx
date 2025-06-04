"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function RegistrationStepper({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  canProceed,
  isSubmitting = false,
  children,
}) {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header with Car Icon */}

      {/* Enhanced Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-red-600 font-semibold">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </motion.div>

      {/* Enhanced Step Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between px-4"
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center w-full relative"
          >
            {/* Step circle */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-lg",
                index < currentStep
                  ? "bg-gradient-to-br from-red-500 to-red-600 border-red-500 text-white shadow-red-200"
                  : index === currentStep
                  ? "border-red-500 text-red-600 bg-red-50 shadow-red-100"
                  : "border-gray-300 text-gray-400 bg-white"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {index < currentStep ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-sm font-bold"
                  >
                    {index + 1}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Pulse effect */}
              {index === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.div>

            {/* Title */}
            <motion.div
              className="mt-2 text-center max-w-[120px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <p
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  index <= currentStep ? "text-red-600" : "text-gray-400"
                )}
              >
                {step.title}
              </p>
            </motion.div>

            {/* Progress bar */}
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  "absolute top-6 left-1/2 right-[-50%] transform -translate-y-1/2 h-1 w-full z-[-1]",
                  index < currentStep
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gray-200"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index < currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Enhanced Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentStep + 1}
                  </span>
                </div>
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {steps[currentStep].description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {children}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between items-center"
      >
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300",
            currentStep === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg hover:-translate-y-0.5"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {isLastStep ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300",
                "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              )}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Registering...
                </>
              ) : (
                <>
                  <Car className="w-4 h-4" />
                  Register Garage
                </>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              )}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
