<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <el-table :data="rightsList" stripe border>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="authName" label="权限名称" width="300">
                </el-table-column>
                <el-table-column prop="path" label="路径" width="300">
                </el-table-column>
                <el-table-column prop="level" label="权限等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag
                            v-else-if="scope.row.level === '1'"
                            type="success"
                            >二级</el-tag
                        >
                        <el-tag v-else type="warning">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 权限列表
            rightsList: [],
        }
    },
    created() {
        // 获取所有的权限
        this.getRightList()
    },
    methods: {
        // 获取权限列表
        async getRightList() {
            const { data: res } = await this.$http.get('rights/list')
            if (res.meta.status !== 200)
                return this.$message.error('获取权限列表失败')
            this.$message.success('获取用户列表成功!')
            this.rightsList = res.data
        },
    },
}
</script>

<style>
</style>