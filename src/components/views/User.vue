<template>
  <Header />
  <v-main>
    <v-container>
      <Alert />
      <p class="text-h4 my-12 ml-5">ユーザー一覧</p>
      <v-row width="100%">
        <v-col
          v-for="profile in profiles"
          :key="profile.id"
          cols="12"
          xs="12"
          sm="6"
          md="6"
          xl="6"
          class="mb-8"
        >
          <v-card
            rounded="xl"
            width="100%"
            min-width="100px"
            height="100%"
            min-height="200px"
            elevation="4"
            hover
            :class="'hover-change'"
            @click="profile.isShowProfile = !profile.isShowProfile"
          >
            <!-- アイコン -->
            <v-row justify="center">
              <v-avatar color="grey-darken-1" class="mt-8" size="25vh">
                <v-img :src="profile.image" />
              </v-avatar>
            </v-row>
            <!-- 名前 -->
            <v-row justify="center">
              <h3 class="mt-5">
                {{ profile.name }}
              </h3>
            </v-row>
            <!-- グレード -->
            <v-row justify="center">
              <v-chip class="mb-6 mt-4"
                >{{
                  profile?.profile.grade
                    ? `${profile.profile.grade}期生`
                    : "未設定"
                }}
              </v-chip>
            </v-row>
            <!-- 自己紹介文の表示部分 -->
            <v-card-title class="text-h6 ml-4 font-weight-bold">
              自己紹介
            </v-card-title>
            <p class="text-body-1 mx-8 pb-0 font-weight-thin">
              {{ profile?.profile.selfIntroduction || "未設定😭" }}
            </p>
            <v-divider insent class="mt-4 mx-6" />

            <v-card-text v-if="profile.isShowProfile" class="profile mb-0">
              <!-- profile.profileの各情報があるものだけ表示する -->
              <p class="text-body-1">
                <span class="font-weight-bold">コミット</span>：
                {{ profile?.profile.commitment || "未設定" }}
              </p>
              <p class="text-body-1">
                <span class="font-weight-bold">ポジション</span>：
                {{ profile?.profile.position || "未設定" }}
              </p>
              <p class="text-body-1">
                <span class="font-weight-bold">熱量</span>：
                {{ profile?.profile.motivation || "未設定" }}
              </p>
              <p class="text-body-1">
                <span class="font-weight-bold">フェーズ</span>：
                {{ profile?.profile.phase || "未設定" }}
              </p>
              <p class="text-body-1">
                <span class="font-weight-bold">好きなエディタ</span>：
                {{ profile?.profile.editor || "未設定" }}
              </p>
              <p class="text-body-1">
                <span class="font-weight-bold">Mattermost</span>：
                <a
                  :href="
                    'https://chat.runteq.jp/runteq/channels/' +
                    profile.profile.timesLink
                  "
                  class="text-body-1"
                  v-if="profile.profile.timesLink"
                  >{{ profile.profile.timesLink }}
                </a>
              </p>
            </v-card-text>
            <v-card-text v-else>
              <v-img
                height="100%"
                width="100%"
                :src="`https://grass-graph.appspot.com/images/${profile.username}.png`"
                class="mt-4"
              ></v-img>
              <p class="text-body-1 font-weight-bold mt-2">
                <span class="font-weight-bold mx-3">GitHub</span>：
                <a :href="`https://github.com/${profile.username}`">
                  {{ profile.username }}のGitHub
                </a>
              </p>
            </v-card-text>
            <v-card-text>
              <v-row>
                <div v-for="tag in profile.tags" :key="tag" class="px-2 mb-2">
                  <v-chip color="primary">{{ tag.name }}</v-chip>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="6"
        class="mt-5"
        @next="fetchProfiles"
        @prev="fetchProfiles"
        @click="fetchProfiles"
      >
      </v-pagination>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, ref, reactive, watch } from "vue";
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";

import { useAlertStore } from "@/stores/alert";
import { useAuthStore } from "@/stores/auth";
import { toCamelCaseObject } from "@/plugins/convert";

const alertStore = useAlertStore();
const authStore = useAuthStore();
const axios = inject("axios");
const profiles = ref([]);
const page = ref(1);
const totalPages = ref(0);

onMounted(() => {
  fetchProfiles();
});

function fetchProfiles() {
  axios
    .get("/profiles", {
      params: {
        page: page.value,
        per: 6,
      },
    })
    .then(({ data }) => {
      totalPages.value = data.total_pages;
      const filteredData = data.profiles
        .filter((user) => user.id !== authStore.user.id)
        .map((user) => {
          return {
            ...user,
            profile: toCamelCaseObject(user.profile),
            isShowProfile: true,
          };
        });
      profiles.value = filteredData;
      window.scrollTo(0, 0);
    })
    .catch((error) =>
      alertStore.setAlert(
        "エラーが発生しました。リロードしてください。",
        "error"
      )
    );
}
</script>

<style scoped>
/* プロフィール情報の横幅を統一させるためにCSSをあてている */
.profile span {
  display: inline-block;
  width: 120px;
  text-align: center;
}

/* hover時に色を変える */
.hover-change:hover {
  background-color: rgb(253, 228, 233, 0.3);
}
</style>
