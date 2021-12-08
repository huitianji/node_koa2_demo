const { getUserInfo } = require('../service/user.service');
const { userFormateError, userAlreadyExited } = require('../constant/err.type');
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

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // 合理性
  // console.log('user_name=',user_name, '--', getUserInfo({ user_name }))
  if(getUserInfo({ user_name })) {
    // ctx.status = 409; // 冲突 - conflict
    // ctx.body = {
    //   code: '10002',
    //   message: '用户已经存在',
    //   result: ''
    // }
    ctx.app.emit('error', userAlreadyExited, ctx);
    return;
  }

  await next();
}

module.exports = {
    userValidator,
    verifyUser
}