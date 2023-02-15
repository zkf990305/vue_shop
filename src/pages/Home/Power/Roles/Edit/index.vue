<template>
    <!-- 编辑对话框 -->
    <el-dialog
        title="修改角色"
        :visible.sync="dialogVisible"
        width="30%"
        @close="editDialogClosed"
        :before-close="handleEditClose"
    >
        <el-form
            :model="editRolesForm"
            :rules="editFormRules"
            ref="editFormRef"
            label-width="100px"
        >
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editRolesForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeEditRolesDialogVisible">取 消</el-button>
            <el-button type="primary" @click="editFormInfo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { rolesFormRulesMixin } from '../../../../../common/mixin'
export default {
    mixins: [rolesFormRulesMixin],
    props: {
        dialogVisible: Boolean,
        editRolesForm: Object,
    },
    methods: {
        // 监听编辑角色对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleEditClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeEditRolesDialogVisible()
                })
                .catch((_) => {})
        },
        changeEditRolesDialogVisible() {
            this.$emit('changeEditRolesDialogVisible', false)
        },
        // 点击按钮，确认修改
        editFormInfo() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.put(
                    'roles/' + this.editRolesForm.roleId,
                    {
                        roleName: this.editRolesForm.roleName,
                        roleDesc: this.editRolesForm.roleDesc,
                    }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('修改角色失败!')
                }
                this.$message.success('修改角色成功!')
                this.$parent.getRolesList()
                this.changeEditRolesDialogVisible()
            })
        },
    },
}
</script>

<style>
</style>