const Router = require('koa-router');
const { upload, create } = require('../controller/goods.controller');
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
router.post('/', auth, hadAdminPermission, validator, create)

module.exports = router;
