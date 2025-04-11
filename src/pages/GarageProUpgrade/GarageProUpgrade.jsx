import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Star,
  PenToolIcon as Tool,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

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

export const GarageProUpgrade = () => {
  const [scrolled, setScrolled] = useState(false);

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
                  Upgrade to{" "}
                  <motion.span
                    initial={{ color: "#000" }}
                    animate={{ color: "#ef4444" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-red-500"
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
                        <span>Basic inventory management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Up to 10 vehicles</span>
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
                <Card className="border-2 border-red-500 shadow-lg relative overflow-hidden">
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
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">100.000 VND</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Advance customer support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Top display priority </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Manage support call</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Upgrade Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

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
                  >
                    Upgrade to Pro Today
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* <footer className="border-t bg-white py-6 md:py-0">
        <div className=" flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 GarageMaster. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  );
};
