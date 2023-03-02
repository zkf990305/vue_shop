<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card
            ><body>
                <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div id="main" style="width: 600px; height: 400px"></div></body
        ></el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    created() {},
    mounted() {},
}
</script>

<style>
</style>