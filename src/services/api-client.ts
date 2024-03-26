import axios from "axios";
import { apiBaseURL } from "./api-guest";

const AxiosInstance = axios.create({
  baseURL: `${apiBaseURL}/api/tasks`,
});

class APIClient {
  constructor() {
    AxiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("cronoToken");

        if (token) {
          config.headers["x-auth-token"] = token;
        } else {
          console.error("Token Not found");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  addTasks = (taskData: string, interval: string) => {
    return AxiosInstance.post("", {
      taskData: taskData,
      interval: interval,
    });
  };

  getTasks = () => {
    return AxiosInstance.get("");
  };

  reset = (id: string) => {
    return AxiosInstance.put(`/reset/${id}`);
  };

  delete = (id: string) => {
    return AxiosInstance.delete(`/${id}`);
  };

  userInfo = () => {
    return AxiosInstance.get(`${apiBaseURL}/api/users/me`, { baseURL: "" });
  };
}

export default new APIClient();