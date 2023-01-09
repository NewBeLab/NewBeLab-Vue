<template>
  <Header />
  <v-main>
    <Alert />
    <div id="top-image">
      <v-container>
        <v-row align-content="center" style="min-height: 800px">
          <v-col align="center">
            <div class="text-h3">見出し見出し見出し</div>
            <div class="text-subtitle-1">
              この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を
            </div>
            <div v-if="!loggedIn"><LoginButton /></div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="top-color">
      <v-container>
        <v-row align-content="center" style="min-height: 800px">
          <v-col align="center">
            <div class="text-h3">見出し見出し見出し</div>
            <div class="text-subtitle-1">
              この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-main>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import Header from "@/components/parts/Header.vue";
import LoginButton from "@/components/parts/LoginButton.vue";
import Alert from "@/components/parts/Alert.vue";

const authStore = useAuthStore();

// ログイン中かどうかを返す算出プロパティ
// ログイン中であればtrueを返す
const loggedIn = computed(() => {
  return authStore.user !== null;
});
</script>

<style>
#top-image {
  background-image: url("/AdobeStock_262216616.jpg");
  background-color: rgba(255, 255, 255, 0.9);
  background-blend-mode: lighten;
  background-size: cover;
}
#top-color {
  background: #ffe6e9;
}
</style>
