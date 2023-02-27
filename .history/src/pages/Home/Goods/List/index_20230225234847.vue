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
            <el-table :data="goodsList" stripe border style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="50"
                ></el-table-column>
                <el-table-colum
                    prop=""
                    label="商品名称"
                    width="180"
                ></el-table-colum>
                <el-table-colum
                    prop=""
                    label="价格"
                    width="180"
                ></el-table-colum>
                <el-table-colum
                    prop=""
                    label="重量"
                    width="180"
                ></el-table-colum>
            </el-table>
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
    },
}
</script>

<style>
</style>