import Card from "@/components/Card";

export default function GarageList() {
  return (
    <div className=" px-4 md:px-10 mt-4 animate-fade animate-once animate-ease-in-out">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4  ">
        {Array.from({ length: 20 }).map((_, index) => (
          <Card
            key={index}
            garageName="Hello"
            rating={5}
            address=" 42 Khai dong 4"
            imgs={[
              "https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/207268/pexels-photo-207268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            ]}
            openTime="8:00"
            closeTime="22:00"
          />
        ))}
      </div>
    </div>
  );
}
