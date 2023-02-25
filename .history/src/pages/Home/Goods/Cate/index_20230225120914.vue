<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加分类按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddDialog()"
                        >添加分类</el-button
                    >
                </el-col>
            </el-row>

            <!-- 商品分类列表区域 -->
            <el-table :data="cateList" stripe border style="width: 100%">
                <el-table-column prop="date" label="分类名称" width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_state"
                    label="是否有效"
                    width="180"
                >
                </el-table-column>
                <el-table-column prop="date" label="排序" width="180">
                </el-table-column>
            </el-table>
            <!-- 数据分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 13, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>

        <!-- 添加分类 -->
        <add-cate
            :dialog-visible="addCateDialogVisible"
            :parentCateList="parentCateList"
            @changeAddCateDialogVisible="changeAddCateDialogVisible"
        ></add-cate>
    </div>
</template>

<script>
import AddCate from '../Cate/Add/index.vue'
export default {
    data() {
        return {
            // 商品分类的数据列表,默认为空
            cateList: [],
            // 获取分类列表的参数对象
            queryInfo: {
                // 查询参数
                query: '',
                // 当前页码
                pagenum: 1,
                // 每页显示条数
                pagesize: 5,
            },
            // 总数据条数
            total: 0,
            // 父级分类的列表
            parentCateList: [],
            // 控制添加分类对话框的显示与隐藏
            addCateDialogVisible: false,
        }
    },
    created() {
        this.getCateList()
    },
    components: {
        AddCate,
    },
    methods: {
        // 获取商品分类数据
        async getCateList() {
            const { data: res } = await this.$http.get('categories', {
                params: this.queryInfo,
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取商品分类失败!')
            }
            // 把数据列表赋值给cateList
            this.cateList = res.data.result
            // 获取商品的总数量
            this.total = res.data.total
            console.log(res)
        },
        // 获取父级分类的数据列表
        async getParentCateList() {
            const { data: res } = await this.$http.get('categories', {
                params: { type: 2 },
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取父级分类数据失败!')
            }
            console.log(res.data)
            this.parentCateList = res.data
        },
        // 展示添加分类的对话框
        showAddDialog() {
            // 获取父级分类的数据列表
            this.getParentCateList()
            this.addCateDialogVisible = true
        },
        // (添加分类子组件)父组件处理子组件发送的数据更改
        changeAddCateDialogVisible(val) {
            this.addCateDialogVisible = val
        },
    },
}
</script>

<style>
</style>