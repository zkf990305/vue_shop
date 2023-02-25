<template>
    <!-- 添加分类对话框 -->
    <el-dialog
        title="添加分类"
        :visible.sync="dialogVisible"
        @close="addDialogClosed"
        :before-close="handleAddClose"
    >
        <el-form
            :model="addCateForm"
            :rules="addCateFormRules"
            ref="addCateForm"
            label-width="100px"
        >
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:" prop="roleDesc">
                <!-- options 用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                <el-input v-model="addRolesForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeAddRolesDialogVisible">取 消</el-button>
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
    },
    data() {
        return {
            addCateForm: {
                cat_name: '',
            },
        }
    },
    methods: {
        // 监听添加角色对话框的关闭事件
        addDialogClosed() {
            this.$refs.addRolesForm.resetFields()
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
        // 添加角色
        addRolesUser() {
            this.$refs.addRolesForm.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.post(
                    'roles',
                    this.addRolesForm
                )
                if (res.meta.status !== 201) {
                    return this.$message.error('添加角色失败!')
                }
                this.$message.success('添加角色成功!')
                this.$parent.getRolesList()
                this.changeAddRolesDialogVisible()
            })
        },
    },
}
</script>

<style>
</style>