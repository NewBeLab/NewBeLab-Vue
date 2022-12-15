<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <Alert />
      <h1>マイページ</h1>
      <v-avatar color="grey-darken-1" size="144">
        <img
          :src="!!authStore.user ? authStore.user.image : ''"
          width="144"
          height="144"
        />
      </v-avatar>
      <v-card elevation="2">
        <v-card-title>
          {{ authStore.user.name }}
          <v-chip v-if="!!myProfile.grade">
            {{ `${myProfile.grade}期生` }}
          </v-chip>
        </v-card-title>
        <v-card-subtitle>
          {{
            !!myProfile.selfIntroduction
              ? myProfile.selfIntroduction
              : "自己紹介文が設定されていません"
          }}
        </v-card-subtitle>
        <v-card-text>
          <div>
            コミット：{{
              !!myProfile.commitment ? myProfile.commitment : "未設定"
            }}
          </div>
          <div>
            ポジション：{{
              !!myProfile.position ? myProfile.position : "未設定"
            }}
          </div>
          <div>
            熱量：{{ !!myProfile.motivation ? myProfile.motivation : "未設定" }}
          </div>
          <div>
            フェーズ：{{ !!myProfile.phase ? myProfile.phase : "未設定" }}
          </div>
          <div>
            好きなエディタ：{{
              !!myProfile.editor ? myProfile.editor : "未設定"
            }}
          </div>
          <div>
            Mattermost URL：{{
              !!myProfile.timesLink ? myProfile.timesLink : "未設定"
            }}
          </div>
        </v-card-text>
      </v-card>
      <v-btn :to="{ name: 'Profile' }" elevation="3">プロフィール編集</v-btn>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";
import { useAuthStore } from "@/stores/auth";
import { toCamelCaseObject } from "@/plugins/convert";

const authStore = useAuthStore();
const axios = inject("axios");
const myProfile = ref([]);

onMounted(() => {
  // 自分のプロフィール情報を取得
  axios
    .get(`/profiles/${authStore.user.id}`)
    .then((response) => {
      myProfile.value = toCamelCaseObject(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
