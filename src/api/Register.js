import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const sendOtp = async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/form/otp`, formdata, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Could not send OTP");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during send OTP";
    console.error("send OTP error:", message);
    throw new Error(message);
  }
};

export const verifyOtp = async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/form/votp`, formdata, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Could not verify OTP");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during OTP verification";
    console.error("OTP verification error:", message);
    throw new Error(message);
  }
};

export const registerMember = async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/form/members`, formdata, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Could not register member");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during member registration";
    console.error("member registration error:", message);
    throw new Error(message);
  }
};
