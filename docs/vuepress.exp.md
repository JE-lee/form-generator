1. 安装依赖
```bash
yarn add less less-loader markdown-it-vuese vue-template-compiler vuepress vuepress-plugin-live --dev
```
2. 配置docs/.vuepress/config.js
```javascript
const path = require('path')
module.exports = {
  // editor 样式
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vue-prism-editor@0.5.1/dist/VuePrismEditor.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@femessage/element-ui@2.16.0/lib/theme-chalk/index.css' }],
  ],
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/back-to-top',
    // vue-live 插件
    [
      'live',
      {
        // to use a custom layout for your vue components
        layout: path.resolve(__dirname, './layout.vue'),
        editorProps: {
          lineNumbers: true,
        }
      }
    ],
  ],
  
  markdown: {
    // 使用markdown-it-vuese 作为markdown parser
    extendMarkdown: (md) => {
      md.use(require('markdown-it-vuese/src/index.js'), {
        root: `${process.cwd()}/src/`,
        useRender: (vueseRender) => {
          const renderRes = vueseRender.render()
          // 格式转换可以去这里查看详情 https://vuese.org/zh/markdown-render/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-render
          return Object.entries(renderRes).reduce((acc, [title, value]) => acc.concat(`## ${title}\r ${value}`)
            , []).join('\r')
        },
      })

    }
  }
}
```

3. 
[vuepress 配置](https://vuepress.vuejs.org/zh/config/)
[vuese 组件注释写法](https://vuese.org/zh/cli/#%E4%B8%BA%E4%BD%A0%E7%9A%84%E7%BB%84%E4%BB%B6%E7%BC%96%E5%86%99%E6%96%87%E6%A1%A3)