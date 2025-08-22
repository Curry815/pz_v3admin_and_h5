import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import PanelHead from "./components/PanelHead.vue";

// 刷新后的动态路由添加
const localData = localStorage.getItem("pz_v3pz");
if (localData) {
  store.commit("dynamicMenu", JSON.parse(localData).menu.routerList);
  store.state.menu.routerList.forEach((item) => {
    router.addRoute("main", item);
  });
}

// 路由前置导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("pz_token");
  // 非登录页token不存在
  if (!token && to.path !== "/login") {
    return next("/login");
  } else if (token && to.path === "/login") {
    return next("/");
  } else {
    return next();
  }
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("PanelHead", PanelHead);

// 路由挂载
app.use(router);
// store挂载
app.use(store);
app.mount("#app");
