<!-- VuetifyのSnackbarsコンポーネントを使用 -->
<!-- https://next.vuetifyjs.com/en/components/snackbars/ -->

<template>
  <v-snackbar v-model="snackbar" :color="color" timeout="3000">{{
    message
  }}</v-snackbar>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAlertStore } from "@/stores/alert";

const snackbar = ref(false);
const message = ref("");
const color = ref("");
const alertStore = useAlertStore();

const setSnackbar = () => {
  if (alertStore.message) {
    snackbar.value = true;
    message.value = alertStore.message;
    color.value = alertStore.type;
  }
};

onMounted(setSnackbar);
alertStore.$subscribe(setSnackbar);
</script>
