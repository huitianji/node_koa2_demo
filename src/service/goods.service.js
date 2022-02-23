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

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });

    return res[0] > 0 ? true : false;
  }

  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } });
    return res > 0 ? true : false; 
  }
  
  // 查询商品数量
  // select count(*) from db_goods where deletedAt is null  
  async findGoods (pageNum, pageSize) {
    // 方法1
    // // 1.获取总数
    // const count = await Goods.count();
    // // 2.获取分页的具体数据
    // // pageSize * 1 隐式转换 数值型
    // const offset = (pageNum -1) * pageSize;
    // const rows = await Goods.findAll({ offset, limit: pageSize * 1 });

    // 方法2
    const offset = (pageNum -1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({ offset, limit: pageSize * 1 });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
}

module.exports = new goodsService();