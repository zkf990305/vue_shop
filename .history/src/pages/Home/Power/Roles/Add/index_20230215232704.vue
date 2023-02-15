<template>
    <!-- 添加角色对话框 -->
    <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible"
        @close="addDislogClosed"
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
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRolesUser">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { rolesFormRulesMixin } from '../../../../../common/mixin'
export default {
    mixins: [rolesFormRulesMixin],
    props: {
        dialogVisible: Boolean,
        addRolesForm: Object,
    },
}
</script>

<style>
</style>