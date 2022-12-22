/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#FC5C6C",
          secondary: "#ffd37e",
          accent: "#00C2DA",
          success: "#A5D6A7",
          error: "#EF9A9A",
          warning: "#EEEEEE",
          info: "#90CAF9",
          "base-color": "#191e46",
        },
      },
    },
  },
});
