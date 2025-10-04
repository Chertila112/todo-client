import type IUser from "../interfaces";
import axios, { AxiosError } from "axios";

const PostUser = async (user: IUser) => {
  try {
    const responce = await axios.post("", user);
    return responce.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Ошибка регистрации");
    }
    throw new Error("Неизвестная ошибка");
  }
};

export default PostUser;
