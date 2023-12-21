import { URL } from "./url";

import { post, remove, get } from "./axios_functions";

export const fetchALLUsers = async () => {
  try {
    const { data } = await get(URL.FETCH_ALL_USERS);
    const { users } = data;
    console.log("🚀 ~ file: http.ts:9 ~ fetchALLUsers ~ users:", users);
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    return true;
  } catch (err) {
    return err;
  }
};

export const fetchOneUser = async (userId: string) => {
  try {
    const { data } = await get(`${URL.FETCH_ONE_USER}/${userId}`);
    const { user } = data;
    localStorage.setItem("userDetail", JSON.stringify(user));
    return true;
  } catch (err) {
    return err;
  }
};

export const removeUser = async (userId: string) => {
  try {
    const removeRes = await remove(`${URL.REMOVE_USER}/${userId}`);
    return removeRes;
  } catch (err) {
    return err;
  }
};

export const addUser = async (data: object) => {
  try {
    const userRes = await post(`${URL.ADD_USER}`, data);
    return userRes;
  } catch (err) {
    return err;
  }
};

export const login = (data: object) => {
  return post(`${URL.LOGIN}`, data);
};

export const signUp = async (data: object) => {
  try {
    const signUpRes = await post(`${URL.SIGN_UP}`, data);
    return signUpRes;
  } catch (err) {
    return err;
  }
};

export const updateUser = async (data: object) => {
  try {
    const userRes = await post(`${URL.UPDATE_USER}`, data);
    return userRes;
  } catch (err) {
    return err;
  }
};
