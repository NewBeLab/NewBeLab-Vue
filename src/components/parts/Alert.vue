<!-- VuetifyのAlertsコンポーネントを使用 -->
<!-- https://next.vuetifyjs.com/en/components/alerts/ -->

<template>
  <div v-if="hasAlertMessage">
    <v-alert :color="alertColor" :type="alertStore.type">{{
      alertStore.message
    }}</v-alert>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAlertStore } from "@/stores/alert";

const alertStore = useAlertStore();

const hasAlertMessage = computed(() => {
  return alertStore.message !== null;
});

const alertColor = computed(() => {
  if (alertStore.type === "success") {
    return "green";
  } else if (alertStore.type === "info") {
    return "blue";
  } else if (alertStore.type === "warning") {
    return "orange";
  } else {
    //alertStore.type === "error"
    return "red";
  }
});
</script>
