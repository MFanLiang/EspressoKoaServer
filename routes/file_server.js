/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 14:25:14
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 02:29:06
 * @FilePath: \koa-generator\routes\file_server.js
 * @Description: 文件操作管理服务-接口路由
 */

const Router = require('koa-router');
const { UploadFileSimgle, readAllFilesByStatic } = require('../apis/fileApi');
const multerUpload = require('../core/uploadFileCtl');

const router = new Router();

/**
 * @swagger
 * /coffee/upload/simgle:
 *   post:
 *     summary: 单文件上传
 *     description: 用以提供单个图片文件的上传
 *     tags: [文件服务]
 */
router.post('/coffee/upload/simgle', multerUpload.single('file'), UploadFileSimgle);

/**
 * @swagger
 * /coffee/readimgsurl:
 *   get:
 *     summary: 读取图片资源
 *     description: 读取服务静态目录内所有的文件或图片资源
 *     tags: [文件服务]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "所有图片返回成功"
 */
router.get('/coffee/readimgsurl', readAllFilesByStatic);

module.exports = router;
