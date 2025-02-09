// 这是项目发布阶段需要用到的bebel插件
const prodPlugins = []
// 如果是发布阶段,处于生产环境,就向prodPlugins数组里添加一个插件
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    'transform-remove-console'
  ]
}