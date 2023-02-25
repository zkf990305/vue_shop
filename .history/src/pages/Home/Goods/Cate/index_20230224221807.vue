<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加角色按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddDialog()"
                        >添加分类</el-button
                    >
                </el-col>
            </el-row>

            <!-- 角色列表区域 -->
        </el-card>
    </div>
</template>

<script>
import AddCate from '../Goods/Cate/Add/index.vue'
export default {}
</script>

<style>
</style>