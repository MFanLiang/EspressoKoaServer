const fs = require('fs');
const path = require('path');
const { RESOURCE_URL } = require('../config/serverConfig');
const { useDelay } = require('../utils/index');

/** 上传单文件图片资源文件 */
const UploadFileSimgle = async (ctx, next) => {
  try {
    await next();
    const { originalname } = ctx.file;
    ctx.response.body = {
      code: 200,
      data: [`${RESOURCE_URL}${originalname}`],
      message: '图片上传成功'
    }
  } catch (err) {
    console.log('【UploadFileSimgle】error: ', err)
  }
};

/** 读取服务静态目录内所有的文件或图片资源 */
const readAllFilesByStatic = async (ctx, next) => {
  const filesName = fs.readdirSync(path.join(__dirname, '../public/images'));
  const filesPath = filesName.map((item, index) => {
    return `${RESOURCE_URL}${item}`
  });
  if (filesName) {
    await useDelay(1000);
    ctx.response.body = {
      code: 200,
      data: filesPath,
      message: '所有图片返回成功'
    }
  }
};

module.exports = {
  UploadFileSimgle,
  readAllFilesByStatic
};
