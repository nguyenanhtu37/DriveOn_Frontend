import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carOwnerSchema } from "../../schema/carOwnerSchema";

const CarOwnerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carOwnerSchema),
  });

  const onSubmit = (data) => {
    console.log("Car Owner data:", data);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Username"
        type="text"
        placeholder="Enter username"
        register={register("username")}
        error={errors.username}
      />
      <InputField
        label="Full Name"
        type="text"
        placeholder="Enter full name"
        register={register("fullName")}
        error={errors.fullName}
      />
      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        register={register("password")}
        error={errors.password}
      />
      <InputField
        label="Address"
        type="text"
        placeholder="Enter address"
        register={register("address")}
        error={errors.address}
      />
      <InputField
        label="Car Model"
        type="text"
        placeholder="Enter car model"
        register={register("carModel")}
        error={errors.carModel}
      />
      <InputField
        label="License Plate"
        type="text"
        placeholder="Enter license plate"
        register={register("licensePlate")}
        error={errors.licensePlate}
      />
      <SubmitButton />
    </form>
  );
};

export default CarOwnerForm;