const Router = require('koa-router');
const { UploadFileSimgle, readAllFilesByStatic } = require('../apis/fileApi');
const multerUpload = require('./../config/uploadFileCtl');

const router = new Router();

/**
 * @swagger
 * tags:
 *    name: 文件管理
 *    desription: File management
 */

router.post('/coffee/upload/simgle', multerUpload.single('file'), UploadFileSimgle);
router.post('/coffee/readimgsurl', readAllFilesByStatic);

module.exports = router;
