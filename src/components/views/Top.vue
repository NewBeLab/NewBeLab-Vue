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
    <div id="top-color">
      <v-container style="min-height: 800px">
        <v-row justify="center" class="mt-16 pt-16">
          <div class="text-h2">How To NewBeLab?</div>
        </v-row>

        <v-container class="d-flex align-start flex-column">
          <v-row class="mt-16 ml-16 pl-16">
            <v-col>
              <p class="text-h3 mt-16">STEP 1</p>
              <p class="text-h5 mt-12">GitHub連携でログイン</p>
              <v-img src="/Tablet_login-cuate.svg" align-content="center" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex align-end flex-column">
          <v-row class="mr-12 pr-12">
            <v-col>
              <p class="text-h3">STEP 2</p>
              <p class="text-h5 mt-12">プロフィールを充実させよう</p>
              <p class="text-subtitle mt-2">
                チーム開発への意気込みや学習状況を入力しよう
              </p>
              <v-img src="/Forms-cuate.svg" width="80%" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex align-start flex-column">
          <v-row class="ml-16 pl-16">
            <v-col>
              <p class="text-h3">STEP 3</p>
              <p class="text-h5 mt-12">みんなのプロフィールをチェック</p>
              <p class="text-subtitle mt-2">
                自分の考えに近い人、遠い人、いろんな価値観に触れてみよう
              </p>
              <v-img src="/Inbox_cleanup-cuate.svg" width="80%" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex align-end flex-column">
          <v-row class="mr-12 pr-12">
            <v-col>
              <p class="text-h3">STEP 4</p>
              <p class="text-h5 mt-12">気になる人に声をかけてみよう</p>
              <p class="text-subtitle mt-2">
                Times？Twitter？それともDiscord？
              </p>
              <p class="text-subtitle mt-2">
                それぞれのやり方で声をかけてみよう
              </p>
              <v-img src="/Gen_Z-amico.svg" width="70%" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex align-start flex-column">
          <v-row class="ml-16 pl-16">
            <v-col>
              <p class="text-h3">STEP 5</p>
              <p class="text-h5 mt-12">チーム開発を楽しもう！</p>
              <p class="text-subtitle mt-6">わたしたちのサービスでは、</p>
              <p class="text-subtitle mt-2">
                あえてサービス上のチャット機能はつけていません。
              </p>
              <p class="text-subtitle mt-2">
                それぞれに合ったやり方で、一歩勇気を出して声をかけてみる。
              </p>
              <p class="text-subtitle mt-2">
                そのチャレンジの先に素晴らしいチームができることを祈っています。
              </p>
              <v-img src="/Pair_programming-rafiki.svg" />
            </v-col>
          </v-row>
        </v-container>
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
import { ref } from "vue";

const authStore = useAuthStore();
const isVisible = ref(true);

// ログイン中かどうかを返す算出プロパティ
// ログイン中であればtrueを返す
const loggedIn = computed(() => {
  return authStore.user !== null;
});

function toggleVisible() {
  isVisible.value = !isVisible.value;
}
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
iframe {
  pointer-events: none;
  z-index: 1;
}
</style>
