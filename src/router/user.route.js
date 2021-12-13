const Router = require('koa-router');

const { register, login } = require('../controller/user.controller')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');

const router = new Router({prefix:'/users'})

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register);
// router.post('/register', register);

// 登录接口
router.post('/login', userValidator, verifyLogin, login) 

// 修改密码接口
router.patch('/', auth, (ctx, next) => {
  // const { authorization } = ctx.request.header;
  // const token = authorization.replace('Bearer ', '');
  // console.log(token, '--token--')
  console.log(ctx.state.user , '---')
  ctx.body = '修改密码成功';
})
// // GET /users/ 

// router.get('/', (ctx, next) => {
//     ctx.body = 'hello users'
// })


module.exports = router;