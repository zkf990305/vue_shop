<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜素和添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8"
                    ><el-input
                        placeholder="请输入内容"
                        v-model="queryInfo.query"
                        clearable
                        @clear="getOrdersList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getOrdersList"
                        ></el-button> </el-input
                ></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
            },
        }
    },
    methods: {
        getOrdersList() {
            // this.$http
            //     .get('/orders/list', {
            //         params: {
            //             query: this.queryInfo.query,
            //         },
            //     })
            //     .then((res) => {
            //         this.goodsList = res.data.data
            //     })
        },
    },
}
</script>

<style>
</style>