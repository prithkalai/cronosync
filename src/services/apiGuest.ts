import axios from "axios";

export const apiBaseURL = "http://localhost:3000";

const LoginInstance = axios.create({
  baseURL: `${apiBaseURL}/api/login`,
});

const SignUpInstance = axios.create({
  baseURL: `${apiBaseURL}/api/users`,
});

class APIGuest {
  login = (email: string, password: string) => {
    return LoginInstance.post("", {
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
