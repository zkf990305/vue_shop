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
