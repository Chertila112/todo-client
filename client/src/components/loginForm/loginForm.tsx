import React from "react";
import z from "zod";
import Input from "../basic/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import useRegisterUser from "../../services/hooks/useRegister";
import LoginUser from "../../services/api/login";
import type IUser from "../../services/interfaces";
import { Button } from "../basic/Button";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Поле не должног быть пустым"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .max(20, "Пароль не долженн содержать более 20 символов"),
});

type loginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { mutate, isPending } = useRegisterUser(LoginUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginFormData> = (data: IUser) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col shadow-2xl border-0 rounded-3xl overflow-hidden transition duration-500 hover:scale-105">
      <h1 className="flex justify-center border-b-1 bg-white border-gray-300 items-center rounded-t-lg h-15 text-center font-[poppins] text-[25px] font-bold">
        Войти в аккаунт
      </h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          name="email"
          placeholder="Введите email"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="password"
          name="password"
          placeholder="Введите пароль"
          type="password"
          register={register}
          errors={errors}
          isPassword
        />
        <Button
          text="Войти"
          isPending={isPending}
          isSubmitting={isSubmitting}
        />
        <p>
          "Нет аккаунта?" <Link className="text-blue-500 hover:underline" to="/registration">Зарегистрироваться.</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
