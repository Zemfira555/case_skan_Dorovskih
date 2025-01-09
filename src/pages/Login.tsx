import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getInfo, login } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AuthDataType } from "../types/types";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { error, info } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState } = useForm<AuthDataType>();

  const onSubmit = async (data: AuthDataType) => {
    await dispatch(login(data));
    await dispatch(getInfo());
  };

  useEffect(() => {
    if (info) navigate("/");
  }, [info]);

  const { isValid } = formState;

  return (
    <div className="flex px-10 sm:px-2 justify-between sm:flex-col sm:w-full w-[95%] mt-[75px] sm:mt-[25px] py-1">
      <div className="flex flex-col items-center">
        <div className="font-['Ferry'] text-[40px] leading-[48px] sm:leading-[26.4px] sm:text-[32px] ">
          Для оформления подписки на тариф, необходимо авторизоваться.
        </div>
        <div className="sm:hidden">
          <img src="/images/login.png" alt="login" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="sm:mt-[35px] w-[45vw] sm:w-full">
        <div className="shadow-2xl sm:mt-[100px] rounded-[10px] p-3 py-5 flex flex-col gap-3 sm:w-full">
          <div className="-mt-[85px] sm:-mt-[100px] -ml-[50px] sm:ml-[75px] sm:mb-[10px] ">
            <img src="/icons/lock.svg" alt="lock" />
          </div>
          <div className="flex gap-5 -mt-6">
            <span className="flex justify-center w-[30%] sm:px-6 border-b-[2px] pb-2.5 text-[#029491] cursor-pointer border-[#029491]">
              Войти
            </span>
            <span className="flex justify-center w-[65%] border-b-[2px] pb-2.5 border-[#C7C7C7] cursor-pointer text-[#C7C7C7]">
              Зарегистрироваться
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="login" className="text-[#949494]">
              Логин или номер телефона:
            </label>
            <TextField
              id="login"
              size="small"
              className="w-full"
              {...register("login", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="login" className="text-[#949494]">
              Пароль:
            </label>
            <TextField
              id="login"
              size="small"
              className="w-full"
              type="password"
              {...register("password", { required: true })}
            />
            <p className="text-center text-red-400">{error}</p>
          </div>

          <div>
            <Button disabled={!isValid} type="submit">
              Войти
            </Button>
          </div>

          <div className="text-[#5970FF] underline cursor-pointer text-center">
            Восстановить пароль
          </div>

          <div>
            <div className="text-[#949494] my-4">Войти через: </div>

            <div className="flex gap-2">
              <span className="cursor-pointer border-[#5970FF82] border-2 py-2 px-5 rounded-[3px] flex items-center justify-center">
                <img src="/icons/google.svg" alt="google" />
              </span>
              <span className="cursor-pointer border-[#5970FF82] border-2 py-2 px-5 rounded-[3px] flex items-center justify-center">
                <img src="/icons/facebook.svg" alt="google" />
              </span>
              <span className="cursor-pointer border-[#5970FF82] border-2 py-2 px-5 rounded-[3px] flex items-center justify-center">
                <img src="/icons/yandex.svg" alt="google" />
              </span>
            </div>
          </div>
        </div>

        <div className="lg:hidden md:hidden flex justify-center my-10">
          <img src="/images/login.png" alt="login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
