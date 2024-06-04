import axios from 'axios';

export const FetchAllProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products", {
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = response.data;
    data.statusCode = response.status;
    return data;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    return { statusCode: 500, error: "Internal Server Error" };
  }
};
