# vue_shop

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

- http 是无状态的
- 通过 cookie 在客户端记录状态
- 通过 session 在服务器端记录状态
- 通过 token 方式维持状态
- 前端与服务器之间存在跨域问题时使用
- 登录前输入帐号、密码 -》 服务器验证后返回 token -》 客户端保存 token -》 后续请求都携带 token 数据发送请求（用户的验证） -》 服务器验证 token 是否通过

## 项目准备工作

- 开始项目前创建一个分支来书写 写完成后在合并分支 `git checkout -b name` :创建一个名为 name 的分支
- 清空不必要的文件

---

1. 创建一个 Login 组件(三标签) : `template`(一: 模板) `script`(二: 属性/方法) `<style lang="less" scoped>` (三: 样式 支持 less 并且具有作用域)
2. 创建路由组件: 并且使用重定向 `redirect` 如果用户访问的是根路由路径 会自动重定向到登录的路由组件

---

图标引用：（IconFont 使用第三方的字体图标）

- 引入 assets/fonts 文件夹下的图标相关文件

- 项目引入步骤：

  - 在项目 main.js 文件里导入字体图标

    ```js
    // 导入字体图标
    import './assets/fonts/iconfont.js'
    ```

  - 在全体样式表 global.css 文件里加入通用 css 代码（引入一次就行）

    ```css
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    ```

  - 挑选相应图标并获取类名，应用于页面：

    ```js
    <svg slot="prefix" class="icon" aria-hidden="true">
      <use xlink:href="#icon-user"></use>
    </svg>
    ```

## Login 组件：

## 登录/退出功能

### 登录功能实现

路由导航守卫控制访问权限

如果用户没有登录，但是直接通过 URL 访问特定页面，需要重新导航到登录页面。

```js
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行  next('/login') 强制跳转
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从 sessionStorage 中获取到保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有 token，强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})
```

### 退出

退出功能实现原理

基于 token 的方式实现退出比较简单，只需要销毁本地的 token 即可。这样，后续的请求就不会携带 token，必须重新登录生成一个新的 token 之后才可以访问页面。

```js
// 清空token
window.sessionStorage.clear()
// 跳转到登录页
this.$router.push('/login')
```

## 主页布局

### 左侧菜单布局

菜单分为二级，并且可以折叠。

```js
<el-menu>
	<el-submenu>
        <!-- 这个template 是一级菜单的内容模板 -->
        <i class="el-icon-menu"></i>
        <span>一级菜单</span>
		<!-- 在一级菜单中，可以嵌套二级菜单 -->
		<el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">二级菜单</span>
        </el-menu-item>
    </el-submenu>
</el-menu>
```

### 通过接口获取菜单数据

通过 axios 请求拦截器添加 token，保证拥有获取数据的权限。

```js
axios.interceptors.request.use((config) => {
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
```

## 组件分出

父子组件通信：

