import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useCookies } from "vue3-cookies";

// axiosでのリクエストの共通設定を行う

axios.interceptors.request.use((request) => {
  const headers = useAuthStore();
  request.headers = headers;
});

export const axiosInstance = axios.create({
  // ベースURLとクレデンシャルの設定
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// ここから、リクエストの共通設定
axiosInstance.interceptors.request.use((request) => {
  const authStore = useAuthStore();

  // requestのheadersにtokenをセットする
  request.headers = authStore.token;
  return request;
});

// ここから、レスポンスの共通設定
axiosInstance.interceptors.response.use((response) => {
  const authStore = useAuthStore();
  const { cookies } = useCookies();

  // user情報をstoreに格納する
  authStore.setUser(response.data.data);

  // tokenをstoreに格納する
  authStore.setAuth({
    "access-token": response.headers["access-token"],
    client: response.headers["client"],
    expiry: response.headers["expiry"],
    uid: response.headers["uid"],
  });

  // tokenとuserをcookieに格納する
  if (authStore.user === undefined) {
    // ログアウト状態のとき
    cookies.set("session", {
      "access-token": authStore.token["access-token"],
      client: authStore.token["client"],
      expiry: authStore.token["expiry"],
      uid: authStore.token["uid"],
    });
  } else {
    // ログイン状態のとき
    cookies.set("session", {
      "access-token": authStore.token["access-token"],
      client: authStore.token["client"],
      expiry: authStore.token["expiry"],
      id: authStore.user["id"],
      uid: authStore.token["uid"],
      name: authStore.user["name"],
      image: authStore.user["image"],
    });
  }
});
