import api from "shared/api/api";

export const getUserData = async () => {
  const res = await api.get("/api/users/me");

  return res.data;
};
