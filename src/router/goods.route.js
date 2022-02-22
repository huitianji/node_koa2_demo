const Router = require('koa-router');
const { upload, create, update, remove, restore } = require('../controller/goods.controller');
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');

const { validator } = require('../middleware/goods.middleware');

const router = new Router({prefix:'/goods'});

// 图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)
// router.post('/upload', upload)

// 发布goods 接口
// router.post('/', auth, hadAdminPermission, validator, (ctx) => {
//   ctx.body = '发布商品成功'
// })
router.post('/', auth, hadAdminPermission, validator, create);

// 修改商品接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 硬删除接口
// router.delete('/:id', auth, hadAdminPermission, remove)

// 软删除
router.post('/off/:id', auth, hadAdminPermission, remove)

// 恢复
router.post('/on/:id', auth, hadAdminPermission, restore);

module.exports = router;
