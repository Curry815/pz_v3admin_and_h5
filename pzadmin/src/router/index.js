import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/Main.vue";
import Login from "../views/login/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    name: "main",
    redirect: (to) => {
      const localData = localStorage.getItem("pz_v3pz");
      if (localData) {
        // 有子菜单的情况
        const child = JSON.parse(localData).menu.routerList[0].children;
        if (child && child.length > 0) {
          return child[0].meta.path;
        } else {
          return JSON.parse(localData).menu.routerList[0].meta.path;
        }
      } else {
        return "/login";
      }
    },
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
