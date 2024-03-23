import axios from "axios";

const apiBaseURL = "http://localhost:3000";

const AxiosInstance = axios.create({
  baseURL: `${apiBaseURL}`,
});

const SignUpInstance = axios.create({
  baseURL: `${apiBaseURL}/api/users`,
});

class APIGuest {
  login = (email: string, password: string) => {
    return AxiosInstance.post("", {
      email: email,
      password: password,
    });
  };

  signup = (name: string, email: string, password: string) => {
    return SignUpInstance.post("", {
      name: name,
      email: email,
      password: password,
    });
  };
}

export default new APIGuest();
