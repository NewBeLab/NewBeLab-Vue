import { createRouter, createWebHistory } from "vue-router";
import Callback from "@/components/views/Callback.vue";
import Top from "@/components/views/Top.vue";
import Mypage from "@/components/views/Mypage.vue";
import User from "@/components/views/User.vue";
import Idea from "@/components/views/Idea.vue";

const routes = [
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/idea",
    name: "Idea",
    component: Idea,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
