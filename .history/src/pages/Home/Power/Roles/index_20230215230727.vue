<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加角色按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible = true"
                        >添加角色</el-button
                    >
                </el-col>
            </el-row>

            <!-- 角色列表区域 -->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-row
                            style="margin-left: 35px"
                            :class="[
                                'bdbottom',
                                index1 === 0 ? 'bdtop' : '',
                                'vcenter',
                            ]"
                            v-for="(item1, index1) in props.row.children"
                            :key="item1.id"
                        >
                            <!-- 渲染一级权限 -->
                            <el-col :span="5"
                                ><el-tag
                                    closable
                                    @close="
                                        removeRightById(props.row, item1.id)
                                    "
                                    >{{ item1.authName }}</el-tag
                                >
                                <i class="el-icon-caret-right"></i
                            ></el-col>

                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 通过for循环，嵌套渲染二级权限 -->
                                <el-row
                                    :class="[
                                        'bdbottom',
                                        index2 === 0 ? 'bdtop' : '',
                                        'vcenter',
                                    ]"
                                    v-for="(item2, index2) in item1.children"
                                    :key="item2.id"
                                >
                                    <el-col :span="6"
                                        ><el-tag
                                            type="success"
                                            closable
                                            @close="
                                                removeRightById(
                                                    props.row,
                                                    item2.id
                                                )
                                            "
                                            >{{ item2.authName }}</el-tag
                                        >
                                        <i class="el-icon-caret-right"></i
                                    ></el-col>
                                    <el-col :span="18">
                                        <el-tag
                                            type="warning"
                                            v-for="(
                                                item3, index3
                                            ) in item2.children"
                                            :key="item3.id"
                                            closable
                                            @close="
                                                removeRightById(
                                                    props.row,
                                                    item3.id
                                                )
                                            "
                                            >{{ item3.authName }}</el-tag
                                        >
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="300">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showEditDialog(scope.row)"
                            >编辑</el-button
                        >
                        <!-- 删除按钮 -->
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="rolesDelete(scope.row.id)"
                            >删除</el-button
                        >
                        <!-- 分配角色按钮 -->
                        <el-tooltip
                            effect="dark"
                            content="分配权限"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                                @click="showSetRightDialog(scope.row)"
                                >分配权限</el-button
                            >
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 编辑角色 -->
        <edit-role
            :dialog-visible="editRoleDialogVisible"
            :editRolesForm="editRolesForm"
            @changeEditRolesDialogVisible="changeEditRolesDialogVisible"
        ></edit-role>
        <!-- 分配权限的对话框 -->
        <set-right
            :dialog-visible="setRightDialogVisible"
            :rolesId="rolesId"
            :treeData="treeData"
            @changeRightDialogVisible="changeRightDialogVisible"
            @removeTreeDataDefKeys="removeTreeDataDefKeys"
        ></set-right>
    </div>
</template>

<script>
import EditRole from './Edit/index.vue'
import SetRight from './SetRight/index.vue'
export default {
    data() {
        return {
            // 角色列表数据
            rolesList: [],
            // 控制添加用户对话框的显示与隐藏
            editRoleDialogVisible: false,
            // 编辑角色的信息
            editRolesForm: {},
            // 控制添加用户对话框的显示与隐藏
            setRightDialogVisible: false,
            // 当前即将分配权限的角色的ID
            rolesId: 0,
            // 传给子组件的树型控件对象
            treeData: {
                // 所有权限的数据
                rightsList: [],
                // 树形控件 -> 默认选中的节点id值数组
                defKeys: [],
                // 树形控件的绑定对象
                treeProps: {
                    children: 'children',
                    label: 'authName',
                },
            },
        }
    },
    components: {
        EditRole,
        SetRight,
    },
    created() {
        // 获取所有角色的列表
        this.getRolesList()
    },
    methods: {
        // 获取角色列表
        async getRolesList() {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200)
                return this.$message.error('获取角色列表失败')
            this.$message.success('获取角色列表成功')
            this.rolesList = res.data
        },
        // 根据id删除对应的权限
        async removeRightById(role, rightId) {
            // 弹框提示用户是否需要删除
            const confirmResult = await this.$confirm(
                '此操作将永久删除该文件, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((err) => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除')
            }
            const { data: res } = await this.$http.delete(
                `roles/${role.id}/rights/${rightId}`
            )
            if (res.meta.status !== 200) {
                return this.$message.error('删除权限失败')
            }
            // 页面发生渲染
            // this.getRolesList()
            // 返回的data, 是当前角色下最新的权限数据
            role.children = res.data
        },
        // 展示编辑角色的对话框
        showEditDialog(role) {
            this.editRolesForm = role
            this.editRoleDialogVisible = true
        },
        changeEditRolesDialogVisible(val) {
            this.editRoleDialogVisible = val
        },
        // 展示分配权限的对话框
        async showSetRightDialog(role) {
            this.rolesId = role.id
            // 获取所有权限列表
            const { data: res } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200) {
                return this.$message.error('获取权限列表失败!')
            }
            // 获取到的权限数据保存
            this.treeData.rightsList = res.data
            // 递归获取三级节点
            this.getLeafKeys(role, this.treeData.defKeys)
            this.setRightDialogVisible = true
        },
        // 递归的形式,获取角色下所有的三级权限的id,并保存到 defKeys数组中
        getLeafKeys(node, arr) {
            // 如果当前node没有children属性则是三级节点
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach((item) => this.getLeafKeys(item, arr))
        },
        // (分配权限子组件)父组件处理子组件发送的数据更改
        changeRightDialogVisible(val) {
            this.setRightDialogVisible = val
        },
        // (分配权限子组件)父组件处理子组件发送的数据更改
        removeTreeDataDefKeys(val) {
            this.treeData.defKeys = val
        },
        // 删除角色
        async rolesDelete(id) {
            const confirmResult = await this.$confirm(
                '此操作将永久删除该角色，是否继续?',
                '删除角色',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((err) => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消该操作')
            }
            const { data: res } = await this.$http.delete('roles/' + id)
            if (res.meta.status !== 200)
                return this.$message.error('删除角色失败')
            this.$message.success('该用户已经删除')
            this.getRolesList()
        },
    },
}
</script>

<style lang="less" scoped>
.el-table {
    margin-top: 15px;
}
.el-tag {
    margin: 7px;
}
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
    border-bottom: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>