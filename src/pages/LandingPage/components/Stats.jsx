export const Stats = () => {
  return (
    <section className="py-12 bg-[#f88e95] text-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">500+</p>
            <p className="text-sm mt-1">Partner Garages</p>
          </div>
          <div>
            <p className="text-4xl font-bold">15K+</p>
            <p className="text-sm mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">30K+</p>
            <p className="text-sm mt-1">Service Bookings</p>
          </div>
          <div>
            <p className="text-4xl font-bold">98%</p>
            <p className="text-sm mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
