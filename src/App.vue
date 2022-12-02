<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted, inject } from "vue";
// setCookieを使うために、cookie.jsをインポート
import { setCookie } from "@/plugins/cookie";

onMounted(() => {
  setCookie();
});
</script>
