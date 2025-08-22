<template>
  <el-menu
    :style="{ width: !isCollapse ? '230px' : '64px' }"
    :collapse="isCollapse"
    :default-active="active"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <p class="logo-lg">{{ isCollapse ? "DIDI" : "DIDI陪诊" }}</p>
    <TreeMenu :index="1" :menuData="menuData" />
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import TreeMenu from "./treeMenu.vue";
import { useStore } from "vuex";

const store = useStore();
const menuData = computed(() => store.state.menu.routerList);
const isCollapse = computed(() => store.state.menu.isCollapse);
const active = computed(() => store.state.menu.menuActive);

const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  .logo-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
