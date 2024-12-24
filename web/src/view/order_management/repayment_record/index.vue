<template>
    <div>
        <!-- 搜索模块 -->
        <div class="gva-search-box">
            <el-form ref="searchForm" :inline="true" :model="searchInfo">
                <el-form-item label="还款计划ID">
                    <el-input v-model="searchInfo.orderNumber" placeholder="还款计划ID" />
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择产品名称">
                        <el-option label="one" value="纯新" />
                        <el-option label="two" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="User ID">
                    <el-input v-model="searchInfo.orderNumber" placeholder="User ID" />
                </el-form-item>
                <el-form-item label="APP">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择APP">
                        <el-option label="app1" value="纯新" />
                        <el-option label="app2" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="订单编号" />
                </el-form-item>
                <el-form-item label="支付单号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="支付单号" />
                </el-form-item>
                <el-form-item label="平台单号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="平台单号" />
                </el-form-item>
                <el-form-item label="还款方式">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择还款方式">
                        <el-option label="纯新" value="纯新" />
                        <el-option label="复货" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="还款状态">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择还款状态">
                        <el-option label="one" value="已还款" />
                        <el-option label="two" value="未还款" />
                    </el-select>
                </el-form-item>
                <el-form-item label="还款回调时间">
                    <el-col :span="11">
                        <el-date-picker v-model="searchInfo.dateFirst" type="date" placeholder="Pick a date"
                            style="width: 100%" />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="searchInfo.dateLast" type="date" placeholder="Pick a date"
                            style="width: 100%" />
                    </el-col>
                </el-form-item>
                <el-form-item label="还款码">
                    <el-input v-model="searchInfo.orderNumber" placeholder="还款码" />
                </el-form-item>
                <el-form-item label="还款类型">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择还款类型">
                        <el-option label="类型1" value="类型1" />
                        <el-option label="类型2" value="类型2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="支付类型">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择支付类型">
                        <el-option label="类型1" value="类型1" />
                        <el-option label="类型2" value="类型2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="search" @click="onSubmit">
                        搜索
                    </el-button>
                    <el-button type="warning" icon="refresh" class="" @click="onReset"> 重置 </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 数据表格模块 -->
        <div class="gva-table-box">
            <el-table :data="tableData">
                <el-table-column align="center" label="还款计划ID" min-width="150" prop="ID" />
                <el-table-column align="center" label="产品名称" min-width="150" prop="userName" />
                <el-table-column align="center" label="用户姓名" min-width="150" prop="nickName" />
                <el-table-column align="center" label="手机号码" min-width="150" prop="phone" />
                <el-table-column align="center" label="User ID" min-width="150" prop="email" />
                <el-table-column align="center" label="APP" min-width="150" />

                <!-- 被遮挡了，不确定字段 -->
                <el-table-column align="center" label="订单编号" min-width="150" />
                <el-table-column align="center" label="订单编号" min-width="150" />
                <el-table-column align="center" label="订单编号" min-width="150" />
                <el-table-column align="center" label="订单编号" min-width="150" />
                <el-table-column align="center" label="订单编号" min-width="150" />


                <el-table-column align="center" label="还款方式" min-width="150" />
                <el-table-column align="center" label="还款类型" min-width="150" />
                <el-table-column align="center" label="还款码" min-width="150" />
                <el-table-column align="center" label="应还金额" min-width="150" />
                <el-table-column align="center" label="有效期" min-width="150" />
                <el-table-column align="center" label="还款状态" min-width="150" />
                <el-table-column align="center" label="入账金额" min-width="150" />
                <el-table-column align="center" label="优惠券金额" min-width="150" />

                <el-table-column label="操作" :min-width="appStore.operateMinWith" fixed="right" align="center">
                    <template #default="scope">
                        <el-button @click="editApiFunc(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gva-pagination">
                <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" />
            </div>
        </div>

        <!-- 点击查看的弹窗 -->
        <el-dialog v-model="dialogFormVisible" :size="appStore.drawerSize" :before-close="closeDialog"
            :show-close="false" class="custom-dialog">
            <template #header>
                <div class="flex justify-center items-center">
                    <span class="text-lg">{{ dialogTitle }}</span>
                </div>
            </template>
            <el-table :data="form">
                <el-table-column align="center" label="还款记录id" min-width="150" prop="a" />
                <el-table-column align="center" label="支付单号" min-width="150" prop="b" />
                <el-table-column align="center" label="还款金额" min-width="150" prop="c" />
                <el-table-column align="center" label="创建时间" min-width="150" prop="d" />
            </el-table>
            <template #footer>
                <div class="flex justify-center items-center">
                    <div>
                        <el-button type="primary" @click="closeDialog"> 关 闭 </el-button>
                    </div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { useAppStore } from "@/pinia";
import { ref } from 'vue';

const page = ref(1)
const total = ref(5)
const pageSize = ref(10)
const appStore = useAppStore();

const tableData = ref([
    { ID: 1 },
    { ID: 2 },
    { ID: 3 },
    { ID: 4 },
    { ID: 5 },
]);
const searchInfo = ref({
    orderLabel: '',
    orderNumber: '',
    userID: '',
    phone: '',
    orderID: '',
    appName: '',
    rate: '',
    dateFirst: '',
    dateLast: '',
    orderState: ''
});

/* 重置按钮 */
const onReset = () => {
    searchInfo.value = {
        orderLabel: '',
        orderNumber: '',
        userID: '',
        phone: '',
        orderID: '',
        appName: '',
        rate: '',
        dateFirst: '',
        dateLast: '',
        orderState: ''
    }
    //需要重新加载页面
}

/* 条件查询 */
const onSubmit = () => {
    page.value = 1
    //重新加载页面，由加载页面的方法自己获取条件查询的数据
}
const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
}

// 分页
const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
}

// 查看弹出窗
const dialogTitle = ref('还款回调记录');
const form = ref([]);
const initForm = () => {
    form.value = [{
        a: '',
        b: '',
        c: '',
        d: ''
    }]
}
const editApiFunc = async () => {
    form.value = [{
        a: '1069977',
        b: '462184489576',
        c: '9000',
        d: '2024-09-11 07:37:26'
    }];
    openDialog()
}

const dialogFormVisible = ref(false)
const openDialog = () => {
    dialogFormVisible.value = true
}
const closeDialog = () => {
    initForm()
    dialogFormVisible.value = false
}
</script>
<style>
.custom-dialog {
    max-width: 650px;
    /* 设置对话框的最大宽度 */
}
</style>