<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <Alert />
      <h1>マイページ</h1>
      <v-card elevation="2" width="100%">
        <v-card-title>
          <v-avatar color="grey-darken-1" size="96">
            <img :src="authStore?.user?.image || ''" width="96" height="96" />
          </v-avatar>
          {{ authStore?.user?.name }}
          <v-chip v-if="!!myProfile?.grade">
            {{ `${myProfile?.grade}期生` }}
          </v-chip>
        </v-card-title>
        <v-card-subtitle>
          {{ myProfile?.selfIntroduction || "自己紹介文が設定されていません" }}
        </v-card-subtitle>
        <v-card-text>
          <div>コミット：{{ myProfile?.commitment || "未設定" }}</div>
          <div>ポジション：{{ myProfile?.position || "未設定" }}</div>
          <div>熱量：{{ myProfile?.motivation || "未設定" }}</div>
          <div>フェーズ：{{ myProfile?.phase || "未設定" }}</div>
          <div>好きなエディタ：{{ myProfile?.editor || "未設定" }}</div>
          <div v-if="myProfile?.timesLink">
            Mattermost URL：<a :href="defaultTimesUrl + myProfile?.timesLink">{{
              defaultTimesUrl + myProfile?.timesLink
            }}</a>
          </div>
          <div v-else>Mattermost URL：未設定</div>
        </v-card-text>
        <v-card-text>
          <v-chip v-for="tag in myProfile.tags">
            {{ tag }}
          </v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" :to="{ name: 'Profile' }">
            プロフィール編集
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";
import { useAuthStore } from "@/stores/auth";
import { toUnderscoreCase } from "@/plugins/convert";

const authStore = useAuthStore();
const axios = inject("axios");
const myProfile = reactive({
  selfIntroduction: "",
  grade: "",
  commitment: "",
  position: "",
  motivation: "",
  phase: "",
  editor: "",
  timesLink: "",
  tags: [],
});
const defaultTimesUrl = "https://chat.runteq.jp/runteq/channels/";

onMounted(() => {
  // 自分のプロフィール情報を取得
  axios
    .get(`/profiles/${authStore.user.id}`)
    .then((response) => {
      Object.keys(myProfile).forEach((key) => {
        if (key === "tags") {
          myProfile[key] = response.data[key].map((obj) => obj.name);
        } else {
          myProfile[key] = response.data.profile[toUnderscoreCase(key)];
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
