<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container fill-height>
      <p class="text-h4 text-center my-12" style="color: blueviolet;">🏋️おともだち候補ズ🏋️</p>

      <v-row jusityf-center>
        <v-col v-for="user in users" :key="user" cols="12" jusityf-center>
          <!-- アバターイメージ・名前・グレードの表示部分 -->
          <v-row justify="between">
            <v-col cols="3" md="2" sm="3" xs="1" class="pl-16 mr-0 pr-0" align-self="center">
              <v-avatar size="120">
                <img :src="user.image" width="120" height="120" />
              </v-avatar>
            </v-col>
            
            <!-- ディバイダー -->
            <v-divider vertical class="mb-2 mt-12" />
            <!-- <v-spacer /> -->

            <v-col cols="10" md="9" sm="9" xs="5" class="pl-12">
              <p class="text-h5 ml-2 mt-4 mb-3">{{ user.name }}
                <span>（{{ user.profile.grade }}期）</span>
              </p>
              <!-- profile情報 -->
              <v-row>
                <v-col cols="6">
                  <p class="text-h6">可能なコミット　：{{ user.profile.commitment }}</p>
                </v-col>
                <v-col cols="6">
                  <p class="text-h6">希望ポジション　：{{ user.profile.position }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <p class="text-h6">チーム開発の動機：{{ user.profile.motivation }}</p>
                </v-col>
                <v-col cols="6">
                  <p class="text-h6">学習フェーズ　　：{{ user.profile.phase }}</p>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
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