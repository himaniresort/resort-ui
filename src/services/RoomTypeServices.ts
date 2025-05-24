import axios from "axios";

export const getRoomTypeApi = async () => {
  try {
    const response = await axios.get("/api/room-type");
    if (response.status === 200) {
      return { data: response.data, error: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { data: [], error: "Error fetching Room Type" };
  }
};