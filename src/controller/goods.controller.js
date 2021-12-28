const path = require('path');
const { fileUploadError } = require('../constant/err.type');
class GoodsController {
  async upload (ctx, next) {
    // console.log(ctx.request.files);
    const { file } = ctx.request.files;
    if (file) {
      ctx.body = {
        code: 0,
        message: '图片上传成功',
        result:{
          goods_img: path.basename(file.path)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
    // ctx.body = '图片上传成功'
  }
}

module.exports = new GoodsController();