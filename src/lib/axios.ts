import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // handle unauthorized
    } else if (status === 403) {
      // handle forbidden
    } else if (status === 404) {
      // handle not found
    } else if (status === 422) {
      // validation errors — let the caller handle field mapping
    } else if (status >= 500) {
      // handle server error
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
