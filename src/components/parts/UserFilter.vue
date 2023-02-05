<template>
  <v-expansion-panels class="py-10">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-row>
          <v-col cols="3"><p class="text-h6">ユーザー検索</p></v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row justify="center">
          <v-col cols="12" sm="6" lg="3">
            <v-select
              v-model="searchCommitment"
              :items="commitments"
              label="コミット"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-select
              v-model="searchMotivation"
              :items="motivation"
              label="熱量"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-select
              v-model="searchPosition"
              :items="positions"
              label="ポジション"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-select
              v-model="searchPhase"
              :items="phase"
              label="フェーズ"
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col offset="11">
            <v-btn color="primary" @click="$emit('searchFilterProfiles', query)"
              >検索</v-btn
            >
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, watch } from "vue";

const searchCommitment = ref("");
const searchMotivation = ref("");
const searchPosition = ref("");
const searchPhase = ref("");

const query = ref({});

const commitments = ["週1回", "週2〜3回", "週4〜5回", "毎日"];

const positions = [
  "バックエンド",
  "フロントエンド",
  "レビュー",
  "アドバイザー",
  "希望なし",
];

const motivation = [
  "ガチで作成したい",
  "ゆるく楽しく作成したい",
  "サポートしたい",
];

const phase = ["カリキュラム中", "PF作成中", "就活中", "現役エンジニア"];

watch(
  () => [
    searchCommitment.value,
    searchMotivation.value,
    searchPosition.value,
    searchPhase.value,
  ],
  () => {
    query.value = {
      commitment_cont: searchCommitment.value,
      motivation_cont: searchMotivation.value,
      position_cont: searchPosition.value,
      phase_cont: searchPhase.value,
    };
  }
);
</script>
