//здесь будем хранить функции добавляния типа

import { $authHost, $host } from "./index";

//функция создания типа
export const createType = async (type) => {
  //ответ от сервера
  const { data } = await $authHost.post("api/type", type);
  return data;
};
//функция получения типа
export const fetchTypes = async () => {
  //ответ от сервера
  const { data } = await $host.get("api/type");
  return data;
};
//функция создания бренда
export const createBrand = async (brand) => {
  //ответ от сервера
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
//функция получения бренда
export const fetchBrands = async () => {
  //ответ от сервера
  const { data } = await $host.get("api/brand");
  return data;
};
//функция создания девайсов
export const createDevice = async (device) => {
  //ответ от сервера
  const { data } = await $authHost.post("api/device", device);
  return data;
};
//функция получения девайсов
export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  //ответ от сервера
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};
//функция получения одного девайса
export const fetchOneDevice = async (id) => {
  //ответ от сервера
  const { data } = await $host.get("api/device/" + id);
  return data;
};
