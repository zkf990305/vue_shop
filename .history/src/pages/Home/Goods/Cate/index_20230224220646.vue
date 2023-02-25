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
                        >添加角色</el-button
                    >
                </el-col>
            </el-row>

            <!-- 角色列表区域 -->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-row
                            style="margin-left: 35px"
                            :class="[
                                'bdbottom',
                                index1 === 0 ? 'bdtop' : '',
                                'vcenter',
                            ]"
                            v-for="(item1, index1) in props.row.children"
                            :key="item1.id"
                        >
                            <!-- 渲染一级权限 -->
                            <el-col :span="5"
                                ><el-tag
                                    closable
                                    @close="
                                        removeRightById(props.row, item1.id)
                                    "
                                    >{{ item1.authName }}</el-tag
                                >
                                <i class="el-icon-caret-right"></i
                            ></el-col>

                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 通过for循环，嵌套渲染二级权限 -->
                                <el-row
                                    :class="[
                                        'bdbottom',
                                        index2 === 0 ? 'bdtop' : '',
                                        'vcenter',
                                    ]"
                                    v-for="(item2, index2) in item1.children"
                                    :key="item2.id"
                                >
                                    <el-col :span="6"
                                        ><el-tag
                                            type="success"
                                            closable
                                            @close="
                                                removeRightById(
                                                    props.row,
                                                    item2.id
                                                )
                                            "
                                            >{{ item2.authName }}</el-tag
                                        >
                                        <i class="el-icon-caret-right"></i
                                    ></el-col>
                                    <el-col :span="18">
                                        <el-tag
                                            type="warning"
                                            v-for="(
                                                item3, index3
                                            ) in item2.children"
                                            :key="item3.id"
                                            closable
                                            @close="
                                                removeRightById(
                                                    props.row,
                                                    item3.id
                                                )
                                            "
                                            >{{ item3.authName }}</el-tag
                                        >
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="300">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showEditDialog(scope.row.id)"
                            >编辑</el-button
                        >
                        <!-- 删除按钮 -->
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="rolesDelete(scope.row.id)"
                            >删除</el-button
                        >
                        <!-- 分配角色按钮 -->
                        <el-tooltip
                            effect="dark"
                            content="分配权限"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                                @click="showSetRightDialog(scope.row)"
                                >分配权限</el-button
                            >
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>