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
            <!-- TODO: 搜素问题 -->
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
                <el-table-column label="是否付款" width="120px">
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

                <el-table-column label="操作" width="150px">
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
                </el-table-column>
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
        <!-- 修改地址对话框 -->
        <edit-addr
            :addressDialogVisible="addressDialogVisible"
            @changeEditAddressDialogVisible="changeEditAddressDialogVisible"
        ></edit-addr>
        <!--    显示物流进度的对话框-->
        <el-dialog
            title="物流进度"
            :visible.sync="progressDialogVisible"
            width="50%"
        >
            <el-timeline :reverse="false">
                <el-timeline-item
                    v-for="(activity, index) in progressInfo"
                    :key="index"
                    :timestamp="activity.ftime"
                >
                    {{ activity.context }}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
import EditAddr from './EditAddr/index.vue'
export default {
    components: { EditAddr },
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
            // 修改地址的对话框
            addressDialogVisible: false,
            // 显示物流进度的
            progressDialogVisible: false,
            progressInfo: [],
        }
    },
    created() {
        this.getOrdersList()
    },
    methods: {
        // 获取订单列表的数据
        async getOrdersList() {
            console.log(this.queryInfo)
            const { data: res } = await this.$http.get('orders', {
                params: this.queryInfo,
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取订单列表失败！')
            }
            this.$message.success('获取订单列表成功!')
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
        // 显示修改地址按钮事件
        showBox() {
            // TODO: 修改地址
            this.addressDialogVisible = true
        },
        // (添加分类子组件)父组件处理子组件发送的数据更改
        changeEditAddressDialogVisible(val) {
            this.addressDialogVisible = val
        },
        // 显示物流信息的按钮事件
        async showProgressBox() {
            const { data: res } = await this.$http.get('/kuaidi/1106975712662')
            if (res.meta.status !== 200) {
                return this.$message.error('获取物流进度失败！')
            }
            this.progressInfo = res.data

            // this.progressInfo = [
            //   {
            //     time: '2018-05-10 09:39:00',
            //     ftime: '2018-05-10 09:39:00',
            //     context: '已签收,感谢使用顺丰,期待再次为您服务',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-10 08:23:00',
            //     ftime: '2018-05-10 08:23:00',
            //     context: '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-10 07:32:00',
            //     ftime: '2018-05-10 07:32:00',
            //     context: '快件到达 [北京海淀育新小区营业点]',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-10 02:03:00',
            //     ftime: '2018-05-10 02:03:00',
            //     context: '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-09 23:05:00',
            //     ftime: '2018-05-09 23:05:00',
            //     context: '快件到达 [北京顺义集散中心]',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-09 21:21:00',
            //     ftime: '2018-05-09 21:21:00',
            //     context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-09 13:07:00',
            //     ftime: '2018-05-09 13:07:00',
            //     context: '顺丰速运 已收取快件',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-09 12:25:03',
            //     ftime: '2018-05-09 12:25:03',
            //     context: '卖家发货',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-09 12:22:24',
            //     ftime: '2018-05-09 12:22:24',
            //     context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
            //     location: ''
            //   },
            //   {
            //     time: '2018-05-08 21:36:04',
            //     ftime: '2018-05-08 21:36:04',
            //     context: '商品已经下单',
            //     location: ''
            //   }
            // ]
            //
            this.progressDialogVisible = true
            //   console.log(this.progressInfo)
        },
    },
}
</script>

<style>
</style>