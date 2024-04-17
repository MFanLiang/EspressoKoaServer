/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 14:25:14
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:48:39
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
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: "请求入参描述"
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   formmat: int64
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'http://localhost/sea.jpg'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
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
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   formmat: int64
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'http://localhost/sea.jpg'
 *                 msg:
 *                   type: string
 *                   example: '所有图片返回成功'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/readimgsurl', readAllFilesByStatic);

module.exports = router;
