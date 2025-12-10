import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const login = async (formdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, formdata, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Could not login");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during login";
    console.error("Login error:", message);
    throw new Error(message);
  }
};
