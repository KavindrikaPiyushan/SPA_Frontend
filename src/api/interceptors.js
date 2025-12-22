import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use(
    (response)=>response,
    (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized");
      // optional: redirect to login
    }
    return Promise.reject(error);
  }
);
    