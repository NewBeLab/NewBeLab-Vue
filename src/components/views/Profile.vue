<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <Alert />
      <h1>プロフィール編集</h1>
      <v-form>
        <v-text-field
          v-model="myProfile.selfIntroduction"
          :counter="100"
          label="自己紹介文"
        ></v-text-field>
        <v-text-field v-model="myProfile.grade" label="何期生か"></v-text-field>
        <v-select
          v-model="myProfile.commitment"
          :items="commitmentItems"
          label="どのくらいコミットできるか"
        ></v-select>
        <v-select
          v-model="myProfile.position"
          :items="positionItems"
          label="どのポジションでチーム開発に関わりたいか"
        ></v-select>
        <v-select
          v-model="myProfile.motivation"
          :items="motivationItems"
          label="どれくらいの熱量でチーム開発に関わりたいか"
        ></v-select>
        <v-select
          v-model="myProfile.phase"
          :items="phaseItems"
          label="どのフェーズか"
        ></v-select>
        <v-select
          v-model="myProfile.editor"
          :items="editorItems"
          label="好きなエディタ"
        ></v-select>
        <v-text-field
          v-model="myProfile.timesLink"
          :counter="100"
          label="MattermostのtimesのURL"
        ></v-text-field>
        <v-btn class="mr-2" color="success" @click="submit"> 更新 </v-btn>
        <v-btn :to="{ name: 'Mypage' }"> 戻る </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";
import { useAuthStore } from "@/stores/auth";
import { useAlertStore } from "@/stores/alert";
import { useRouter } from "vue-router";
import { toCamelCaseObject, toUnderscoreCaseObject } from "@/plugins/convert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const axios = inject("axios");
const router = useRouter();
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

const commitmentItems = ["週1回", "週2〜3回", "週4〜5回", "毎日"];
const positionItems = [
  "バックエンド",
  "フロントエンド",
  "レビュー",
  "アドバイザー",
  "希望なし",
];
const motivationItems = [
  "ガチで作成したい",
  "ゆるく楽しく作成したい",
  "サポートしたい",
];
const phaseItems = ["カリキュラム中", "PF作成中", "就活中", "現役エンジニア"];
const editorItems = [
  "Visual Studio Code",
  "Atom",
  "Vim",
  "NoEditor",
  "Sublime Text",
];

const submit = () => {
  // 値が入っていないパラメータを省く
  const params = Object.entries(myProfile.value).reduce((prev, next) => {
    const [key, value] = next;
    if (!!value) {
      prev[key] = value;
    }
    return prev;
  }, {});
  console.log(params);
  axios
    .patch(`/profiles/${authStore.user.id}`, {
      profile: toUnderscoreCaseObject(params),
    })
    .then(() => {
      alertStore.setAlert("プロフィールを更新しました");
      router.push("/mypage");
    })
    .catch((error) => {
      alertStore.setAlert("プロフィールの更新に失敗しました", "error");
      console.log(error);
    });
};
</script>
