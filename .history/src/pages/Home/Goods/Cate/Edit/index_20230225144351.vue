<template>
    <!-- 修改分类对话框 -->
    <el-dialog
        title="修改分类"
        :visible.sync="dialogVisible"
        @close="editDialogClosed"
        :before-close="handleEditClose"
    >
        <el-form
            :model="addCateForm"
            :rules="addCateFormRules"
            ref="addCateFormRef"
            label-width="100px"
        >
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:">
                <!-- options 用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                <el-cascader
                    v-model="selectdKeys"
                    :options="parentCateList"
                    :props="{
                        expandTrigger: 'hover',
                        ...cascaderProps,
                        checkStrictly: true,
                    }"
                    @change="parentCateChanged"
                    clearable
                ></el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeAddCateDialogVisible">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { cateAddFormRulesMixin } from '../../../../../common/mixin'
export default {
    mixins: [cateAddFormRulesMixin],
    props: {
        dialogVisible: Boolean,
        parentCateList: Array,
    },
    data() {
        return {
            // 修改分类的表单数据对象
            addCateForm: {
                // 将要修改分类的名称
                cat_name: '',
                // 父级分类的ID
                cat_pid: 0,
                // 分类层级,默认要修改的是1级分类
                cat_level: 0,
            },
            // 选中的父级分类的id数组
            selectdKeys: [],
            // 指定级联选择器的配置对象
            cascaderProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
            },
        }
    },
    methods: {
        // 监听修改分类对话框的关闭事件
        editDialogClosed() {
            this.$refs.addCateFormRef.resetFields()
            this.addCateForm.cat_name = ''
            this.selectdKeys = []
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleEditClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeAddCateDialogVisible()
                })
                .catch((_) => {})
        },
        changeAddCateDialogVisible() {
            this.$emit('changeAddCateDialogVisible', false)
        },
        // 选中向发生变化触发
        parentCateChanged() {
            // 如果 selectdKeys 数组中的length大于0证明选中父级分类
            // 反之,就说明没有选中任何父级分类
            if (this.selectdKeys.length > 0) {
                // 父级分类的id
                this.addCateForm.cat_pid =
                    this.selectdKeys[this.selectdKeys.length - 1]
                // 为当前分类的等级赋值
                this.addCateForm.cat_level = this.selectdKeys.length
                return
            } else {
                // 父级分类的id
                this.addCateForm.cat_pid = 0
                // 为当前分类的等级赋值
                this.addCateForm.cat_level = 0
            }
        },
        // 修改分类
        addCate() {
            this.$refs.addCateFormRef.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.post(
                    'categories',
                    this.addCateForm
                )
                if (res.meta.status !== 201) {
                    return this.$message.error('修改分类失败!')
                }
                this.$message.success('修改分类成功!')
                // this.getCateList()
                this.changeAddCateDialogVisible()
            })
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