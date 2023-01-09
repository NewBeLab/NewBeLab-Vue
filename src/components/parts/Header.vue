<template>
  <v-app-bar flat id="header-gradient">
    <v-container class="fill-height d-flex align-center">
      <!-- 共通ヘッダー -->
      <v-app-bar-title>
        <router-link
          :to="{ name: 'Top' }"
          style="text-decoration: none; color: inherit"
          >NewBeLab</router-link
        >
      </v-app-bar-title>
      <!-- 共通ヘッダーここまで -->
      <div v-if="loggedIn">
        <!-- ログイン時のヘッダー -->
        <v-avatar class="mr-4 ml-10" color="grey-darken-1" size="32">
          <img
            :src="!!authStore.user ? authStore.user.image : ''"
            width="32"
            height="32"
          />
        </v-avatar>

        <v-btn v-for="link in links" :key="link" variant="text">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: link.name }"
            >{{ link.name_ja }}</router-link
          >
        </v-btn>

        <v-btn variant="text" @click="logout()">ログアウト</v-btn>
        <!-- ログイン時のヘッダーここまで -->
      </div>
      <div v-else>
        <!-- 非ログイン時のヘッダー -->
        <LoginButton />
        <!-- 非ログイン時のヘッダーここまで -->
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAlertStore } from "@/stores/alert";
import { removeCookie } from "@/plugins/cookie";
import LoginButton from "@/components/parts/LoginButton.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

// ログイン中かどうかを返す算出プロパティ
// ログイン中であればtrueを返す
const loggedIn = computed(() => {
  return authStore.user !== null;
});

// ログアウト処理
// ログアウトのリンクをクリックすると発火する
const axios = inject("axios");
const logout = () => {
  axios
    .delete("/auth/sign_out")
    .then(() => {
      // authStoreとCookieを削除
      authStore.logout();
      removeCookie();
      // Topへ遷移
      alertStore.setAlert("ログアウトしました");
      router.push("/");
    })
    .catch((error) => {
      // 強制ログアウト
      // 何らかの事情でCookieが消えてしまったとき
      authStore.logout();
      removeCookie();
      alertStore.setAlert("ログアウトしました");
      router.push("/");
    });
};

// ログイン中に表示させるリンク一覧
const links = [
  {
    name: "Mypage",
    name_ja: "マイページ",
  },
  {
    name: "User",
    name_ja: "ユーザーを探す",
  },
  /*{
    name: "Idea",
    name_ja: "アイデアを探す",
  },*/
];
</script>

<style>
#header-gradient {
  background: linear-gradient(to right, #ffe6e9, #c3b1ff, #22cadf);
}
</style>
