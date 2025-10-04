import type IUser from "../interfaces";
import axios, { AxiosError } from "axios";

const LoginUser = async (data: IUser) => {
  try {
    const responce = await axios.post("", data);
    return responce.data;
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.message || "Ошибка входа");
  }
  throw new Error("Неизвестная ошибка");
};

export default LoginUser;
