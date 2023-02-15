<template>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" :visible.sync="dialogVisible" width="30%">
        <!-- <el-form
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
        </el-form> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeEditRolesDialogVisible">取 消</el-button>
            <el-button type="primary" @click="editFormInfo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { userFormRules } from '../../../../common/mixin'
export default {
    props: {
        dialogVisible: Boolean,
    },
    methods: {
        changeEditRolesDialogVisible() {
            this.$emit('changeEditRolesDialogVisible', false)
        },
    },
}
</script>

<style>
</style>