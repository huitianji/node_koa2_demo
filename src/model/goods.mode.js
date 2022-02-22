// 表
const { DataTypes } = require('sequelize');
// 数据库链接
const seq = require('../db/seq');

const Goods = seq.define('db_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_num: {
    type:DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片的路径'
  }
  // ,
  // deletedAt: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: true,
  //   comment: '商品删除'
  // }

})
// 强制同步数据库（创建数据表）
// Goods.sync({force: true})
// node src/model/goods.mode.js

module.exports = Goods;

