<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <div v-if="loggedIn">
        <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32">
          <img :src="auth.user.image" width="32" height="32" />
        </v-avatar>

        <v-btn v-for="link in links" :key="link" variant="text">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: link.name }"
            >{{ link.name_ja }}</router-link
          >
        </v-btn>
      </div>
      <div v-else>
        <LoginButton />
      </div>

      <v-responsive max-width="260">
        <v-text-field
          density="compact"
          hide-details
          variant="solo"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import LoginButton from "@/components/parts/LoginButton.vue";

const auth = useAuthStore();

const loggedIn = computed(() => {
  return typeof auth === "object";
});

const links = [
  {
    name: "Mypage",
    name_ja: "マイページ",
  },
  {
    name: "User",
    name_ja: "ユーザーを探す",
  },
  {
    name: "Idea",
    name_ja: "アイデアを探す",
  },
];
</script>