[子组件修改父组件的值](https://blog.csdn.net/Antonweb/article/details/104027512)

## 验证规则对象

> 统一写在一个 common/mixin.js 文件中。

```js
import { userFormRules } from '../../../../common/mixin'
export default {
  mixins: [userFormRules],
}
```

## 出现问题及解决

1. Cascader 级联选择器

options 属性指定选项数组数据量过大，占满全屏

​	->> 全局样式添加：`.el-cascader-panel {height: 250px;}`

2. Table 表格

【商品分类】：树形数据与懒加载，自定义 `type=index` 列的行号，项目只需要第一层行号出现索引，第二层、第三层不需要，第一层唯一id `row-key="cat_id"`顺序间隔不同，索引列出现小问题。

 <u>索引： (当前页码 - 1) * 每页显示条数 + 该行数据在数组的下标 + 1</u> 

```js
<el-table
    :data="cateList"
    stripe
    border
    style="width: 100%"
    row-key="cat_id"
    :tree-props="{
    children: 'children',
        hasChildren: 'hasChildren',
    }"
>
        <el-table-column type="index" label="#" width="50">
            <template slot-scope="scope">
                <!-- 第一层展示索引 -->
                <span v-if="scope.row.cat_level === 0">
                    <!-- 索引： (当前页码 - 1) * 每页显示条数 + 该行数据在数组的下标 + 1 -->
                    {{ (queryInfo.pagenum - 1) * queryInfo.pagesize 
                        + cateList.indexOf(scope.row) +  1 }}
                 </span>
    </template>
    </el-table-column>
</el-table>
```

## 项目技巧

### 时间格式化

全局时间过滤器

```js
// 全局时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
```

使用：`{{ scope.row.add_time | dataFormat }}`





## 项目优化

### 项目优化策略

1. 生成打包报告
2. 第三方库启用 CDN
3. Element-UI 组件按需加载
4. 路由懒加载
5. 首页内容定制



#### 1. 生成打包报告



打包时，为了直观地发现项目中存在的问题，可以在打包时生成报告。生成报告的方式有两种：

① 通过命令行参数的形式生成报告

```shell
// 通过 vue-cli 的命令选项可以生成打包报告
// --report 选项可以生成 report.html 以帮助分析包内容
npx vue-cli-service build --report
```

② 通过可视化的 UI 面板直接查看报告（<font color='red'> 推荐 </font>）

​	在可视化的 UI 面板中，通过<font color='red'> 控制台 </font>和<font color='red'> 分析 </font>面板，可以方便的看到项目中存在的问题。



#### 2. 通过 vue.config.js 修改 webpack 的默认配置



通过 vue-cli 3.0 工具生成的项目，<font color="red"> 默认隐藏了所有 webpack 的配置项 </font>，目的是为了屏蔽项目的配置过程，让程序员把工作的重心，放到具体功能和业务逻辑的实现上。

如果程序员有修改 webpack 默认配置的需求，可以在项目根目录中，按需创建 <font color="red"> vue.config.js </font> 这个配置文件，从而对项目的打包发布过程做自定义的配置（具体配置参考 https://cli.vuejs.org/zh/config/#vue-config-js ）。

```javascript
// vue.config.js

// 这个文件中，应该导出一个包含了自定义配置选项的对象
module.exports = {
  // 选项...
}
```



#### 3. 为开发模式与发布模式指定不同的打包入口



默认情况下，Vue 项目的<font color="red"> 开发模式 </font>与<font color="red"> 发布模式 </font>，共用同一个打包的入口文件（即<font color="red"> src/main.js </font>）。为了将项目的开发过程与发布过程分离，我们可以为两种模式，各自指定打包的入口义件，即：

① 开发模式的入口文件：<font color="red"> src/main-dev.js </font>

② 发布模式的入口文件：<font color="red"> src/main-prod.js </font>



#### 4. configureWebpack 和 chainWebpack



在 vue.config.js 导出的配置对象中，新增 configureWebpack 或 chainWebpack 节点，来自定义 webpack 的打包配置。

在这里，configureWebpack 和 chainWebpack 的作用相同，唯一的区别就是它们修改 webpack 配置的方式不同:
① chainWebpack 通过链式编程的形式，来修改默认的 webpack 配置
② configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置

两者具体的使用差异，可参考如下网址:
https://cli.vuejs.org/zh/guide/webpack.html



#### 5. 通过 chainWebpack 自定义打包入口



代码示例如下：

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
        config.entry('app').clear().add('./src/main-prod.js')
    })
    config.when(process.env.NODE_ENV === 'development', config => {
        config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
```



#### 6. 通过 externals 加载外部 CDN 资源



默认情况下，通过 import 语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题。

为了解决上述问题，可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN 资源。凡是声明在 externals 中的第三方依赖包，都不会被打包。

开发时直接下载引入：发布时把直接引入可以省的包，使用window全局的方式来查找，也就是说 CDN 挂载。通过CDN挂载的方式进行引用。

具体配置代码如下：

```javascript
config.set('externals', {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_',
    echarts: 'echarts',
    nprogress: 'NProgress',
    'vue-quill-editor': 'VueQuillEditor',
    jquery: '$'
})
```

同时，需要在 public/index.html 文件的头部，添加如下的 CDN 资源引用：

```html
<!-- nprogress 的样式表文件 --> 
<link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
<!-- 富文本编辑器 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.7/quill.core.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.7/quill.snow.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.7/quill.bubble.min.css" />

<script src="https://cdn.staticfile.org/vue/2.6.14/vue.min.js"></script>
<script src="https://cdn.staticfile.org/vue-router/3.5.1/vue-router.min.js"></script>
<script src="https://cdn.staticfile.org/axios/1.2.2/axios.min.js"></script>
<script src="https://cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
<script src="https://cdn.staticfile.org/echarts/5.4.1/echarts.min.js"></script>
<script src="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script>
<!-- 富文本编辑器的 js 文件 -->
<script src="https://cdn.staticfile.org/quill/1.3.7/quill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.js"></script>
```



#### 7. 通过 CDN 优化 ElementUI 的打包

   

   虽然在开发阶段，我们启用了 element-ui 组件的按需加载，尽可能的减少了打包的体积，但是那些被按需加载的组件，还是占用了较大的文件体积。此时，我们可以将 element-ui 中的组件，也通过 CDN 的形式来加载，这样能够进一步减小打包后的文件体积。

   具体操作流程如下:
   在 main-prod.js中，注释掉 element-ui 按需加载的代码
   在 index.html 的头部区域中，通过 CDN 加载 element-ui 的 js 和 css 样式

   ```html
<!-- element-ui 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css" />
<!-- element-ui 的 js 文件 -->
<script src="https://cdn.staticfile.org/element-ui/2.15.13/index.js"></script>
   ```

   

#### 8. 首页内容定制



不同的打包环境下，首页内容可能会有所不同，我们可以通过插件的方式进行定制，插件配置如下：

```javascript
// 发布模式
chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
        config.plugin('html').tap(args => {
            args[0].isProd = true
            return args
        })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
        config.plugin('html').tap(args => {
            args[0].isProd = false
            return args
        })
    })
```

在 public/index.html 首页中，可以根据 isProd 的值，来决定如何渲染页面结构：

```html
<!-- 按需渲染页面的标题 -->
<title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev -' %>电商后台管理系统</title>
<!-- 按需加载外部的 CDN 资源 -->
<% if (htmlWebpackPlugin.options.isProd) {%>
<!-- 通过 externals 加载的外部 CDN 资源 -->
<% } %>
```



#### 9. 路由懒加载



当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

具体需要三步：

① 安装 <font color="red"> @babel/plugin-syntax-dynamic-import </font>包。

② 在 <font color="red"> babel.config.js </font> 配置文件中声明该插件。

③ 将路由改为按需加载的形式，示例代码如下：

```javascript
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

关于路由懒加载的详细文档，可参考如下网址:
https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
