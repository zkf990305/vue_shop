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
            <!-- 订单列表区域 -->
            <el-table
                :data="ordersList"
                stripe
                border
                style="width: 100%"
                height="450"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                    prop="order_number"
                    label="订单编号"
                ></el-table-column>
                <el-table-column
                    prop="order_price"
                    label="订单价格"
                    width="110px"
                ></el-table-column>
                <el-table-column label="是否支付" width="120px">
                    <template v-slot="scope">
                        <el-tag
                            type="danger"
                            v-if="scope.row.pay_status === '0'"
                            >未付款</el-tag
                        >
                        <el-tag type="success" v-else>已付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="is_send"
                    label="是否发货"
                    width="120px"
                ></el-table-column>
                <el-table-column label="下单时间" width="120px">
                    <template v-slot="scope">
                        {{ scope.row.create_time | dataFormat }}
                    </template>
                </el-table-column>
                <el-table-column width="220px" label="创建时间">
                    <template v-slot="scope">
                        {{ scope.row.add_time | dataFormat }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" width="150px">
                    <template v-slot="">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="修改地址"
                            placement="top"
                        >
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="showBox"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="物流状态"
                            placement="top"
                        >
                            <el-button
                                type="success"
                                icon="el-icon-location"
                                circle
                                @click="showProgressBox"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 数据分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[7, 10, 15, 25]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 获取订单列表的参数对象
            queryInfo: {
                // 查询参数
                query: '',
                // 当前页码
                pagenum: 1,
                // 每页显示条数
                pagesize: 10,
            },
            // 总数据条数
            total: 0,
            // 订单列表的数据列表，默认为空
            ordersList: [],
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
            console.log(res.data.goods)
            this.ordersList = res.data.goods
            this.total = res.data.total
        },
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(val) {
            this.queryInfo.pagesize = val
            this.getOrdersList()
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val
            this.getOrdersList()
        },
    },
}
</script>

<style>
</style>