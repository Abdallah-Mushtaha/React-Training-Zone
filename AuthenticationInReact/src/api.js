import axios from "axios";

// Create a base URL for the API
export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
})

// Every time a request is made to the API will send the token through the header else  return the configuration  "headers without Change"
api.interceptors.request.use((configuration) => {
  const token = localStorage.getItem("token")
  console.log("Token :: " + token);

  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`
    console.log("Successfully Added Token to Header");
  }
  return configuration
})

// interceptors use :: will be used to add the token to the header of the request and will be used to refresh the token 
api.interceptors.response.use(
  (response) => response,
  // If the request is successful, return the response else return the error
  async (error) => {
    // If the request fails, check if the error response status is 401 (Unauthorized) and the request has not already been retried 

    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      // retried mean that the request has already been sent once
      originalConfig._retry = true;
      try {
        // Get the refresh token from local storage if it exists
        const refreshToken = localStorage.getItem("refreshToken");

        // Send a request to the server to refresh the access token if the refresh token exists
        const { data } = await api.post("/auth/refresh", { refreshToken });
        console.log(data);

        // Update the access token and refresh token in local storage
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Update the Authorization header with the new access token
        originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;

        // Retry the original request
        return api(originalConfig);
      } catch (e) {
        // If the refresh token fails, log an error message
        console.error("Failed to refresh token");
        // Optional: Remove invalid tokens
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    }

    // If the request fails for any other reason, return the error
    return Promise.reject(error);
  }
)

export default api;
