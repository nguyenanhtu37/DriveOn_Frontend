import { axios } from "@/lib/axios";

// Create payment link
export const createPaymentLink = async (garageId, subscriptionId) => {
  try {
    const response = await axios.post("payos/create-payment-link", {
      garageId,
      subscriptionId,
      idempotencyKey: `idemp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create payment link");
  }
};

// Get subscription plans
export const getSubscriptionPlans = async () => {
  try {
    const response = await axios.get("subscription/plans");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch subscription plans");
  }
};

// Get current subscription
export const getCurrentSubscription = async () => {
  try {
    const response = await axios.get("subscription/current");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch current subscription");
  }
};

// Get transaction history
export const getTransactionHistory = async () => {
  try {
    const response = await axios.get("transaction/history");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch transaction history");
  }
};

// Get transaction details
export const getTransactionDetails = async (transactionId) => {
  try {
    const response = await axios.get(`transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch transaction details");
  }
};

// Verify payment status
export const verifyPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(`payos/verify-payment/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to verify payment status");
  }
}; 