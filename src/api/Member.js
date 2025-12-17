import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const editMember = async (token, userid, formdata) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/auth/${userid}?&id=${formdata._id}`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Could not edit member");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during member edit";
    console.error("Edit member error:", message);
    throw new Error(message);
  }
};

export const deleteMember = async (token, userid, memberid) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/auth/${userid}?&id=${memberid}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Could not delete member");
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred during member deletion";
    console.error("Delete member error:", message);
    throw new Error(message);
  }
};
