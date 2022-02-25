
const { invalidGoodsId } = require('../constant/err.type');

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      'goods_id': 'number'
    })
  } catch (err) {
    invalidGoodsId.result = err;
    return ctx.app.emit('error', invalidGoodsId, ctx);
  }

  await next();
};

module.exports = {
  validator
}