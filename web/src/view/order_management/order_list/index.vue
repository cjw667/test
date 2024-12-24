<template>
    <div>
        <div class="gva-search-box">
            <el-form ref="searchForm" :inline="true" :model="searchInfo">
                <el-form-item label="订单标签">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择订单标签">
                        <el-option label="纯新" value="纯新" />
                        <el-option label="复货" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="订单编号" />
                </el-form-item>
                <el-form-item label="User ID">
                    <el-input v-model="searchInfo.userID" placeholder="UserID" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchInfo.phone" placeholder="手机号" />
                </el-form-item>
                <el-form-item label="订单ID">
                    <el-input v-model="searchInfo.orderID" placeholder="订单ID" />
                </el-form-item>
                <el-form-item label="APP">
                    <el-select v-model="searchInfo.appName" placeholder="请选择APP">
                        <el-option label="APP1" value="APP1" />
                        <el-option label="APP2" value="APP2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="费率">
                    <el-input v-model="searchInfo.rate" placeholder="费率" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchInfo.phone" placeholder="手机号" />
                </el-form-item>
                <el-form-item label="申请时间">
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
                <el-form-item label="订单状态">
                    <el-select v-model="searchInfo.appName" placeholder="请选择订单状态">
                        <el-option label="APP1" value="APP1" />
                        <el-option label="APP2" value="APP2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="search" @click="onSubmit">
                        搜索
                    </el-button>
                    <el-button type="danger" icon="refresh" class="" @click="onReset"> 重置 </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        设置为待重新放款
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="gva-table-box">
            <el-table :data="tableData" row-key="ID">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" label="订单标签" min-width="150" prop="ID" />
                <el-table-column align="center" label="产品名" min-width="150" prop="userName" />
                <el-table-column align="center" label="订单ID" min-width="150" prop="nickName" />
                <el-table-column align="center" label="订单编号" min-width="150" prop="phone" />
                <el-table-column align="center" label="User ID" min-width="150" prop="email" />
                <el-table-column align="center" label="用户姓名" min-width="150" />
                <el-table-column align="center" label="手机号" min-width="150" />
                <el-table-column align="center" label="APP" min-width="150" />
                <el-table-column align="center" label="费率" min-width="150" />
                <el-table-column align="center" label="订单金额" min-width="150" />
                <el-table-column align="center" label="订单期限" min-width="150" />
                <el-table-column align="center" label="申请时间" min-width="150" />
                <el-table-column align="center" label="审核状态" min-width="150" />
                <el-table-column label="操作" :min-width="appStore.operateMinWith" fixed="right" align="center">
                    <template #default="scope">
                        <el-button>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gva-pagination">
                <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" />
            </div>
        </div>
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
})

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
</script>