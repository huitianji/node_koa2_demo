const path = require('path');
const { fileUploadError, unSupportFileType, publishGoodsError, invalidGoodsId } = require('../constant/err.type');
const { createGoods, updateGoods, removeGoods } = require('../service/goods.service');
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

  // 控制器是最后的中间件 可以不用写next 
  async create (ctx) {
    // 直接调用service的createGoods方法
    try {
      // const res = await createGoods(ctx.request.body);
      const {createdAt, updatedAt , ...res} = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '发布商品职位成功',
        result: res
      }
    } catch(err) {
      console.error(err);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }

  // 修改
  async update (ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      }else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch(err) {
      console.error(err);
    }
  }

  // 硬删除
  async remove (ctx) {
    const res = await removeGoods(ctx.params.id);
    ctx.body = {
      code: 0,
      message: '删除商品成功',
      result: ''
    }
  }

}

module.exports = new GoodsController();