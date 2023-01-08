import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: null,
    type: null, //success, errorの2種類
  }),
  actions: {
    setAlert(message, type = "success") {
      this.message = message;
      this.type = type;

      // 3000ミリ秒が経過するとリセットされる
      setTimeout(() => {
        this.$reset();
      }, 3000);
    },
  },
});
