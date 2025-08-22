const localData = localStorage.getItem("pz_v3pz");

const state = localData
  ? localData.menu
  : {
      isCollapse: false,
      selectMenu: [],
      routerList: [],
      menuActive: "1-1",
    };

const mutations = {
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse;
  },
  addMenu(state, payload) {
    // 数据去重
    if (
      state.selectMenu.findIndex((item) => item.path === payload.path) === -1
    ) {
      state.selectMenu.push(payload);
    }
  },
  closeMenu(state, payload) {
    // 找到点击数据的索引
    const index = state.selectMenu.findIndex(
      (val) => val.name === payload.name
    );
    // 通过索引删除数组指定的元素
    state.selectMenu.splice(index, 1);
  },
  dynamicMenu(state, payload) {
    // 通过glob导入文件
    const modules = import.meta.glob("../views/**/**/*.vue");

    function routerSet(router) {
      router.forEach((route) => {
        // 判断没有子菜单，拼接路由数据
        if (!route.children || route.children.length === 0) {
          const url = `../views${route.meta.path}/index.vue`;
          // 拿到获取的vue组件
          route.component = modules[url];
        } else {
          routerSet(route.children);
        }
      });
    }

    routerSet(payload);
    // 拿到完整的路由信息
    state.routerList = payload;
  },
  updateMenuActive(state, payload) {
    state.menuActive = payload;
  },
};

export default {
  state,
  mutations,
};
