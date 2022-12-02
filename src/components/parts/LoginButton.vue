<template>
  <v-btn :href="GITHUB_URL" elevation="3">GitHubログイン</v-btn>
</template>

<script setup>
// 認証用のURLを定数として定義し、v-btnのhref属性にバインドする
// 認証に成功すると、callbackページにリダイレクトされる
const GITHUB_URL =
  import.meta.env.VITE_BASE_URL +
  "auth/github?auth_origin_url=" +
  import.meta.env.VITE_SERVICE_URL +
  "callback";
</script>
