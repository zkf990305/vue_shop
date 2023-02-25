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
    // data() {
    //     return {
    //         // 修改分类的表单数据对象
    //         addCateForm: {
    //             // 将要修改分类的名称
    //             cat_name: '',
    //             // 父级分类的ID
    //             cat_pid: 0,
    //             // 分类层级,默认要修改的是1级分类
    //             cat_level: 0,
    //         },
    //     }
    // },
    methods: {
        // 监听修改分类对话框的关闭事件
        editDialogClosed() {
            this.$refs.editCateFormRef.resetFields()
            this.addCateForm.cat_name = ''
            this.selectdKeys = []
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
            const { data: res } = await this.$http.put(
                'categories/' + cateObject.cat_id,
                { cat_name: cateObject.cat_name }
            )
            if (res.meta.status !== 200) {
                return this.$message.error('更新分类数据失败!')
            }
            this.$message.success('更新分类数据成功!')
            this.getCateList()
            this.editCateDialogVisbel = false
            // console.log(res)
        },
    },
}
</script>

<style>
</style>
<!-- <style lang="less" scoped>
// .treetable {
//     margin-top: 15px;
// }
.el-cascader {
    width: 100%;
}
</style> -->