import { axios } from "@/lib/axios";

export const getDashboardAdminOverview = async () => {
  const response = await axios.get("/admin/dashboard-overview");
  return response.data;
};

export const getGarageStatusCountByMonth = async () => {
  const response = await axios.get("/admin/garage-status-counts");
  return response.data;
};

export const getServiceUsageCounts = async () => {
  const response = await axios.get("/admin/service-usage-counts");
  return response.data;
};

export const getTransactionsByMonth = async () => {
  const response = await axios.get("/admin/transactions-by-month");
  return response.data;
};

export const getUserCountsByRole = async () => {
  const response = await axios.get("/admin/user-counts-by-role");
  return response.data;
};
