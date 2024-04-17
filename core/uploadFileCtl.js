/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 13:12:54
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 16:18:47
 * @FilePath: \koa-generator\core\uploadFileCtl.js
 * @Description: 文件资源上传处理。文件级别：核心处理文件
 */

const multer = require('@koa/multer');
const { UPLOAD_DIRIMGS } = require('../config/serverConfig');

// 磁盘存储引擎使您可以完全控制将文件存储到磁盘。
const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    // * 设置文件或图片资源的存储目录
    callback(null, UPLOAD_DIRIMGS);
  },
  filename: (req, file, callback) => {
    // * 设置文件或图片资源名称
    callback(null, `${file.originalname}`)
  }
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
