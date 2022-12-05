<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <h1>Top</h1>
      <div v-if="!loggedIn"><LoginButton /></div>
    </v-container>
  </v-main>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import Header from "@/components/parts/Header.vue";
import LoginButton from "@/components/parts/LoginButton.vue";

const authStore = useAuthStore();

// ログイン中かどうかを返す算出プロパティ
// ログイン中であればtrueを返す
const loggedIn = computed(() => {
  return authStore.user !== null;
});
</script>
