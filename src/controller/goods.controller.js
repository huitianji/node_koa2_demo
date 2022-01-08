const path = require('path');
const { fileUploadError, unSupportFileType } = require('../constant/err.type');
class GoodsController {
  async upload (ctx, next) {
    const fileType = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    // console.log(ctx.request.files);
    const { file } = ctx.request.files;
    if (file) {
      if(!fileType.includes(file.type)){
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
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