/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 14:25:14
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-05-12 01:14:54
 * @FilePath: \EspressoKoaServer\routes\file_server.js
 * @Description: 文件操作管理服务-接口路由
 */

const Router = require('koa-router');
const {
  UploadPicSingle,
  readAllImgsByStatic,
  UploadFileSingle,
  readAllFileList,
  readPicToStream,
  readFileToStream,
  UploadFileMultiple
} = require('../apis/fileApi');
const { multerUploader, fileDocUploader } = require('../core/uploadFileCtl');

const router = new Router();

/**
 * @swagger
 * /coffee/upload/singlePic:
 *   post:
 *     summary: 图片上传
 *     description: 用以提供单个图片资源的上传
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
 *               pic_sin:
 *                 type: string
 *                 format: binary
 *                 description: formData图片文件
 *               description:
 *                 type: string
 *                 description: 图片额外的描述信息
 *               uploader:
 *                 type: string
 *                 description: 上传者
 *             required:
 *               - pic_sin
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               pic_sin:
 *                 type: string
 *                 format: binary
 *                 description: formData图片文件
 *               description:
 *                 type: string
 *                 description: 图片额外的描述信息
 *               uploader:
 *                 type: string
 *                 description: 上传者
 *             required:
 *               - pic_sin
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 图片唯一id
 *                       example: 24dif9s02342sf
 *                     fileMimeType:
 *                       type: string
 *                       description: 图片文件类型，遵循MIME类型
 *                       example: image/jpeg
 *                     fileName:
 *                       type: string
 *                       description: 图片文件名称
 *                       example: pic.png
 *                     fileSize:
 *                       type: integer
 *                       formmat: int64
 *                       example: 7394
 *                       description: 文件大小
 *                     uploader:
 *                       type: string
 *                       example: admin
 *                       description: 上传者
 *                     onLineUrl:
 *                       type: string
 *                       example: http://192.168.10.208:5050/liangzhu (3)-18f66bcaa95.jpg
 *                       description: 在线链接访问地址
 *                     description:
 *                       type: string
 *                       example: 对于图片文件的描述
 *                       description: 图片文件额外的描述文案
 *                     createTime:
 *                       type: string
 *                       example: 2024-05-11T08:19:51.677Z
 *                       description: 创建时间
 *                     updateTime:
 *                       type: string
 *                       example: 2024-05-11T08:19:51.677Z
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 图片上传成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/upload/singlePic', multerUploader.single('pic_sin'), UploadPicSingle);

/**
 * @swagger
 * /coffee/upload/singleFile:
 *   post:
 *     summary: 单文件上传
 *     description: 上传单个文件资源，现支持docx,doc文件
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
 *                 description: formData文件资料
 *               description:
 *                 type: string
 *                 description: 文件额外的描述信息
 *               uploader:
 *                 type: string
 *                 description: 上传者
 *             required:
 *               - file
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: formData文件资料
 *               description:
 *                 type: string
 *                 description: 文件额外的描述信息
 *               uploader:
 *                 type: string
 *                 description: 上传者
 *             required:
 *               - file
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 图片唯一id
 *                       example: 24dif9s02342sf
 *                     fileMimeType:
 *                       type: string
 *                       description: 图片文件类型，遵循MIME类型
 *                       example: image/jpeg
 *                     fileName:
 *                       type: string
 *                       description: 图片文件名称
 *                       example: pic.png
 *                     fileSize:
 *                       type: integer
 *                       formmat: int64
 *                       example: 7394
 *                       description: 文件大小
 *                     uploader:
 *                       type: string
 *                       example: admin
 *                       description: 上传者
 *                     description:
 *                       type: string
 *                       example: 对于图片文件的描述
 *                       description: 图片文件额外的描述文案
 *                     createTime:
 *                       type: string
 *                       example: 2024-05-11T08:19:51.677Z
 *                       description: 创建时间
 *                     updateTime:
 *                       type: string
 *                       example: 2024-05-11T08:19:51.677Z
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 文件上传成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/upload/singleFile', fileDocUploader.single("file"), UploadFileSingle);

// /**
//  * @swagger
//  * /coffee/upload/multipleFile:
//  *   post:
//  *     summary: 多文件上传
//  *     description: 上传多个文件资料，现支持docx,doc文件
//  *     tags: [文件服务]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         content:
//  *           application/json:
//  *             schema:
//  *                 type: object
//  *                 properties:
//  *                   code:
//  *                     type: integer
//  *                     formmat: int64
//  *                     example: 200
//  *                   data:
//  *                     type: array
//  *                     items:
//  *                       type: string
//  *                       example: 'http://localhost/sea.jpg'
//  *                   message:
//  *                     type: string
//  *                     example: '所有图片返回成功'
//  *       '400':
//  *         description: 请求参数错误
//  *       '401':
//  *         description: Protected resource, use Authorization header to get access
//  *       '404':
//  *         description: 请求资源未找到
//  */
// ******** 暂不开放，等待开发中 *****
// router.post('/coffee/upload/multipleFile', fileDocUploader.array('file', 3), UploadFileMultiple);

/**
 * @swagger
 * /coffee/allFilesList:
 *   get:
 *     summary: 文件列表资源
 *     description: 读取文件列表，并返回文件列表项数据
 *     tags: [文件服务]
 *     security:
 *       - BearerAuth: []
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: 文件资源项唯一id
 *                         example: 23423df345adf3-323
 *                       originalFileName:
 *                         type: string
 *                         description: 源文件名称
 *                         example: 文档.docx
 *                       fileName:
 *                         type: string
 *                         description: 文件名称
 *                         example: 文档.docx
 *                       filePath:
 *                         type: string
 *                         description: 文件存放路径
 *                       fileSize:
 *                         type: number
 *                         description: 文件大小
 *                       uploader:
 *                         type: string
 *                         description: 上传者
 *                       description:
 *                         type: string
 *                         description: 文件额外的备注信息
 *                       createTime:
 *                         type: string
 *                         description: 创建时间
 *                       updateTime:
 *                         type: string
 *                         description: 更新时间
 *                 message:
 *                   type: string
 *                   description: 接口响应描述信息
 *                   example: 所有文件查询成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/allFilesList', readAllFileList);

/**
 * @swagger
 * /coffee/readPic:
 *   get:
 *     summary: 读取某个图片
 *     description: 以流的方式读取并返回某个图片资源
 *     tags: [文件服务]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: 'id'
 *         schema:
 *           type: string
 *         required: true
 *         description: Query the picture by id and return it as a stream.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *       '400':
 *           description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/readPic', readPicToStream);

/**
 * @swagger
 * /coffee/readFile:
 *   get:
 *     summary: 读取某个文件
 *     description: 以流的方式读取并返回某个文件资源
 *     tags: [文件服务]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: 'id'
 *         schema:
 *           type: string
 *         required: true
 *         description: Query the file by id and return it as a stream.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *       '400':
 *           description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/readFile', readFileToStream);

/**
 * @swagger
 * /coffee/readimgsurl:
 *   get:
 *     summary: 读取图片资源
 *     description: 读取服务静态目录内所有图片资源
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
 *                 message:
 *                   type: string
 *                   example: '所有图片返回成功'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/readimgsurl', readAllImgsByStatic);

module.exports = router;
