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
                label-position="top"
            >
                <el-tabs
                    v-model="activeIndex"
                    :tab-position="'left'"
                    :before-leave="beforeTabLeave"
                    @tab-click="tabClicked"
                >
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
                            <!-- 级联选择框 -->
                            <el-cascader
                                v-model="addForm.goods_cat"
                                :options="cateList"
                                :props="{
                                    expandTrigger: 'hover',
                                    ...cateProps,
                                }"
                                @change="handleChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <!-- 渲染表单的item项 -->
                        <el-form-item
                            :label="item.attr_name"
                            v-for="item in manyTableData"
                            :key="item.attr_id"
                        >
                            <!-- 复选框组 -->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox
                                    border
                                    :label="item"
                                    v-for="(item, i) in item.attr_vals"
                                    :key="i"
                                    >{{ item }}</el-checkbox
                                >
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item
                            :label="item.attr_name"
                            v-for="item in onlyTableData"
                            :key="item.attr_id"
                        >
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!-- action 表示图片要上传到的后台API地址 -->
                        <el-upload
                            :action="uploadURL"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            list-type="picture"
                            :headers="headersObj"
                            :on-success="handleSuccess"
                        >
                            <el-button size="small" type="primary"
                                >点击上传</el-button
                            >
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <!-- 富文本编辑器组件 Two-way Data-Binding -->
                        <quill-editor
                            ref="myQuillEditor"
                            v-model="addForm.goods_introduce"
                        />
                        <!-- 添加按钮 -->
                        <el-button
                            type="primary"
                            class="AddBtn"
                            @click="addShop"
                            >添加商品</el-button
                        ></el-tab-pane
                    >
                </el-tabs>
            </el-form>
        </el-card>
        <!-- 图片预览 -->
        <el-dialog
            title="图片预览"
            :visible.sync="previewDialogVisible"
            width="30%"
        >
            <img :src="previewPath" alt="" class="perviewImg" />
        </el-dialog>
    </div>
</template>

<script>
import { goodsAddFormRulesMixin } from '@/common/mixin.js'
export default {
    mixins: [goodsAddFormRulesMixin],
    data() {
        return {
            activeIndex: '0',
            // 添加商品的表单数据对象
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                // 商品所属的分类数组
                goods_cat: [],
                // 图片的数组
                pics: [],
                // 商品的详情描述
                goods_introduce: '',
                attrs: [],
            },
            // 存放商品列表数据
            cateList: [],
            cateProps: {
                label: 'cat_name',
                value: 'cat_id',
                children: 'children',
            },
            // 动态参数列表数据
            manyTableData: [],
            // 静态参数列表数据
            onlyTableData: [],
            // 上传图片的URL地址
            uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
            // 图片上传组件的headers请求头对象
            headersObj: {
                Authorization: window.sessionStorage.getItem('token'),
            },
            // 预览图片的路径
            previewPath: '',
            // 图片预览的对话框
            previewDialogVisible: false,
        }
    },
    created() {
        this.getCateList()
    },
    computed: {
        cateId() {
            if (this.addForm.goods_cat.length === 3) {
                return this.addForm.goods_cat[2]
            }
            return null
        },
    },
    methods: {
        // 获取所有商品分类数据
        async getCateList() {
            const { data: res } = await this.$http.get('/categories')
            if (res.meta.status !== 200) {
                return this.$message.error('获取商品分类数据失败！')
            }
            this.cateList = res.data
        },
        // 级联选择框选中项变化,会触发
        handleChange() {
            if (this.addForm.goods_cat.length !== 3) {
                this.addForm.goods_cat = []
            }
            console.log(this.addForm)
        },
        // 阻止标签页的切换
        beforeTabLeave(activeName, oldActiveName) {
            // console.log('即将离开标签页的名字: ', oldActiveName)
            // console.log('即将进入标签页的名字: ', activeName)
            if (
                (oldActiveName === '0' &&
                    this.addForm.goods_cat.length !== 3) ||
                this.addForm.goods_name === ''
            ) {
                this.$message.error('请先选择商品分类! 或 填写商品名称')
                return false
            }
        },
        async tabClicked() {
            // 证明访问的是动态列表
            if (this.activeIndex === '1') {
                const { data: res } = await this.$http.get(
                    `categories/${this.cateId}/attributes`,
                    {
                        params: { sel: 'many' },
                    }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('获取动态列表失败!')
                }
                res.data.forEach(
                    (item) =>
                        (item.attr_vals =
                            item.attr_vals.length === 0
                                ? []
                                : item.attr_vals.split(' '))
                )

                this.manyTableData = res.data
            }
            if (this.activeIndex === '2') {
                const { data: res } = await this.$http.get(
                    `categories/${this.cateId}/attributes`,
                    {
                        params: { sel: 'only' },
                    }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('获取静态列表失败!')
                }
                this.onlyTableData = res.data
            }
        },
        // 点击图片预览时触发
        handlePreview(file) {
            this.previewPath = file.response.data.url
            this.previewDialogVisible = true
            console.log('预览图片', file.response.data.url)
        },
        // 处理移除图片的操作
        handleRemove(file) {
            // 1. 获取将要删除的图片的临时路径
            const filePath = file.response.data.tmp_path
            // 2. 从 pics 数组中找到这个图片的对应的索引值
            const index = this.addForm.pics.findIndex((x) => x.pic === filePath)
            // 3. 调用数组的splice方法,把图片信息对象,从pics数组中移除
            this.addForm.pics.splice(index, 1)
            console.log('移除图片', file, this.addForm)
        },
        // 监听图片上传成功的事件
        handleSuccess(resposne) {
            // 1. 拼接得到一个图片信息对象
            const picInfo = { pic: resposne.data.tmp_path }
            // 2. 将图片信息对象 push 到 pics 数组中
            this.addForm.pics.push(picInfo)
            console.log(resposne)
            console.log(this.addForm)
        },
        addShop() {
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error('请填写必要的表单项')
                }
                // 执行添加的业务逻辑 深拷贝
                const form = _.cloneDeep(this.addForm)

                form.goods_cat = form.goods_cat.join(',')
                // 处理动态参数
                this.manyTableData.forEach((item) => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals,
                    }
                    this.addForm.attrs.push(newInfo)
                })
                // 处理静态参数
                this.onlyTableData.forEach((item) => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals,
                    }
                    this.addForm.attrs.push(newInfo)
                })
                form.attrs = this.addForm.attrs
                console.log(form)
                // 发起请求添加商品数据
                // 商品的名称必须是唯一的
                const { data: res } = await this.$http.post('goods', form)
                console.log(res)
                if (res.meta.status !== 201) {
                    return this.$message.error('添加商品失败!')
                }
                this.$message.success('添加商品成功!')
                this.$router.push('/goods')
                // 不能直接做转换因为在 级联选择器 中双向绑定了 goods_cat 作为key
                // this.addForm.goods_cat = this.addForm.goods_cat.join(',')
            })
        },
    },
}
</script>

<style lang="less" scoped>
/* 步骤条 */
.el-steps {
    margin: 15px 0;
}
.el-step__title {
    font-size: 12px;
}

.perviewImg {
    width: 100%;
}
.AddBtn {
    margin-top: 15px;
}
</style>