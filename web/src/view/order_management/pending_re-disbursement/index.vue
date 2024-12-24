<template>
    <div>
        <!-- 搜索模块 -->
        <div class="gva-search-box">
            <el-form ref="searchForm" :inline="true" :model="searchInfo">
                <el-form-item label="订单标签">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择订单标签">
                        <el-option label="app1" value="纯新" />
                        <el-option label="app2" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="订单编号" />
                </el-form-item>
                <el-form-item label="User ID">
                    <el-input v-model="searchInfo.orderNumber" placeholder="User ID" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="手机号" />
                </el-form-item>
                <el-form-item label="APP">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择APP">
                        <el-option label="app1" value="纯新" />
                        <el-option label="app2" value="复货" />
                    </el-select>
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
                <el-form-item>
                    <el-button type="success" icon="search" @click="onSubmit">
                        搜索
                    </el-button>
                    <el-button type="danger" icon="refresh" class="" @click="onReset"> 重置 </el-button>
                    <el-button type="primary" class="" @click=""> 批量重新放款 </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 数据表格模块 -->
        <div class="gva-table-box">
            <el-table :data="tableData" row-key="ID">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" label="还款计划ID" min-width="150" prop="ID" />
                <el-table-column align="center" label="APP" min-width="150" />
                <el-table-column align="center" label="平账类型" min-width="150" />
                <el-table-column align="center" label="平账金额" min-width="150" />
                <el-table-column align="center" label="备注" min-width="150" />
                <el-table-column align="center" label="发起时间" min-width="150" />
                <el-table-column align="center" label="发起人" min-width="150" />
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

// 查看弹出窗
const apiForm = ref({ a: '1069977', b: '462184489576', c: '9000', d: '2024-09-11 07:37:26' })
const dialogTitle = ref('还款回调记录')
const form = ref()
const initForm = () => {
    form.value = {
        a: '',
        b: '',
        c: '',
        d: ''
    }
}
const editApiFunc = async () => {
    form.value = {
        a: '1069977',
        b: '462184489576',
        c: '9000',
        d: '2024-09-11 07:37:26'
    };
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