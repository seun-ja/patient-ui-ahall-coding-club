import api from "./api";

interface LoginResponse {
  token: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const res = await api.post<LoginResponse>("/login", {
    email,
    password,
  });

  // Save JWT token in localStorage
  // localStorage.setItem("token", res.data.token);
  return "Hello world";
};
