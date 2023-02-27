<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 头部警告区域 -->
            <el-alert
                title="添加商品信息"
                :closable="false"
                type="info"
                center
                show-icon
            >
            </el-alert>
            <!-- 步骤条区域 -->
            <el-steps
                :space="200"
                :active="activeIndex - 0"
                align-center
                finish-status="success"
            >
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab栏区域 -->
            <el-form
                :model="addForm"
                :rules="addFormRules"
                ref="addFormRef"
                label-width="100px"
            >
                <el-tabs v-model="activeIndex" :tab-position="'left'">
                    <el-tab-pane label="基本信息" name="0">
                        <!-- 基本信息 -->
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-select
                                v-model="addForm.goods_cat"
                                placeholder="请选择活动区域"
                            >
                                <el-option
                                    label="区域一"
                                    value="shanghai"
                                ></el-option>
                                <el-option
                                    label="区域二"
                                    value="beijing"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1"
                        >商品参数</el-tab-pane
                    >
                    <el-tab-pane label="商品属性" name="2"
                        >商品属性</el-tab-pane
                    >
                    <el-tab-pane label="商品图片" name="3"
                        >商品图片</el-tab-pane
                    >
                    <el-tab-pane label="商品内容" name="4"
                        >商品内容</el-tab-pane
                    >
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '0',
            addForm: {},
            addFormRules: {},
        }
    },
}
</script>

<style>
</style>