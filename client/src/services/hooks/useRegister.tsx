import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { fetchFunc } from "../../types/basicTypes";
import type IUser from "../interfaces";

const useRegisterUser = (mutationFunc: fetchFunc<IUser>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      toast.success("Регистрация прошла успешно");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Произошла ошибка при регистрации");
    },
  });
};

export default useRegisterUser;
