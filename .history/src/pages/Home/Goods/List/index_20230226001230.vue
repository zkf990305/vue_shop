<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加商品按钮 -->
            <!-- 搜素和添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8"
                    ><el-input
                        placeholder="请输入内容"
                        v-model="queryInfo.query"
                        clearable
                        @clear="getGoodsList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getGoodsList"
                        ></el-button> </el-input
                ></el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true"
                        >添加商品</el-button
                    >
                </el-col>
            </el-row>

            <!-- 商品列表区域 -->
            <el-table
                :data="goodsList"
                stripe
                border
                style="width: 100%"
                height="450"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名称"
                ></el-table-column>
                <el-table-column
                    prop="goods_price"
                    label="价格"
                    width="110px"
                ></el-table-column>
                <el-table-column
                    prop="goods_weight"
                    label="重量"
                    width="120px"
                ></el-table-column>
                <el-table-column width="220px" label="创建时间">
                    <template v-slot="scope">
                        {{ scope.row.add_time | dataFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px"
                    ><template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="showeditCateDialog(scope.row)"
                            icon="el-icon-edit"
                            size="mini"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            @click="removeCate(scope.row.cat_id)"
                            icon="el-icon-delete"
                            size="mini"
                            >删除</el-button
                        >
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 获取商品列表的参数对象
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
            // 商品列表的数据列表，默认为空
            goodsList: [],
            // 控制添加商品的页面跳转
            addDialogVisible: false,
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        // 获取商品列表数据
        async getGoodsList() {
            const { data: res } = await this.$http.get('goods', {
                params: this.queryInfo,
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取商品列表失败！')
            }
            this.goodsList = res.data.goods
            console.log(res.data)
            this.total = res.data.total
        },
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(val) {
            this.queryInfo.pagesize = val
            this.getGoodsList()
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val
            this.getGoodsList()
        },
    },
}
</script>

<style>
</style>