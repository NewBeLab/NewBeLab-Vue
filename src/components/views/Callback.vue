<template>
  <div></div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { inject, onMounted } from "vue";
import { useCookies } from "vue3-cookies";

// onMountedでDOMが作成された後にログイン処理を実行するようにしている
onMounted(() => {
  // vue3では$routeでクエリー情報を取得できないので、useRouteを使う
  const route = useRoute();

  // route.queryには、リダイレクトされた際に付与されたクエリパラメータが格納されている
  // 今回は、access_token、client_id、expiry、uidが格納されている
  const { auth_token, client_id, expiry, uid } = route.query;

  const authStore = useAuthStore();
  // クエリパラメータから取得した値を、authStoreのtokenのstateに格納する
  authStore.setAuth({
    "access-token": auth_token,
    client: client_id,
    expiry: expiry,
    uid: uid,
  });

  // axiosの処理は'plguins/axios.js'にてプラグインとして共通処理化している
  // 共通処理の内容としては、authStoreのtokenをheadersにセットしている。
  const axios = inject("axios");

  // auth/validate_tokenにリクエストを送ることで、user情報を取得できる
  axios
    .get("/auth/validate_token")
    .then((response) => {
      // 取得したuser情報をauthStoreのuserのstateに格納する
      authStore.setUser(response.data.data);

      // 取得したuser情報をCookieに格納する
      const { cookies } = useCookies();
      cookies.set("user", response.data.data);
      window.location.href = "/";
    })
    .catch((error) => {
      alert("ログインに失敗しました。再度ログインしてください。");
      window.location.href = "/";
    });
});
</script>
