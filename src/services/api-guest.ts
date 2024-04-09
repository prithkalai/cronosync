import axios from "axios";

let apiBaseURL = "";
if (process.env.NODE_ENV === "production") {
  apiBaseURL = "https://cronosync-backend-production.up.railway.app";
} else {
  apiBaseURL = "http://localhost:3000";
}

export { apiBaseURL };

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
