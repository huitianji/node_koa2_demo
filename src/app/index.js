const path = require('path');

const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');

const errHandler = require('./errHandler');

// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/goods.route');
const router = require('../router/index');

const app = new Koa();

app.use(KoaBody({
  multipart: true,
  formidable: {
    // 在配置选项option里，不推荐使用相对路径
    // 在option里面的相对路径，不是相对当前的文件，相对的是当前的进程process.cwd();
    // uploadDir: './src/upload',
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}));
// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.use(router.routes());
app.use(router.allowedMethods());

//统一错误处理
// app.on('error', (err, ctx)=>{})
app.on('error', errHandler)

module.exports = app;
// console.log(__dirname)
// console.log(__filename)
// console.log(process.cwd()); // /Users/jihuitian/jht_project/node_koa2
// console.log(path.join(__dirname, '../upload')) // /Users/jihuitian/jht_project/node_koa2/src/upload
// console.log(path.basename(__filename)) // index.js