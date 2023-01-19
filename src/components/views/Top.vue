<template>
  <Header />
  <v-main>
    <Alert />
    <div id="top-image">
      <v-container>
        <v-row align-content="center" style="min-height: 800px">
          <v-col align="center">
            <div class="text-h3">NewBeLabとは</div>
            <div class="text-h5 mt-10">
              <p>
                初心者を意味する"Newbie"と、研究室を意味する"Lab"を合わせた造語です。
              </p>
              <p class="mt-2">
                チーム開発に興味はあるけど一歩踏み出せない駆け出しエンジニアをそっと支援すること。
              </p>
              <p class="mt-12">
                そして、新たな価値を生み出すラボを作り出すような
              </p>
              <p class="mt-2">
                そんなサービスでありたいという願いを込めています。
              </p>
            </div>
            <div v-if="!loggedIn" class="mt-16">
              <LoginButton class="mb-0 pb-0" />
              <v-row justify="center">
                <iframe
                  src="https://giphy.com/embed/l2QZSDxJmnQKc16a4"
                  width="12%"
                  height="35%"
                  frameBorder="0"
                >
                </iframe>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- <div id="top-color">
      <v-container>
        <v-row align-content="center" style="min-height: 800px">
          <v-col align="center">
            <div class="text-h2">How To NewBeLab?</div>
            <p class="text-h3 mt-16">
              ステップ１
            </p>
            <div class="text-h5 mt-12">
            <p>
              自分のプロフィールを充実させよう！
            </p>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </div> -->
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
/* iframeで表示しているgifをクリックした際に、ページ遷移しないようにCSSをあてている */
iframe{
  pointer-events:none;
  z-index: 1;
}
</style>
