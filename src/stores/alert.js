import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: null,
    type: null, //success, info, warning, errorの4種類
  }),
  actions: {
    setAlert(message, type = "success", timeout = 3000) {
      this.message = message;
      this.type = type;

      // timeoutミリ秒が経過するとリセットされる
      setTimeout(() => {
        this.$reset();
      }, timeout);
    },
  },
});
