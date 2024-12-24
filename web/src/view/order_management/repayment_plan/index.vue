<template>
    <div>
        <div class="gva-search-box">
            <el-form ref="searchForm" :inline="true" :model="searchInfo">
                <el-form-item label="还款计划ID">
                    <el-input v-model="searchInfo.orderNumber" placeholder="还款计划ID" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="手机号" />
                </el-form-item>
                <el-form-item label="User ID">
                    <el-input v-model="searchInfo.orderNumber" placeholder="User ID" />
                </el-form-item>
                <el-form-item label="APP">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择APP">
                        <el-option label="纯新" value="纯新" />
                        <el-option label="复货" value="复货" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="searchInfo.orderNumber" placeholder="订单编号" />
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
                <el-form-item label="还款状态">
                    <el-select v-model="searchInfo.orderLabel" placeholder="请选择还款状态">
                        <el-option label="已还" value="已还" />
                        <el-option label="未还" value="未还" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="search" @click="onSubmit">
                        搜索
                    </el-button>
                    <el-button type="danger" icon="refresh" class="" @click="onReset"> 重置 </el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="gva-table-box">
            <el-table :data="tableData" row-key="ID">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" label="还款计划ID" min-width="150" prop="ID" />
                <el-table-column align="center" label="产品名称" min-width="150" prop="userName" />
                <el-table-column align="center" label="用户姓名" min-width="150" prop="nickName" />
                <el-table-column align="center" label="手机号码" min-width="150" prop="phone" />
                <el-table-column align="center" label="User ID" min-width="150" prop="email" />
                <el-table-column align="center" label="APP" min-width="150" />
                <el-table-column align="center" label="订单编号" min-width="150" />
                <el-table-column align="center" label="合同本金" min-width="150" />
                <el-table-column align="center" label="逾期费" min-width="150" />
                <el-table-column align="center" label="结清应还金额" min-width="150" />
                <el-table-column align="center" label="展期应还金额" min-width="150" />
                <el-table-column align="center" label="应还时间" min-width="150" />
                <el-table-column align="center" label="结清已还金额" min-width="150" />
                <el-table-column align="center" label="展期已还金额" min-width="150" />
                <el-table-column align="center" label="优惠券金额" min-width="150" />
                <el-table-column align="center" label="减免金额" min-width="150" />
                <el-table-column align="center" label="平账金额" min-width="150" />
                <el-table-column align="center" label="还款状态" min-width="150" />
                <el-table-column label="操作" :min-width="appStore.operateMinWith" fixed="right" align="center">
                    <template #default="scope">
                        <el-button @click="openWindows()">获取还款码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gva-pagination">
                <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" />
            </div>
        </div>

        <!-- 获取还款码的弹窗 -->
        <el-dialog v-model="dialogFormVisible" :width="dialogWidth" :before-close="closeDialog" :show-close="false"
            class="custom-dialog">
            <template #header>
                <div class="flex justify-center items-center">
                    <span class="text-lg">{{ dialogTitle }}</span>
                </div>
            </template>
            <div class="flex justify-center items-center">
                <el-form>
                    <el-form-item label="用户姓名:">
                        <el-text>11111111111111111111111111111</el-text>
                    </el-form-item>
                    <el-form-item label="产品名称:">
                        <el-text>22222</el-text>
                    </el-form-item>
                    <el-form-item label="订单编号:">
                        <el-text>333334</el-text>
                    </el-form-item>
                    <el-form-item label="还款类型:">
                        <el-radio-group v-model="radio1">
                            <el-radio value="1" size="large">全额归还</el-radio>
                            <el-radio value="2" size="large">展期归还</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="支付渠道:">
                        <el-select v-model="searchInfo.orderLabel" placeholder="请选择支付渠道">
                            <el-option label="微信" value="微信" />
                            <el-option label="支付宝" value="支付宝" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="还款金额:">
                        <el-input v-model="searchInfo.orderNumber" placeholder="还款金额" />
                    </el-form-item>
                    <el-form-item label="还款链接:">
                        <div class="flex items-center">
                            <el-input v-model="searchInfo.link" class="flex-1" readonly />
                            <el-button type="primary" @click="copyToClipboard()" class="ml-2"> 复制 </el-button>
                        </div>
                    </el-form-item>
                    <el-input type="textarea" v-model="inputValue" :rows="4" :autosize="{ minRows: 4, maxRows: 6 }" />
                </el-form>
            </div>
            <template #footer>
                <div class="flex justify-center items-center">
                    <div>
                        <el-button @click="closeDialog"> 关 闭 </el-button>
                        <!-- 还款码未绑定方法 -->
                        <el-button type="primary" @click=""> 获取还款码 </el-button>
                    </div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { useAppStore } from "@/pinia";
import { ref } from 'vue';
//消息提示组件
import { ElMessage } from 'element-plus';

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
    orderState: '',
    link: '11111111111'
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
        orderState: '',
        link: ''
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

/* 获取还款码相关的弹窗 */
const dialogFormVisible = ref(false);
const dialogTitle = ref('还款码');
/* 还款类型数据存储 */
const radio1 = ref('');
const openWindows = () => {
    dialogFormVisible.value = true;
}
const closeDialog = () => {
    dialogFormVisible.value = false;
    //表单数据初始化
}
/* 复制到粘贴版 */
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(searchInfo.value.link);
        ElMessage.success('复制成功！');
    } catch (error) {
        ElMessage.error('复制失败，请手动复制！');
    }
};
</script>
<style>
.custom-dialog {
    max-width: 600px;
    /* 设置对话框的最大宽度 */
}
</style>