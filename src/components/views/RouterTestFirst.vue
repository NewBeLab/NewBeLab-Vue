<template>
  <div>
    <h1>test1</h1>
    <router-link to="/second">次のページ</router-link>
    <br>
    <router-link to="/login">ログイン</router-link>
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue'
// setCookieを使うために、cookie.jsをインポート
import { setCookie } from '@/plugins/cookie'

onMounted( () => {
  setCookie();
});
</script>