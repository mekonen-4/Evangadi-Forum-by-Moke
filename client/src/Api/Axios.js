import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor logic MUST come before the export
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    // Simplification: If token exists, send it. 
    // Backend routes like login/register simply won't look for it.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Standard Practice: Handle 401 (Unauthorized) globally
// If the token expires, this automatically kicks the user out.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Optional: window.location.href = "/auth"; 
    }
    return Promise.reject(error);
  }
);

export default instance;