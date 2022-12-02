<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card class="elevation-1 pa-3">
          <v-btn :href="GITHUB_URL">
            GitHubログイン
          </v-btn>
        </v-card>
    </v-layout>
  </v-container>
</template>
 
<script setup>
// 認証用のURLを定数として定義し、v-btnのhref属性にバインドする
// 認証に成功すると、callbackページにリダイレクトされる
const GITHUB_URL = 
  import.meta.env.VITE_BASE_URL + 
  'auth/github?auth_origin_url=' + 
  import.meta.env.VITE_SERVICE_URL + 'callback'

</script>