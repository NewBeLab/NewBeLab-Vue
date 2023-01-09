<template>
  <Header />
  <v-main>
    <v-container>
      <Alert />
      <h1>ユーザーを探す</h1>
    </v-container>
  </v-main>
</template>

<script>
import Header from "@/components/parts/Header.vue";
import Alert from "@/components/parts/Alert.vue";

export default {
  components: { Header },
};
</script>
