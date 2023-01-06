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
- 登录前输入帐号、密码 -》 服务器验证后返回token -》 客户端保存token -》 后续请求都携带token数据发送请求（用户的验证） -》 服务器验证token是否通过

## 项目准备工作

- 开始项目前创建一个分支来书写 写完成后在合并分支 `git checkout -b name` :创建一个名为name的分支
- 清空不必要的文件

------

1. 创建一个Login组件(三标签) : `template`(一: 模板) `script`(二: 属性/方法) `<style lang="less" scoped>` (三: 样式 支持less并且具有作用域)
2. 创建路由组件: 并且使用重定向 `redirect` 如果用户访问的是根路由路径 会自动重定向到登录的路由组件

------

 图标引用：（IconFont使用第三方的字体图标）

* 引入assets/fonts文件夹下的图标相关文件

* 项目引入步骤：

  * 在项目main.js文件里导入字体图标

    ```js
    // 导入字体图标
    import './assets/fonts/iconfont.js'
    ```

  * 在全体样式表global.css文件里加入通用css代码（引入一次就行）

    ```css
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
    ```

  * 挑选相应图标并获取类名，应用于页面：

    ```js
    <svg slot="prefix" class="icon" aria-hidden="true">
        <use xlink:href="#icon-user"></use>
    </svg>
    ```

    

## Login组件：





## 登录/退出功能

### 登录功能实现

路由导航守卫控制访问权限

如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面。

```js
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行  next('/login') 强制跳转
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next();
  // 从 sessionStorage 中获取到保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token');
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

