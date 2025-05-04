export const AbsoluteScreenPath = {
  Entry: "/", // Entry screen
  Login: "/login", // Login screen
  ForgotPassword: "/forgot-password",
  NewPassword: "/reset-password",
  SignUp: "/signup",
  AdminDashBoard: "/adminDashboard/", // This might be redundant with AdminScreenPath
  viewRegisterGarage: "viewRegisterGarage", // Should be in AdminScreenPath
  GarageRegistrationPage: "/garageRegistration",
  PageNotFound: "/notFound",
  GarageDetail: "/garageDetail/:garageId",
  ProfilePage: "/profile",
  ProfilePageV2: "/profileV2",
  VehicleList: "/vehicle",
  VehicleDetail: "/vehicle/:id",
  FavoriteGarages: "/favorite-garages",
  GarageProUpgrade: "/garageProUpgrade",
  AppointmentDetail: "/appointment-detail",
  Emergency: "/emergency",
};

export const GarageManagementScreenPath = {
  GarageManagement: "/garageManagement/:garageId",
  GarageDashboard: "dashboard",
  Appointment: "appointments",
  AppointmentScheduler: "appointmentScheduler",
  AppointmentDetail: "appointments/:appointmentId",
  Feedback: "feedback",
  Services: "services",
  Settings: "settings",
  Staff: "staff",
  StaffDetail: "staff/:id",
  Service: "services/",
  ServiceDetail: ":serviceId",
  CountDownPro: "countdown",
  CreateService: "createService",
  ExpiredDate: "expiredDate",
};

export const AdminScreenPath = {
  BrandList: "brandList",
  Admin: "/admin/",
  ViewRegisterGarage: "viewRegisterGarage",
  ViewRegisterGarageDetail: "viewRegisterGarage/:id",
  ViewExitsGarage: "viewExitsGarage",
  viewServiceSystem: "viewServiceSystem",
  UserManagement: "userManagement",
  Dashboard: "dashboard",
  TransactionHistory: "transactionHistory",
};
