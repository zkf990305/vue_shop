<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
            <el-steps
                :space="200"
                :active="activeIndex"
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
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: 0,
        }
    },
}
</script>

<style>
</style>