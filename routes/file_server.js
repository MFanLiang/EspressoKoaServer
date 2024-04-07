/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 14:25:14
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-08 00:10:11
 * @FilePath: \koa-generator\routes\file_server.js
 * @Description: 文件操作管理服务-接口路由
 */

const Router = require('koa-router');
const { UploadFileSimgle, readAllFilesByStatic } = require('../apis/fileApi');
const multerUpload = require('../core/uploadFileCtl');

const router = new Router();

/**
 * @swagger
 * tags:
 *    name: 文件服务
 *    desription: File management
 */

/**
 * @swagger
 * /coffee/upload/simgle:
 *   post:
 *     summary: 单文件上传
 *     description: 用以提供单个图片文件的上传
 *     tags: [文件服务]
 *     produces:
 *       - multipart/form-data
 */
router.post('/coffee/upload/simgle', multerUpload.single('file'), UploadFileSimgle);

router.post('/coffee/readimgsurl', readAllFilesByStatic);

module.exports = router;
