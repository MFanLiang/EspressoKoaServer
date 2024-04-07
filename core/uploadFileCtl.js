/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 13:12:54
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:55:27
 * @FilePath: \koa-generator\core\uploadFileCtl.js
 * @Description: 文件资源上传处理。文件级别：核心处理文件
 */

const multer = require('@koa/multer');
const { UPLOAD_DIRIMGS } = require('../config/serverConfig');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // * 设置文件或图片资源的存储目录
    cb(null, UPLOAD_DIRIMGS);
  },
  filename: (req, file, cb) => {
    // * 设置文件或图片资源名称
    cb(null, `${file.originalname}`)
  }
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
