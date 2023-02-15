<template>
    <el-dialog
        title="分配角色"
        :visible.sync="dialogFormVisible"
        width="50%"
        @close="setRolesDialogClosed"
        :before-close="handleSetRolesDialogVisibleClosed"
    >
        <div>
            <p>当前的用户：{{ userData.username }}</p>
            <p>当前的角色：{{ userData.role_name }}</p>
            <p>
                分配新角色：
                <el-select v-model="selectRoleId" placeholder="请选择">
                    <el-option
                        v-for="item in rolesList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeSetRolesDialogVisible">取 消</el-button>
            <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogFormVisible: Boolean,
        userData: Object,
        rolesList: Array,
    },
    data() {
        return {
            selectRoleId: '',
        }
    },
    methods: {
        // 监听添加分配权限对话框的关闭事件
        setRolesDialogClosed() {
            // 清空 defkeys 数组  避免累积
            // this.removeTreeDataDefKeys()
            // this.$refs.treeRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleSetRolesDialogVisibleClosed() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeSetRolesDialogVisible()
                })
                .catch((_) => {})
        },
        changeSetRolesDialogVisible() {
            this.$emit('changeSetRolesDialogVisible', false)
        },
        saveRoleInfo() {},
    },
}
</script>

<style>
</style>