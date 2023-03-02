<template>
    <!--    修改地址的对话框-->
    <el-dialog
        title="修改地址"
        :visible.sync="addressDialogVisible"
        @close="addressDialogClosed"
         :before-close="handleAddClose"
        width="50%"
    >
        <el-form
            :model="addressForm"
            :rules="addressFormRules"
            ref="addressFormRef"
            label-width="100px"
        >
            <el-form-item label="省市区/县" prop="address1">
                <!--          <el-input v-model="addressForm.address1"></el-input>-->
                <el-cascader
                    :options="cityData"
                    v-model="addressForm.address1"
                    :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address2">
                <el-input v-model="addressForm.address2"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeEditAddressDialogVisible">取 消</el-button>
            <el-button type="primary" @click="changeEditAddressDialogVisible"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import cityData from './citydata'
import { editOrdersFormRulesMinix } from '@/common/mixin.js'
export default {
    mixins: [editOrdersFormRulesMinix],
    data() {
        return {
            addressForm: {
                address1: [],
                address2: '',
            },
            // 地址的选择
            cityData,
        }
    },
    props: {
        addressDialogVisible: Boolean,
    },

    methods: {
        // 关闭对话框清空表达
        addressDialogClosed() {
            this.$refs.addressFormRef.resetFields()
        },
        // 通过点击关闭图标或遮罩关闭 Dialog 时起效
        handleAddClose() {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.changeAddCateDialogVisible()
                })
                .catch((_) => {})
        },
        changeEditAddressDialogVisible() {
            this.$emit('changeEditAddressDialogVisible', false)
        },
    },
}
</script>

<style>
</style>