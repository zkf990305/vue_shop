<template>
    <!-- 分配权限的对话框 -->
    <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible"
        width="50%"
        @close="setRightDialogClosed"
        :before-close="handleSetRightDialogVisibleClosed"
    >
        <!-- 树形控件 -->
        <el-tree
            :data="treeData.rightsList"
            :props="treeData.treeProps"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="treeData.defKeys"
            ref="treeRef"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeRightDialogVisible">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: Boolean,
        // 所有权限的数据
        treeData: Object,
    },
    data() {
        return {
            // 分配权限对话框的显示和隐藏
            SetRightDialogVisible: true,
        }
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
        // 通过此方法给父组件传递值
        changeRightDialogVisible() {
            this.$emit('changeRightDialogVisible', false)
        },
        // 通过此方法给父组件传递值
        removeTreeDataDefKeys() {
            // 清空 defkeys 数组  避免累积
            this.$emit('removeTreeDataDefKeys', [])
        },
        // 点击为角色分配权限
        async allotRights() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys(),
            ]
            const idStr = keys.join(',')
            const { data: res } = await this.$http.post(
                `roles/${this.rolesId}/rights`,
                { rids: idStr }
            )
            if (res.meta.status !== 200) {
                return this.$message.error('分配权限失败!')
            }
            this.$message.success('分配权限成功!')
            this.getRolesList()
            this.SetRightDialogVisible = false
        },
    },
}
</script>

<style>
</style>