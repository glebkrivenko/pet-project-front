//здесь будем хранить функции регистрации,авторизации и проверки токена на валидность

import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
//функция регистрации
export const registration = async (email, password) => {
  //ответ от сервера
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
//функция авторизации
export const login = async (email, password) => {
  //ответ от сервера
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
//функция проверки
export const check = async () => {
  //ответ от сервера
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
