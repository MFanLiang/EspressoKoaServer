/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 13:12:54
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-05-11 15:48:07
 * @FilePath: \EspressoKoaServer\core\uploadFileCtl.js
 * @Description: 文件资源上传处理。文件级别：核心处理文件
 */

const path = require('path');
const multer = require('@koa/multer');
const { UPLOAD_DIRIMGS, UPLOAD_DIRFILES } = require('../config/serverConfig');

// 磁盘存储引擎使您可以完全控制将文件存储到磁盘。
const picStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    // * 设置图片资源的存储目录
    callback(null, UPLOAD_DIRIMGS);
  },
  filename: (req, file, callback) => {
    let fileName = file.originalname.split('.')[0];
    let extName = file.originalname.split('.')[1];
    // * 设置图片资源名称
    callback(null, `${fileName}-${Date.now().toString(16)}.${extName}`);
  }
});

const docStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    // * 设置文件资源的存储目录
    callback(null, UPLOAD_DIRFILES);
  },
  filename: (req, file, callback) => {
    let fileName = file.originalname.split('.')[0];
    let extName = file.originalname.split('.')[1];
    // * 设置文件资源名称
    callback(null, `${fileName}-${Date.now().toString(16)}.${extName}`);
  }
});

// 图片上传限制
const picLimits = {
  fields: 10, // 非文件字段的数量
  filesize: 1000 * 1024, // 文件大小，单位: b
  files: 1 //文件数量，支持一个文件
};

// 文件上传限制
const fileLimits = {
  fields: 10, // 非文件字段的数量
  filesize: 1000 * 1024, // 文件大小，单位: b
  files: 1 //文件数量，支持一个文件
};

const fieldsParams = [
  { name: "description" },
  { name: "uploader" },
  { name: "createTime" },
  { name: "updateTime" }
];

const multerUploader = multer({
  storage: picStorage,
  limits: picLimits,
  fields: fieldsParams
});

const fileDocUploader = multer({
  storage: docStorage,
  limits: fileLimits,
  fields: fieldsParams
});

module.exports = {
  multerUploader,
  fileDocUploader
};
