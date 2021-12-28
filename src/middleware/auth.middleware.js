const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, invalidToken, hasNotAdminPermisson } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');

  try {
    // user中就包含了payload 信息{ id, user_name, is_admin }
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user; 
    // console.log('-{-', user, '-}-');

  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token 已经过期');
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('无效的 token ');  
        return ctx.app.emit('error', invalidToken, ctx);
    }
    // console.error('')
  }

  await next();
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin} = ctx.state.user;

  if (!is_admin) {
    console.error('该用户没有管理员权限', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermisson, ctx);
  }
  
  await next();
}

module.exports = {
  auth,
  hadAdminPermission
}











