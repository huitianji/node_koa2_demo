const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.type');
// 验证用户合法性
const userValidator = async (ctx, next) => {
  const {user_name, password} = ctx.request.body;
  // 合法性
  if(!user_name || !password) {
    console.log('用户名或密码为空', ctx.request.body) 
    // ctx.status = 400; // bad request 
    // ctx.body = {
    //     code: '10001',// 1大的模块(2前端1后端)  00 模块  01 编号 
    //     message: '用户名或密码为空',
    //     result: ''
    // }
    ctx.app.emit('error', userFormateError, ctx);

    return;
  }
  
  await next();
}

// 验证用户存在
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // 合理性
  // console.log('user_name=',user_name, '--', await getUserInfo({ user_name }))
  // await getUserInfo({ user_name })   表达式
  //--1
  // if(await getUserInfo({ user_name })) {
  //   // ctx.status = 409; // 冲突 - conflict
  //   // ctx.body = {
  //   //   code: '10002',
  //   //   message: '用户已经存在',
  //   //   result: ''
  //   // }
  //   ctx.app.emit('error', userAlreadyExited, ctx);
  //   return;
  // }
  // --2
  try {
    const res = await getUserInfo({user_name});
    if(res) {
      console.error('用户名已经存在', {user_name});
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch(err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }

  await next();
}

// 密码加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  // hash 保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
}

// 验证用户登录
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 1. 判断用户是否存在（不存在：报错）
  try {
    const res = await getUserInfo({user_name});

    if (!res) {
      console.error('用户名不存在', {user_name});
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    // 2. 判断用户密码是否匹配(不匹配：报错)
    if(!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch(err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx);
  }
  
  await next();
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}