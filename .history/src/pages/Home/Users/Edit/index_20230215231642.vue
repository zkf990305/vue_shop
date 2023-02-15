<template>
    <!-- 修改用户信息对话框 -->
    <el-dialog
        title="修改用户信息"
        :visible.sync="dialogVisible"
        width="50%"
        @close="editDialogClosed"
        :before-close="handleEditClose"
    >
        <!-- 内容主体区域 -->
        <el-form
            :model="oldUserInfo"
            :rules="editFormRules"
            ref="editFormRef"
            label-width="70px"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="oldUserInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="oldUserInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="oldUserInfo.mobile"></el-input>
            </el-form-item>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeEditDialogVisible">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { userFormRules } from '../../../../common/mixin'
export default {
    mixins: [userFormRules],
    props: {
        dialogVisible: Boolean,
        oldUserInfo: {
            type: Object,
        },
    },
    methods: {
        // 监听添加用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleEditClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeEditDialogVisible()
                })
                .catch((_) => {})
        },
        // 通过此方法给父组件传递值
        changeEditDialogVisible() {
            this.$emit('changeEditDialogVisible', false)
        },
        // 点击按钮，修改用户
        editUserInfo() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) return
                // 可以发起修改用户信息的网络请求
                const { data: res } = await this.$http.put(
                    `users/` + this.oldUserInfo.id,
                    {
                        email: this.oldUserInfo.email,
                        mobile: this.oldUserInfo.mobile,
                    }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('更新用户信息失败!~')
                }
                return this.$message.success('更新用户信息成功!~')
                // 修改后重新获取用户数据,不需要用户手动刷新(获取父组件的方法)
                this.$parent.getUserList()
                // 隐藏添加用户的对话框(父子组件)
                this.changeEditDialogVisible()
            })
        },
    },
}
</script>

<style>
</style>