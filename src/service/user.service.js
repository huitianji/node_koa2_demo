const User = require('../model/use.mode');
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

    // console.log(aaa);// 模拟用户注册错误
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
    // console.log('user.service.js/res=',res)
    return (res ? res.dataValues : null); //返回的是promise 对象
  }

  async updateById({id, user_name, password, is_admin}) {
    const whereOpt = {id};
    const newUser = {}

    user_name && Object.assign(newUser, {user_name});
    password && Object.assign(newUser, {password});
    is_admin && Object.assign(newUser, {is_admin});

    const res = await User.update(newUser, {
      where: whereOpt
    });
    // console.log('res--', res, '//', res[0]>0) //res-- [ 1 ]
    return res[0] > 0 ? true : false;
  }
}
// 调用service 最好都加上try {} catch(err) {}
module.exports = new UserService();












