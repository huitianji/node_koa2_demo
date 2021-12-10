const Router = require('koa-router');

const { register, login } = require('../controller/user.controller')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')

const router = new Router({prefix:'/users'})

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register);
// router.post('/register', register);

// 登录接口
router.post('/login', userValidator, verifyLogin, login) 

// // GET /users/ 

// router.get('/', (ctx, next) => {
//     ctx.body = 'hello users'
// })


module.exports = router;