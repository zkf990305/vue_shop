<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../../../assets/logo.png" alt="" />
            </div>
            <!-- 登录表单区域 -->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="0px"
                class="login_form"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username">
                        <svg slot="prefix" class="icon" aria-hidden="true">
                            <use xlink:href="#icon-user"></use>
                        </svg>
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password>
                        <svg slot="prefix" class="icon" aria-hidden="true">
                            <use xlink:href="#icon-3702mima"></use>
                        </svg>
                    </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login('loginFormRef')"
                        >登录</el-button
                    >
                    <el-button
                        type="info"
                        @click="resetLoginForm('loginFormRef')"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { userLoginFormRulesMixin } from '../../../common/mixin'
export default {
    mixins: [userLoginFormRulesMixin],
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456',
            },
        }
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm(formName) {
            this.$refs[formName].resetFields()
        },
        login(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return
                const { data: result } = await this.$http.post(
                    'login',
                    this.loginForm
                )
                if (result.meta.status !== 200) {
                    return this.$message.error('登录失败')
                }
                this.$message.success('登录成功')
                // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
                //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
                //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
                window.sessionStorage.setItem('token', result.data.token)
                // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
                this.$router.push('/home')
            })
        },
    },
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;
        }
    }
    .login_form {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
}
</style>