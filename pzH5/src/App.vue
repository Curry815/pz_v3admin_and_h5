<template>
  <router-view />
  <van-tabbar v-model="active" v-if="!shouldHideTabbar">
    <van-tabbar-item
      v-for="item in router.options.routes[0].children"
      :key="item.path"
      :icon="item.meta.icon"
      :url="`#/${item.path}`"
      >{{ item.meta.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const active = ref(0);
const router = useRouter();
const route = useRoute();

// 判断是否应该隐藏 tabbar
const shouldHideTabbar = computed(() => {
  return route.path === "/createOrder" || route.path === "/detail";
});

onMounted(() => {
  const data = router.options.routes[0];
  active.value = data.children.findIndex(
    (item) => "/" + item.path === route.path
  );
});
</script>

<style scoped></style>
