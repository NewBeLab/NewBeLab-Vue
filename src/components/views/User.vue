<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <Alert />
      <h1>User</h1>
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
