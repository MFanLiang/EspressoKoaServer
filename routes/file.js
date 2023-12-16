const Router = require('koa-router');
const { UploadFileSimgle, readAllFilesByStatic } = require('../apis/fileApi');
const multerUpload = require('./../config/uploadFileCtl');

const router = new Router();

router.post('/upload/simgle', multerUpload.single('file'), UploadFileSimgle);
router.post('/readimgsurl', readAllFilesByStatic);

module.exports = router;
