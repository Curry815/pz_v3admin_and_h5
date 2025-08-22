<template>
  <panel-head :route="route" />
  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="permissions_id" label="所属组别">
      <template #default="scope">
        {{ permissionName(scope.row.permissions_id) }}
      </template>
    </el-table-column>
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.active ? 'success' : 'danger'">{{
          scope.row.active ? "正常" : "失效"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间">
      <template #default="scope">
        <div class="flex-box">
          <el-icon><Clock /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-info">
    <el-pagination
      v-model:current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize"
      :background="false"
      size="small"
      layout="total, prev, pager, next"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-dialog
    v-model="dialogFormVisible"
    title="添加权限"
    width="500"
    :before-close="beforeClose"
  >
    <el-form
      ref="formRef"
      label-width="100px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissions_id">
        <el-select
          v-model="form.permissions_id"
          placeholder="请选择菜单权限"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        /></el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirm(formRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { authAdmin, menuSelectList, updateUser } from "../../../api";

const formRef = ref();
const route = useRoute();
// 弹窗的显示隐藏
const dialogFormVisible = ref(false);
// 列表数据
const tableData = reactive({
  list: [],
  total: 0,
});
// 分页信息
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 表单数据
const form = reactive({
  name: "",
  permissions_id: "",
});
const options = ref([]);

// 表单校验
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请填写昵称" }],
  permissions_id: [
    { required: true, trigger: "blur", message: "请选择菜单权限" },
  ],
});

// 点击页码
const handleSizeChange = (val) => {
  paginationData.pageSize = val;
  getLoadData();
};
// 点击当前页
const handleCurrentChange = (val) => {
  paginationData.pageNum = val;
  getLoadData();
};

// 根据权限id匹配权限名称
const permissionName = (id) => {
  const data = options.value.find((item) => item.id === id);
  return data ? data.name : "超级管理员";
};

// 打开弹窗
const open = (rowData = {}) => {
  dialogFormVisible.value = true;
  Object.assign(form, {
    mobile: rowData.mobile,
    name: rowData.name,
    permissions_id: rowData.permissions_id,
  });
};

// 关闭弹窗的回调
function beforeClose() {
  dialogFormVisible.value = false;
  // 重置表单
  formRef.value.resetFields();
}

// 表单提交
const confirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateUser(form).then(({ data }) => {
        if (data.code == 10000) {
          beforeClose();
          getLoadData();
        } else {
          ElMessage.error(data.msg);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const getLoadData = () => {
  authAdmin(paginationData).then(({ data }) => {
    const { list, total } = data.data;
    list.forEach((item) => {
      item.create_time = dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss");
    });
    tableData.list = list;
    tableData.total = total;
  });
};

onMounted(() => {
  getLoadData();
  menuSelectList().then(({ data }) => {
    options.value = data.data;
  });
});
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>
