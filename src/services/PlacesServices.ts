import axios from "axios";

export const getPlacesApi = async () => {
  try {
    const response = await axios.get("/api/places");
    if (response.status === 200) {
      return { data: response.data, error: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { data: [], error: "Error fetching Places" };
  }
};