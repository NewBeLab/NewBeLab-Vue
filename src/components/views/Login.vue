<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card class="elevation-1 pa-3">
          <v-btn :href="githubUrl">
            GitHubログイン
          </v-btn>
          <v-btn :href="testUrl">
            テストログイン
          </v-btn>
        </v-card>
    </v-layout>
  </v-container>
</template>
 
<script>
  export default {
    name: 'Login',
    data: () => ({
      github: {
        url: "http://localhost:3000/api/v1/auth/github",
        redirectUrl: "http://localhost:8080/callback"
      },
      testUrl: "http://localhost:3000/api/v1/auth/sessions"
    }),
    computed: {
      githubUrl() {
        return `${this.github.url}?auth_origin_url=${this.github.redirectUrl}`
      }
    }
  }
</script>
