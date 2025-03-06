import axios from "axios";

export const getUsersApi = async () => {
  try {
    const response = await axios.get("/api/users");
    if (response.status === 200) {
      return { data: response.data.data, error: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { data: [], error: "Error fetching users" };
  }
};
