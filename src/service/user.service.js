const User = require('../model/use.mode')
class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库
    // return '写入数据库成功';
    // 写入数据库
    // res = await  User.create({
    //   user_name: user_name,
    //   password: password
    // })
    // await（关键字） 表达式-返回值: promise 对象的值 （value, state）
    // 返回的是成功值，错误的通过catch 返回来。
    const res = await User.create({user_name, password})
    // console.log(res)

    // 把res 作为一个对象返回
    return res.dataValues;
    // 
  }

  async getUserInfo({id, user_name, password, is_admin}) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })

    return res ? res.dataValues : null;
  }
}

module.exports = new UserService();












