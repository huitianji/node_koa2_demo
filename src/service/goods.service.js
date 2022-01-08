const Goods = require('../model/goods.mode');
class goodsService {
  async createGoods(goods) {
    // console.log('发布成功')
    // return {
    //   'goods_name': '商品1-蓝牙耳机'
    // }
    const res = await Goods.create(goods);
    // console.log(res, '--res--')
    return res.dataValues;
  }
}

module.exports = new goodsService();