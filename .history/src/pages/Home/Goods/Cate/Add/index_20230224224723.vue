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
            <el-form-item label="父级分类:">
                <!-- options 用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                <el-cascader
                    v-model="selectdKeys"
                    :options="parentCateList"
                    :props="{
                        expandTrigger: 'hover',
                        ...cascaderProps,
                        checkStrictly: 'true',
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
            addCateForm: {
                cat_name: '',
            },
            // 选中的父级分类的id数组
            selectdKeys: [],
        }
    },
    methods: {
        // 监听添加分类对话框的关闭事件
        addDialogClosed() {
            this.$refs.addCateForm.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleAddClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeAddCateDialogVisible()
                })
                .catch((_) => {})
        },
        changeAddCateDialogVisible() {
            this.$emit('changeAddCateDialogVisible', false)
        },
        // 添加分类
        addCate() {
            this.$refs.addCateForm.validate(async (valid) => {
                if (!valid) return
                // const { data: res } = await this.$http.post(
                //     'roles',
                //     this.addRolesForm
                // )
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