import { createRouter, createWebHistory } from "vue-router";
import Callback from "@/components/views/Callback.vue";
import Top from "@/components/views/Top.vue";
import Mypage from "@/components/views/Mypage.vue";
import User from "@/components/views/User.vue";
import Idea from "@/components/views/Idea.vue";
import Profile from "@/components/views/Profile.vue";
import { useAuthStore } from "@/stores/auth";
import { useAlertStore } from "@/stores/alert";

const requireAuth = async (to, from, next) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  if (!authStore?.user) {
    alertStore.setAlert("ログインしてください", "error");
    next({ name: "Top" });
    return;
  } else {
    next();
  }
};

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
    beforeEnter: requireAuth,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    beforeEnter: requireAuth,
  },
  {
    path: "/idea",
    name: "Idea",
    component: Idea,
    beforeEnter: requireAuth,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
