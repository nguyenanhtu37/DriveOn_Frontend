
export const AbsoluteScreenPath = {
  Entry: "/", // Entry screen
  Login: "/login", // Login screen
  ForgotPassword: "/forgot-password",
  NewPassword: "/reset-password",
  SignUp: "/signup",
  AdminDashBoard: "/adminDashboard/", // This might be redundant with AdminScreenPath
  viewRegisterGarage: "viewRegisterGarage", // Should be in AdminScreenPath
  GarageRegistrationPage: "/garageRegistration",
  ProfilePage: "/profile", 
  VehicleList: "/vehicle",
};

export const GarageManagementScreenPath = {
  GarageManagement: "/garageManagement/:garageId",
  GarageDashboard: "dashboard",
  Appointment: "appointments",
  AppointmentScheduler: "appointmentScheduler",
  AppointmentDetail: "appointments/:id",
  Services: "services",
  Settings: "settings",
  Staff: "staff",
  StaffDetail: "staff/:id",
  Service: "services/",
  ServiceDetail: ":serviceId",
  CreateService: "createService",
};

export const AdminScreenPath = {
  AddCarBrand:"/adminDashboard/addCarBrand",
  AdminDashBoard: "/adminDashboard/",
  ViewRegisterGarage: "viewRegisterGarage",
  ViewRegisterGarageDetail: "viewRegisterGarage/:id",
  ViewExitsGarage: "viewExitsGarage",
  viewServiceSystem: "viewServiceSystem",
};