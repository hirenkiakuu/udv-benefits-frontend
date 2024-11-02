import axios from "axios";
import { BASE_URL } from "shared/api/api";

export const loginWithTempToken = async (tempToken: string) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/token/login?token=${tempToken}`
  );

  return res.data;
};
