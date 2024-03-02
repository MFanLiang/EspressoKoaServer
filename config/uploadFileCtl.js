/** 文件资源上传处理 控制器 */

const multer = require('@koa/multer');
const { UPLOAD_DIRIMGS } = require('../config/serverConfig');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // * 获取日期时间对象
    let date = new Date();

    // * 根据日期时间对象读取年份
    let year = date.getFullYear();

    // * 根据日期时间对象读取月份
    let month = (date.getMonth() + 1).toString().padStart(2, '0');

    // * 根据日期时间对象读取日期
    let day = date.getDate();

    // 设置文件或图片资源的存储目录
    cb(null, UPLOAD_DIRIMGS);
  },
  filename: (req, file, cb) => {
    // 设置文件或图片资源名称
    cb(null, `${file.originalname}`)
  }
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
