import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/Main.vue";
import Login from "../views/login/index.vue";

const localData = localStorage.getItem("pz_v3pz");

const routes = [
  {
    path: "/",
    component: Layout,
    name: "main",
    redirect: (to) => {
      if (localData) {
        // 有子菜单的情况
        const child = JSON.parse(localData).menu.routerList[0].children;
        if (child && child.length > 0) {
          return child[0].meta.path;
        } else {
          return JSON.parse(localData).menu.routerList[0].meta.path;
        }
      } else {
        return "/";
      }
    },
    children: [
      // {
      //   path: "dashboard",
      //   meta: {
      //     id: "1",
      //     name: "控制台",
      //     icon: "Platform",
      //     path: "/dashboard",
      //     describe: "用于展示当前系统中的统计数据、统计报表及重要实时数据",
      //   },
      //   component: Dashboard,
      // },
      // {
      //   path: "auth",
      //   meta: {
      //     id: "2",
      //     name: "权限管理",
      //     icon: "Grid",
      //   },
      //   children: [
      //     {
      //       path: "admin",
      //       alias: ["admin"],
      //       meta: {
      //         id: "1",
      //         name: "账号管理",
      //         icon: "Avatar",
      //         path: "/auth/admin",
      //         describe: "管理员可以进行编辑，权限修改后需要登出才会生效",
      //       },
      //       component: Admin,
      //     },
      //     {
      //       path: "group",
      //       meta: {
      //         id: "2",
      //         name: "菜单管理",
      //         icon: "Menu",
      //         path: "/auth/group",
      //         describe:
      //           "菜单规则通常对应一个控制器的方法，同时菜单栏数据也从规则中获取",
      //       },
      //       component: Group,
      //     },
      //   ],
      // },
      // {
      //   path: "vppz",
      //   meta: {
      //     id: "3",
      //     name: "DIDI陪诊",
      //     icon: "BellFilled",
      //   },
      //   children: [
      //     {
      //       path: "staff",
      //       meta: {
      //         id: "1",
      //         name: "陪护管理",
      //         icon: "People",
      //         path: "/vppz/staff",
      //         describe:
      //           "菜单规则通常对应一个控制器的方法，同时菜单栏数据也从规则中获取",
      //       },
      //       component: Staff,
      //     },
      //     {
      //       path: "order",
      //       meta: {
      //         id: "2",
      //         name: "订单管理",
      //         icon: "People",
      //         path: "/vppz/order",
      //         describe:
      //           "菜单规则通常对应一个控制器的方法，同时菜单栏数据也从规则中获取",
      //       },
      //       component: Order,
      //     },
      //   ],
      // },
    ],
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
