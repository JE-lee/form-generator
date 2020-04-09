const path = require('path')
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vue-prism-editor@0.5.1/dist/VuePrismEditor.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@femessage/element-ui@2.16.0/lib/theme-chalk/index.css' }],
  ],
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/back-to-top',
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
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue"],

    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { 
          test: /\.tsx?$/, 
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@vue/babel-preset-jsx'
                ],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsxSuffixTo: [/\.vue$/],
              },
            },
          ],
        }
      ]
    }
  },
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/JE-lee/form-generator',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  },
  markdown: {
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