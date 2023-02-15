<template>
    <el-dialog
        title="分配角色"
        :visible.sync="dialogFormVisible"
        width="30%"
        @close="setRolesDialogClosed"
        :before-close="handleSetRolesDialogVisibleClosed"
    >
        <!-- <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form> -->
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeSetRolesDialogVisible">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogFormVisible: Boolean,
    },
    methods: {
        // 监听添加分配权限对话框的关闭事件
        setRightDialogClosed() {
            // 清空 defkeys 数组  避免累积
            this.removeTreeDataDefKeys()
            // this.$refs.treeRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleSetRightDialogVisibleClosed() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeRightDialogVisible()
                })
                .catch((_) => {})
        },
        changeSetRolesDialogVisible() {
            this.$emit('changeSetRolesDialogVisible', false)
        },
    },
}
</script>

<style>
</style>