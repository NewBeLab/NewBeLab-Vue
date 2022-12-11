<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <p class="text-h4 text-center my-12" style="color: blueviolet;">🏋️おともだち候補ズ🏋️</p>

      <v-row>
        <v-col v-for="user in users" :key="user" cols="12">
          <v-card>
            <v-card-title class="ml-2">
              <!-- アバターイメージ・名前・グレードの表示部分 -->
              <v-row>
                <v-col cols="3" md="1" sm="2" xs="2" class="mt-1 pr-0">
                  <v-avatar size="60">
                    <img :src="user.image" />
                  </v-avatar>
                </v-col>
                <v-col cols="8" md="11" sm="10" xs="10" class="pl-0">
                  <h3 class="ml-2 mt-4">{{ user.name }} 
                    <span>（{{ user.profile.grade }}期）</span>
                  </h3>
                </v-col>
              </v-row>
            </v-card-title>
            <!-- ディバイダー -->
            <v-divider insent class="mx-3 mt-3" />
            <!-- profile情報 -->
            <v-card-text>
              <p class="text-h6">可能なコミット　：{{ user.profile.commitment }}</p>
              <p class="text-h6">希望ポジション　：{{ user.profile.position }}</p>
              <p class="text-h6">チーム開発の動機：{{ user.profile.motivation }}</p>
              <p class="text-h6">学習フェーズ　　：{{ user.profile.phase }}</p>
              <p class="text-h6">使用エディター　：{{ user.profile.editor }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import Header from "@/components/parts/Header.vue";

const axios = inject("axios");
// usersを保持するためのリアクティブな変数を定義
const users = ref([]);
// ページが表示されたら/usersを叩く
onMounted(() => {
  axios
    .get("/profiles")
    .then((response) => { users.value = response.data })
    .catch((error) => { alert("ユーザーの取得に失敗しました。") });
});

</script>