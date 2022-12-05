<template>
  <v-container 
    fluid 
    fill-height
  >
      <v-row 
        justify="center" 
        align-content="center" 
        style="height: 500px;"
      >
        <v-card 
          class="elevation-12" 
          width="40vh"
          rounded
        >
          <v-toolbar 
            color="rgba(252,92,108,0.15)"
            dark 
            flat
          >
            <v-toolbar-title 
              class="flex text-center"
            >
              ログイン/ 新規登録
            </v-toolbar-title>
          </v-toolbar>

          <v-row justify="center" class="pt-7 mb-12">
            <iframe src="https://giphy.com/embed/l2QZSDxJmnQKc16a4" width="100%" height="35%" style="position:absolute" frameBorder="0" class="giphy-embed"></iframe>
          </v-row>
          <v-card-text>
            <!-- ログインボタン -->
            <v-btn
              :href="GITHUB_URL"
              color="rgba(252,92,108,0.15)"
              block
              large
              rounded
              class="white--text mb-5 mt-10"
            >
              <v-icon size="large">mdi-github</v-icon>
              Login with Github
            </v-btn>
          </v-card-text>

        </v-card>
      </v-row>
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
