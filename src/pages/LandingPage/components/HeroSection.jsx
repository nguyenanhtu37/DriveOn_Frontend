import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#ffafb5] to-white max-w-[1980px] mx-auto px-8 md:px-10 py-12 md:py-16">
      <div className=" relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="space-y-6">
          <BoxReveal boxColor={"#ff939c"} duration={0.5}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Connecting Car Owners with Reliable Repair Services
            </h1>
          </BoxReveal>
          <BoxReveal boxColor={"#ff939c"} duration={0.5}>
            <p className="text-lg text-gray-700 md:text-xl">
              Book maintenance, request emergency assistance, and find trusted
              garages all in one place
            </p>
          </BoxReveal>
          <div className="flex flex-col sm:flex-row gap-4">
            <BoxReveal boxColor="#ff939c">
              <Button className="bg-[#E63946] hover:bg-[#b92c38] h-12 px-6 text-base text-white font-bold">
                Find a Garage
              </Button>
            </BoxReveal>
            <BoxReveal boxColor="#ff939c">
              <Button
                variant="destructive"
                className="bg-black hover:bg-gray-800 h-12 px-6 text-base text-white font-bold"
              >
                Request Emergency Help
              </Button>
            </BoxReveal>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="Car service booking on mobile"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
