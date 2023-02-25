<template>
    <!-- 修改分类对话框 -->
    <el-dialog
        title="修改分类"
        :visible.sync="dialogVisible"
        @close="editDialogClosed"
        :before-close="handleEditClose"
    >
        <el-form
            :model="cateObject"
            :rules="addCateFormRules"
            ref="editCateFormRef"
            label-width="100px"
        >
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="cateObject.cat_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeEditCateDialogVisible">取 消</el-button>
            <el-button type="primary" @click="editCateInfo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { cateAddFormRulesMixin } from '../../../../../common/mixin'
export default {
    mixins: [cateAddFormRulesMixin],
    props: {
        dialogVisible: Boolean,
        cateObject: Object,
    },
    methods: {
        // 监听修改分类对话框的关闭事件
        editDialogClosed() {
            this.$refs.editCateFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleEditClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeEditCateDialogVisible()
                })
                .catch((_) => {})
        },
        changeEditCateDialogVisible() {
            this.$emit('changeEditCateDialogVisible', false)
        },
        // 编辑分类信息
        async editCateInfo() {
            this.$refs.editCateFormRef.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.put(
                    'categories/' + this.cateObject.cat_id,
                    { cat_name: this.cateObject.cat_name }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('更新分类数据失败!')
                }
                this.$message.success('更新分类数据成功!')
                this.$parent.getCateList()
                this.changeEditCateDialogVisible()
            })
        },
    },
}
</script>

<style>
</style>
