const User = require('../model/use.mode');
const { createUser, getUserInfo } = require('../service/user.service');

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
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController();