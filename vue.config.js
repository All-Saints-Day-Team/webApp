// 多页配置
let path = require('path')
let glob = require('glob')
// 配置pages多页面获取当前文件夹下的html和js
function getEntry (globPath) {
  let entries = {}; let basename; let tmp; let pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    // console.log(entry)
    tmp = entry.split('/').splice(-3)
    console.log(tmp)
    pathname = basename // 正确输出js和html的路径
    // console.log(pathname)
    entries[pathname] = {
      entry: ['src/viewport.js', 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js'],
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title: tmp[2],
      filename: tmp[2]
    }
  })
  return entries
}

let pages = getEntry('./src/views/**?/*.html')
console.log(pages)
const DIST_PATH = path.resolve(__dirname, 'dist')
// 多页配置 End
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: DIST_PATH,
  assetsDir: 'static',
  pages,
  devServer: {
    contentBase: DIST_PATH,
    // port: 8080, // 端口号
    // host: 'localhost',
    // https: false, // https:{type:Boolean}
    // open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }, // 配置多个代理
    before: app => {}
  }
  // pages: {
  //   index: {
  //     // entry for the page
  //     entry: ['src/viewport.js', 'src/main.js'],
  //     // the source template
  //     template: 'public/index.html',
  //     // output as dist/index.html
  //     filename: 'index.html'
  //   }
  // }
  // devServer: {
  //   port: 9000,
  //   // host: '127.0.0.1',
  //   proxy: {
  //     '/v1': {
  //       target: 'http://' + devApiUrl + ':' + devApiPort + '',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }
}
