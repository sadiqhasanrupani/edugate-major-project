import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const verifyToken = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
};

export const logoutHandler = () => {
  redirect("/login");
  localStorage.removeItem("token");
};