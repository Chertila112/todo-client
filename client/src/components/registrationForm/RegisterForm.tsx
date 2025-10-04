import { Button } from "../basic/Button";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import useRegisterUser from "../../services/hooks/useRegister";
import Error from "../basic/Error";
import Input from "../basic/Input";
import PostUser from "../../services/api/register";
import type IUser from "../../services/interfaces";
import { Link } from "react-router-dom";

const registrationSchema = z
  .object({
    email: z
      .string()
      .email("Напишите существующий email")
      .min(1, "Слишком короткий Email"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(20, "Пароль не долженн содержать более 20 символов"),
    confirmPassword: z.string().min(1, "Это поле обязательно для заполнения"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isPending, error } = useRegisterUser(PostUser);

  const onSubmit: SubmitHandler<RegistrationFormData> = (data: IUser) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col shadow-2xl border-0 rounded-3xl overflow-hidden transition duration-500 hover:scale-105">
      <h1 className="flex justify-center border-b-1 bg-white border-gray-300 items-center rounded-t-lg h-15 text-center font-[poppins] text-[25px] font-bold">
        Создать аккаунт
      </h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Введите Email"
          register={register}
          errors={errors}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          register={register}
          errors={errors}
          isPassword
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Подтвердите пароль"
          register={register}
          errors={errors}
          isPassword
        />
        <Button
          text="Создать аккаунт"
          isPending={isPending}
          isSubmitting={isSubmitting}
        />
        <p>
          Уже есть аккаунт? 
          <Link
           className="text-blue-500 hover:underline"
           to="/">Войти.
           </Link>
        </p>
        <Error error={error} />
      </form>
    </div>
  );
};

export default RegisterForm;
