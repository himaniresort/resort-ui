import axios from "axios";

export const getRoomsApi = async () => {

  try {
    const response = await axios.get("/api/rooms");
    if (response.status === 200) {
      return { data: response.data, error: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { data: [], error: "Error fetching users" };
  }
};