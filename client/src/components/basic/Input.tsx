import { useState } from "react";
import {
  type UseFormRegister,
  type FieldErrors,
  type Path,
} from "react-hook-form";
import Error from "./Error";
import EyeOpen from "../../assets/eye-open.svg?react";
import EyeClosed from "../../assets/eye-close.svg?react";

interface InputProps<T extends object> {
  label?: string;
  id: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isPassword?: boolean;
}

const Input = <T extends object>({
  id,
  name,
  type,
  placeholder,
  register,
  errors,
  isPassword = false,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-4/5">
      <div className="relative border rounded-full w-full">
        <input
          className={"input-line"}
          {...register(name)}
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center w-8 h-full text-gray-500 hover:text-gray-700 transition-colors duration-200 leading-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            role="img"
          >
            {showPassword ? (
              <EyeOpen className="w-5 h-5 fill-current" />
            ) : (
              <EyeClosed className="w-5 h-5 fill-current" />
            )}
          </button>
        )}
      </div>
      <Error error={errors[name as unknown as keyof T] as any} />
    </div>
  );
};

export default Input;
