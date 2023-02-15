<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
                        @clear="getUserList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUserList"
                        ></el-button> </el-input
                ></el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true"
                        >添加用户</el-button
                    >
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userData.userList" stripe border>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column
                    label="角色"
                    prop="role_name"
                ></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <!-- {{ scope.row.mg_state }} -->
                        <el-switch
                            v-model="scope.row.mg_state"
                            @change="userStateChanged(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        <!-- 删除按钮 -->
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeUserById(scope.row.id)"
                        ></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip
                            effect="dark"
                            content="分配角色"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                                @click="showSetRolesDialog(scope.row.id)"
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
                :page-sizes="[1, 2, 13, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userData.total"
            >
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <add-user
            :dialog-visible="addDialogVisible"
            @changeAddDialogVisible="changeAddDialogVisible"
        ></add-user>

        <!-- 编辑用户信息对话框 -->
        <edit-user
            :dialog-visible="editDialogVisible"
            :old-user-info="editForm"
            @changeEditDialogVisible="changeEditDialogVisible"
        ></edit-user>

        <!-- 分配角色信息对话框 -->
        <set-roles :dialog-form-visible="setRolesDialogVisible"></set-roles>
    </div>
</template>

<script>
import AddUser from '../Users/Add/index.vue'
import EditUser from '../Users/Edit/index.vue'
import SetRoles from '../Users/SetRoles/index.vue'
export default {
    data() {
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                // 查询参数
                query: '',
                // 当前页码
                pagenum: 1,
                // 每页显示条数
                pagesize: 2,
            },
            // 存放用户的数据和数量
            userData: {
                userList: [],
                total: 0,
            },
            // 控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            // 控制编辑用户信息对话框的显示与隐藏
            editDialogVisible: false,
            // 控制分配角色信息对话框的显示与隐藏
            setRolesDialogVisible: false,
            // 查询用户的对象
            editForm: {},
        }
    },
    components: {
        AddUser,
        EditUser,
        SetRoles,
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get('users', {
                params: this.queryInfo,
            })
            if (res.meta.status !== 200)
                return this.$message.error('获取用户列表失败')
            this.$message.success('获取用户列表成功!')
            this.userData.userList = res.data.users
            this.userData.total = res.data.total
            console.log(res)
        },
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(val) {
            this.queryInfo.pagesize = val
            this.getUserList()
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val
            this.getUserList()
        },
        // 监听 switch 开关状态的改变
        async userStateChanged(row) {
            // console.log(row)
            const { data: res } = await this.$http.put(
                `users/${row.id}/state/${row.mg_state}`
            )
            if (res.meta.status !== 200) {
                // 更新失败，按钮状态重新换回来
                row.mg_state = !row.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        },
        // (添加用户子组件)父组件处理子组件发送的数据更改
        changeAddDialogVisible(val) {
            this.addDialogVisible = val
        },
        // (修改用户子组件)父组件处理子组件发送的数据更改
        changeEditDialogVisible(val) {
            this.editDialogVisible = val
        },
        // 展示用户编辑的对话框
        async showEditDialog(id) {
            const { data: res } = await this.$http.get('users/' + id)
            if (res.meta.status !== 200)
                return this.$message.error('查找用户数据失败')
            this.editForm = res.data
            this.editDialogVisible = true
            this.$message.success('查找用户数据成功')
        },
        // 展示分配角色的对话框
        showSetRolesDialog(id) {
            this.setRolesDialogVisible = true
        },
        // 根据id删除对应的用户信息
        async removeUserById(id) {
            // 询问用户是否删除用户
            const confirmRusult = await this.$confirm(
                '此操作将永久删除该用户信息, 是否继续?',
                'tips',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                }
            ).catch((err) => err)
            // 用户取消了删除,则返回字符串 cancel
            if (confirmRusult !== 'confirm') {
                return this.$message.info('已经取消了删除')
            }
            // 用户点击了删除,则返回字符串 confirm
            this.$http.delete('users/' + id).then((res) => {
                const { data: response } = res
                if (response.meta.status !== 200) {
                    return this.$message.error('该用户删除失败')
                }
                this.$message.success('该用户已经删除')
                this.getUserList()
            })
        },
    },
}
</script>

<style>
</style>