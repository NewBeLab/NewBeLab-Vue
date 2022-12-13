import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useCookies } from "vue3-cookies";

// axiosでのリクエストの共通設定を行う

axios.interceptors.request.use((request) => {
  const headers = useAuthStore();
  request.headers = headers.token;
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

  // tokenをstoreに格納する
  authStore.setAuth({
    "access-token": response.headers["access-token"],
    client: response.headers["client"],
    expiry: response.headers["expiry"],
    uid: response.headers["uid"],
  });

  // tokenとuserをcookieに格納する
  if (authStore.user === null) {
    // ログアウト状態のとき
    cookies.set("token", {
      "access-token": authStore.token["access-token"],
      client: authStore.token["client"],
      expiry: authStore.token["expiry"],
      uid: authStore.token["uid"],
    });
  } else {
    // ログイン状態のとき
    cookies.set("token", {
      "access-token": authStore.token["access-token"],
      client: authStore.token["client"],
      expiry: authStore.token["expiry"],
      uid: authStore.token["uid"],
    });
    cookies.set("user", {
      id: authStore.user["id"],
      name: authStore.user["name"],
      image: authStore.user["image"],
    });
  }

  // 共通処理が終わった後にレスポンスを返す
  return response;
});
