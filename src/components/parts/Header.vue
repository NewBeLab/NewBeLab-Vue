<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar>

      <v-btn v-for="link in links" :key="link" variant="text">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: link.name }"
          >{{ link.name_ja }}</router-link
        >
      </v-btn>

      <v-responsive max-width="260">
        <v-text-field
          density="compact"
          hide-details
          variant="solo"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "Mypage",
          name_ja: "マイページ",
        },
        {
          name: "User",
          name_ja: "ユーザーを探す",
        },
        {
          name: "Idea",
          name_ja: "アイデアを探す",
        },
      ],
    };
  },
};
</script>
