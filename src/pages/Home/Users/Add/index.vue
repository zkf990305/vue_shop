<template>
    <!-- 添加用户对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"
        @close="addDialogClosed"
        :before-close="handleAddClose"
    >
        <!-- 内容主体区域 -->
        <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="70px"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeAddDialogVisible">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { userFormRules } from '../../../../common/mixin'
export default {
    mixins: [userFormRules],
    props: {
        dialogVisible: Boolean,
    },
    data() {
        return {
            // 添加用户的表单数据
            addForm: {},
        }
    },

    methods: {
        // 监听添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleAddClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeAddDialogVisible()
                })
                .catch((_) => {})
        },
        // 通过此方法给父组件传递值
        changeAddDialogVisible() {
            this.$emit('changeAddDialogVisible', false)
        },
        // 点击按钮，添加新用户
        addUser() {
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) return
                // 可以发起添加用户的网络请求
                const { data: res } = await this.$http.post(
                    'users',
                    this.addForm
                )
                if (res.meta.status !== 201) {
                    return this.$message.error('用户添加失败了~')
                }
                // 隐藏添加用户的对话框(父子组件)
                this.changeAddDialogVisible()
                // 添加成后重新获取用户数据,不需要用户手动刷新(获取父组件的方法)
                this.$parent.getUserList()
                return this.$message.success('用户添加成功了~')
            })
        },
    },
}
</script>

<style>
</style>