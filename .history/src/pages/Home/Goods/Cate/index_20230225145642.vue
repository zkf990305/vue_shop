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
                <el-table-column type="index" label="#" width="50">
                </el-table-column>
                <el-table-column prop="cat_name" label="分类名称" width="180">
                </el-table-column>
                <el-table-column
                    prop="cat_deleted"
                    label="是否有效"
                    width="180"
                >
                    <template slot-scope="scope">
                        <i
                            class="el-icon-success"
                            style="color: lightgreen"
                            v-if="scope.row.cat_deleted === false"
                        ></i>
                        <i
                            class="el-icon-error"
                            style="color: red"
                            v-else-if="scope.row.cat_deleted === true"
                        ></i>
                    </template>
                </el-table-column>
                <!-- 排序 -->
                <el-table-column prop="cat_level" label="排序" width="180">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.cat_level === 0"
                            >一级</el-tag
                        >
                        <el-tag
                            size="mini"
                            type="success"
                            v-else-if="scope.row.cat_level === 1"
                            >二级</el-tag
                        >
                        <el-tag size="mini" type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"
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
        <!-- 编辑分类 -->
        <edit-cate @changeEditCateDialogVisible="changeEditCateDialogVisible">
        </edit-cate>
    </div>
</template>

<script>
import AddCate from '../Cate/Add/index.vue'
import editCate from '../Cate/Edit/index.vue'
export default {
    data() {
        return {
            // 商品分类的数据列表,默认为空
            cateList: [],
            // 获取分类列表的参数对象
            queryInfo: {
                // 查询参数
                type: 3,
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
            // 编辑对话框的显示和隐藏
            editCateDialogVisbel: false,
            editCate: {},
        }
    },
    created() {
        this.getCateList()
    },
    components: {
        AddCate,
        editCate,
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
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(val) {
            this.queryInfo.pagesize = val
            this.getCateList()
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val
            this.getCateList()
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
        // 点击按钮，弹框编辑分类
        showeditCateDialog(cateInfo) {
            this.editCateId = cateInfo.cat_id
      const { data: res } = await this.$http.get('categories/' + cateInfo.cat_id)
      this.editCate = res.data
      console.log(this.editCate)
      // console.log(res.data)
      this.editCateDialogVisbel = true
        },
        // (编辑分类子组件)父组件处理子组件发送的数据更改
        changeEditCateDialogVisible(val) {
            this.editCateDialogVisbel = val
        },
        // 删除分类
        async removeCate(id) {
            const confirRustle = await this.$confirm(
                '此操作将永久删除该文件, 是否继续?',
                '删除分类',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((err) => err)

            if (confirRustle !== 'confirm') {
                return this.$message.info('已取消删除操作!')
            }

            const { data: res } = await this.$http.delete('categories/' + id)
            if (res.meta.status !== 200) {
                return this.$message.error('分类删除失败!')
            }
            this.$message.success('该分类已经成功删除!')
            this.getCateList()
        },
    },
}
</script>

<style>
</style>