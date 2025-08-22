<template>
  <h1>用户登录</h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.userName"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.passWord"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" round block native-type="submit"
        >提交</van-button
      >
    </div>
  </van-form>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";

// 获取当前实例
const { proxy } = getCurrentInstance();

// 表单数据
const form = reactive({
  userName: "",
  passWord: "",
});

// 表单校验
const onSubmit = async () => {
  const { data } = await proxy.$api.login(form);
  console.log(data);
  if (data.code === 10000) {
    // 将token和用户信息缓存到浏览器
    localStorage.setItem("h5_token", data.data.token);
    localStorage.setItem("h5_userInfo", JSON.stringify(data.data.userInfo));
  }
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.btn {
  margin: 16px;
}
</style>
