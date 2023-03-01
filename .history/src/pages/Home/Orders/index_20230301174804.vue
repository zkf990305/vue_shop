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
            <!-- 搜素区域 -->
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
            ordersList: [],
            queryInfo: {
                query: '',
            },
        }
    },
    created() {
        this.getOrdersList()
    },
    methods: {
        // 获取订单列表的数据
        async getOrdersList() {
            const { data: res } = await this.$http.get('orders', {
                params: this.queryInfo,
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取订单列表失败！')
            }
            this.goodsList = res.data.goods

            this.total = res.data.total
        },
    },
}
</script>

<style>
</style>