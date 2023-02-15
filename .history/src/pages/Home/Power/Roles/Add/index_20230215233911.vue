<template>
    <!-- 添加角色对话框 -->
    <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible"
        @close="addDialogClosed"
        :before-close="handleAddClose"
    >
        <el-form
            :model="addRolesForm"
            :rules="addFormRules"
            ref="addRolesForm"
            label-width="100px"
        >
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addRolesForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeAddRolesDialogVisible">取 消</el-button>
            <el-button type="primary" @click="changeAddRolesDialogVisible"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import { rolesFormRulesMixin } from '../../../../../common/mixin'
export default {
    mixins: [rolesFormRulesMixin],
    props: {
        dialogVisible: Boolean,
    },
    data() {
        return {
            addRolesForm: {
                roleName: '',
                roleDesc: '',
            },
        }
    },
    methods: {
        // 监听编辑角色对话框的关闭事件
        addDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleAddClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeAddRolesDialogVisible()
                })
                .catch((_) => {})
        },
        changeAddRolesDialogVisible() {
            this.$emit('changeAddRolesDialogVisible', false)
        },
    },
}
</script>

<style>
</style>