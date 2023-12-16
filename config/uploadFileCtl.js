/** 文件资源上传处理 控制器 */
const multer = require('@koa/multer');
const { UPLOAD_DIRIMGS } = require('../config/serverConfig');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => { 
    // 设置文件或图片资源的存储目录
    cb(null, UPLOAD_DIRIMGS)
  },
  filename: (req, file, cb) => {
    // 设置文件或图片资源名称
    cb(null, `${file.originalname}`)
  }
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
