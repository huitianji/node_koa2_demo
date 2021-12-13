const jwt = require('jsonwebtoken');
const User = require('../model/use.mode');
const { createUser, getUserInfo, updateById } = require('../service/user.service');
const { userRegisterError } = require('../constant/err.type');

const { JWT_SECRET } = require('../config/config.default')
class UserController {
  async register(ctx, next) {
      // 1.获取数据
      // console.log(ctx.request.body)
      // ctx.body = '用户注册成功'
      const {user_name, password} = ctx.request.body; 
      // // 合法性
      // if(!user_name || !password) {
      //   console.log('用户名或密码为空', ctx.request.body)
      //   ctx.status = 400; // bad request 
      //   ctx.body = {
      //     code: '10001',// 1大的模块(2前端1后端)  00 模块  01 编号
      //     message: '用户名或密码为空',
      //     result: ''
      //   }
      //   return;
      // }
      // // 合理性
      // // mdn http 响应码
      // if(getUserInfo({ user_name })) {
      //   ctx.status = 409; // 冲突 - conflict
      //   ctx.body = {
      //     code: '10002',
      //     message: '用户已经存在',
      //     result: ''
      //   }
      //   return;
      // }
      // 2.操作数据库
      try {
          const res = await createUser(user_name, password)
          // console.log(res)
          // 3.返回结果
          // ctx.body = ctx.request.body;
          ctx.body = {
              code: '0',
              message: '用户注册成功',
              result: {
                  id: res.id,
                  user_name: res.user_name
              }
          }
      } catch(err){
        console.log(err);
        ctx.app.emit('error', userRegisterError, ctx);
      //   return;
      }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // ctx.body = '登录成功'
    // ctx.body = `欢迎 ${user_name} 回来！`
    // 1.获取用户信息(在token的payload中，记录 id, user_name, is_admin)
    try {
      // 从返回结果对象中，剔除 password属性，将剩下的属性放到res中
      const { password, ...res } = await getUserInfo({user_name});
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res,  JWT_SECRET, { expiresIn: '1d'})
        }
      }
    } catch(err) {
      console.error('用户登录失败', err);
    }
  }

  async changePassword(ctx, next) {
    // 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // 操作数据库
    // console.log(id,'--', password);
    // return;
    // await updateById({id, password});
    // console.log(await updateById({id, password}))
    if (await updateById({id, password})) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码错误',
        result: ''
      }
    }
    // 返回结果
  }
}

module.exports = new UserController();