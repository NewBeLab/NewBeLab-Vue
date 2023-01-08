<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <Alert />
      <h1>プロフィール編集</h1>
      <v-form ref="form">
        <v-text-field
          v-model="myProfile.selfIntroduction"
          :counter="100"
          label="自己紹介文"
          :rules="[lessThan100CharactersValidation]"
        ></v-text-field>
        <v-text-field
          v-model="myProfile.grade"
          label="何期生か"
          :rules="[numberValidation]"
          suffix="期生"
        ></v-text-field>
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
          :counter="50"
          label="MattermostのtimesのURL"
          :rules="[lessThan50CharactersValidation, urlValidation]"
          prefix="https://chat.runteq.jp/runteq/channels/"
        ></v-text-field>
        <v-combobox
          v-model="myProfile.tags"
          :items="tagItems"
          chips
          clearable
          label="タグ"
          multiple
          prepend-icon="mdi-filter-variant"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
            >
              {{ item }}
            </v-chip>
          </template>
        </v-combobox>
        <v-btn class="mr-2" color="success" @click="submit"> 更新 </v-btn>
        <v-btn :to="{ name: 'Mypage' }"> 戻る </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { inject, onMounted, ref, reactive, watch } from "vue";
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";
import { useAuthStore } from "@/stores/auth";
import { useAlertStore } from "@/stores/alert";
import { useRouter } from "vue-router";
import { toUnderscoreCase, toUnderscoreCaseObject } from "@/plugins/convert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const axios = inject("axios");
const router = useRouter();
const form = ref(null);
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

// フォームの選択肢
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
const tagItems = ref([]);

// バリデーション
const lessThan100CharactersValidation = (value) =>
  !value || value.length <= 100 || "100文字以下で入力してください";
const lessThan50CharactersValidation = (value) =>
  !value || value.length <= 50 || "50文字以下で入力してください";
const numberValidation = (value) =>
  !value || /^[0-9]+$/.test(value) || "半角数字で入力してください";
const urlValidation = (value) =>
  !value ||
  /[\w/:%#\$&\?\(\)~\.=\+\-]+$/.test(value) ||
  "正しいURLを入力してください";

// timesLinkを監視して、先頭にURLの共通部分が含まれていれば削除する
watch(
  () => myProfile.timesLink,
  () => {
    const defaultTimesUrl = "https://chat.runteq.jp/runteq/channels/";
    if (myProfile.timesLink?.startsWith(defaultTimesUrl)) {
      myProfile.timesLink = myProfile.timesLink.replace(defaultTimesUrl, "");
    }
  }
);

onMounted(() => {
  // タグ一覧を取得
  axios
    .get(`/tags`)
    .then((response) => {
      Object.keys(response.data).forEach((key) => {
        tagItems.value.push(response.data[key].name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
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

const submit = () => {
  form.value.validate().then((data) => {
    if (!data.valid) {
      // バリデーションに失敗した場合
      alertStore.setAlert("プロフィールの更新に失敗しました", "error");
      return;
    }
    // バリデーションに成功した場合
    // パラメータの変換
    const params = Object.entries(myProfile).reduce((prev, next) => {
      const [key, value] = next;
      if (key === "tags") {
        prev[key] = value.join(",");
      } else {
        prev[key] = value;
      }
      return prev;
    }, {});
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
      });
  });
};
</script>
