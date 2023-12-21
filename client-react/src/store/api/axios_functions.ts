import axios from "axios";

import { BASE_URL } from "./url";

const headers = {
  "Content-Type": "application/json",
};

export const post = async (url: string, data: object) => {
  const postRes = await axios.post(`${BASE_URL}${url}`, data, {
    headers: headers,
  });
  return postRes;
};

export const get = async (url: string) => {
  const getRes = await axios.get(`${BASE_URL}${url}`, { headers: headers });
  return getRes;
};

export const remove = async (url: string) => {
  const deleteRes = await axios.delete(`${BASE_URL}${url}`, {
    headers: headers,
  });
  return deleteRes;
};
