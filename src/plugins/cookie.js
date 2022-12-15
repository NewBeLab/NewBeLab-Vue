import { useAuthStore } from "@/stores/auth";
import { useCookies } from "vue3-cookies";

// cookieの値をstoreに格納する処理
// ページリロードする際に、cookieの値をstoreに格納するために使用する
export const setCookie = () => {
  const authStore = useAuthStore();
  const { cookies } = useCookies();

  // cookieにtokenがある場合
  if (cookies.get("token")) {
    // cookieの値をstoreに格納する
    authStore.setAuth({
      "access-token": cookies.get("token")["access-token"],
      client: cookies.get("token")["client"],
      expiry: cookies.get("token")["expiry"],
      uid: cookies.get("token")["uid"],
    });
  }

  // cookieにuserがある場合
  if (cookies.get("user")) {
    // cookieの値をstoreに格納する
    authStore.setUser({
      id: cookies.get("user")["id"],
      name: cookies.get("user")["name"],
      image: cookies.get("user")["image"],
    });
  }
};

export const removeCookie = () => {
  const { cookies } = useCookies();
  cookies.remove("token");
  cookies.remove("user");
};
