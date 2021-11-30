// const Koa = require('koa');
const { APP_PORT } = require('./config/config.default');

// const userRouter = require('./router/user.route')

// const app = new Koa();

// app.use(userRouter.routes())

// const Router = require('koa-router');
// const indexRouter = new Router();
// indexRouter.get('/', (ctx, next) => {
//     ctx.body = 'hellow index'
// })

// const userRouter = new Router();
// userRouter.get('/users', (ctx, next) => {
//     ctx.body = 'hello users;'
// })

// app.use(indexRouter.routes())
// app.use(userRouter.routes())

// 中间件
// app.use((ctx,next) => {
//     ctx.body = 'hello body'
// })

const app = require('./app/index');

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})




















