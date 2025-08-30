<template>
  <panel-head :route="route" />
  <div class="form">
    <el-form :inline="true" :model="searchForm">
      <el-form-item prop="out_trade_no">
        <el-input v-model="searchForm.out_trade_no" placeholder="订单号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table
    :data="tableData.list"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      prop="out_trade_no"
      label="订单号"
      width="150"
      fixed="left"
    />
    <el-table-column prop="hospital_name" label="就诊医院" />
    <el-table-column prop="service_name" label="陪诊服务" />
    <el-table-column label="陪护师头像">
      <template #default="scope">
        <el-image
          :src="scope.row.companion.avatar"
          style="width: 40px; height: 40px"
        />
      </template>
    </el-table-column>
    <el-table-column label="陪护师手机号" width="120">
      <template #default="scope">
        <span>{{ scope.row.companion.mobile }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="总价" />
    <el-table-column prop="paidPrice" label="已付" />
    <el-table-column label="下单时间" width="120">
      <template #default="scope">
        {{ dayjs(scope.row.order_start_time).format("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态">
      <template #default="scope">
        <el-tag :type="statusMap(scope.row.trade_state)">
          {{ scope.row.trade_state || "已取消" }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="service_state" label="接单状态" />
    <el-table-column prop="tel" label="联系人手机号" width="120" />
    <el-table-column label="操作" width="100" fixed="right">
      <template #default="scope">
        <el-popconfirm
          v-if="scope.row.trade_state === '待支付'"
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="是否确认完成？"
          @confirm="confirmEvent(scope.row.out_trade_no)"
        >
          <template #reference>
            <el-button type="primary" link>服务完成</el-button>
          </template>
        </el-popconfirm>
        <el-button v-else type="primary" link disabled>暂无服务</el-button>
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
</template>

<script setup>
import dayjs from "dayjs";
import { reactive, onMounted } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { adminOrder, updateOrder } from "../../../api";

const route = useRoute();
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
const searchForm = reactive({
  out_trade_no: "",
});
const onSubmit = () => {
  getLoadData(searchForm);
};

// 获取列表数据
const getLoadData = (params = {}) => {
  adminOrder({ ...paginationData, ...params }).then(({ data }) => {
    const { list, total } = data.data;
    tableData.list = list;
    tableData.total = total;
  });
};

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

const statusMap = (key) => {
  if (!key) {
    return "info";
  }

  const obj = {
    已取消: "info",
    待支付: "warning",
    已完成: "success",
  };
  return obj[key];
};

const confirmEvent = (id) => {
  updateOrder({ id }).then(({ data }) => {
    if (data.code === 10000) {
      getLoadData();
    }
  });
};

onMounted(() => {
  getLoadData();
});
</script>

<style lang="less" scoped>
.form {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
