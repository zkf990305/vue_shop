<template>
    <!--    修改地址的对话框-->
    <el-dialog
        title="修改地址"
        :visible.sync="addressDialogVisible"
        @close="addressDialogClosed"
        width="50%"
    >
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
    data() {
        return {}
    },
    methods: {
        // 关闭对话框清空表达
        addressDialogClosed() {
            this.$refs.addressFormRef.resetFields()
        },
        changeEditAddressDialogVisible() {
            this.$emit('changeEditAddressDialogVisible', false)
        },
    },
}
</script>

<style>
</style>