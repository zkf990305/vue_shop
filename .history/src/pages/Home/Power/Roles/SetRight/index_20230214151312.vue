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
            :data="rightsList"
            :props="treeProps"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defKeys"
            ref="treeRef"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeRightDialogVisible">取 消</el-button>
            <el-button type="primary" @click="changeRightDialogVisible"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: Boolean,
        // 所有权限的数据
        rightsList: Array,
    },
    data() {
        return {
            // 分配权限对话框的显示和隐藏
            SetRightDialogVisible: true,
            // 树形控件的绑定对象
            treeProps: {
                children: 'children',
                label: 'authName',
            },
            // 树形控件 -> 默认选中的节点id值数组
            defKeys: [],
        }
    },
    created() {
        // 递归获取三级节点
        this.getLeafKeys(roles, this.defKeys)
    },
    methods: {
        // 递归的形式,获取角色下所有的三级权限的id,并保存到 defKeys数组中
        getLeafKeys(node, arr) {
            // 如果当前node没有children属性则是三级节点
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach((item) => this.getLeafKeys(item, arr))
        },
        // 监听添加分配权限对话框的关闭事件
        setRightDialogClosed() {
            // 清空 defkeys 数组  避免累积
            this.defKeys = []
            this.$refs.treeRef.resetFields()
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
    },
}
</script>

<style>
</style>