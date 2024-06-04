const fs = require('fs');
const path = require('path');
const { RESOURCE_URL } = require('../config/serverConfig');
const { useDelay, formatSourceContent } = require('../utils/index');
const models = require('@db/index');
const { UPLOAD_DIRFILES, UPLOAD_DIRIMGS } = require('../config/serverConfig');

/**
 * @name 上传单个图片资源
 */
const UploadPicSingle = async (ctx, next) => {
  // 处理额外字段
  const {
    description = "",
    uploader = "root",
    createTime,
    updateTime
  } = ctx.request.body;
  // 处理上传的文件
  const {
    originalname: originalFileName,
    mimetype: fileMimeType,
    filename: fileName,
    path: filePath,
    size: fileSize,
  } = ctx.file;
  await models.files_info.create({
    originalFileName,
    fileMimeType,
    fileName,
    filePath,
    fileSize,
    uploader,
    description,
    createTime: createTime || new Date(),
    updateTime: updateTime || new Date()
  }).then(fileData => {
    const fileDataForm = formatSourceContent(fileData);
    try {
      ctx.response.body = {
        code: 200,
        data: {
          id: fileDataForm.id,
          fileMimeType: fileDataForm.fileMimeType,
          description: fileDataForm.description,
          fileName: fileDataForm.fileName,
          fileSize: fileDataForm.fileSize,
          uploader: fileDataForm.uploader,
          createTime: fileDataForm.createTime,
          updateTime: fileDataForm.updateTime,
          onLineUrl: `${RESOURCE_URL}${fileName}`
        },
        message: '图片上传成功'
      }
    } catch (err) {
      console.log('【UploadPicSimgle】error: ', err)
    };
  }).catch(error => {
    ctx.response.body = {
      code: 404,
      data: null,
      message: "Pic file upload failed."
    }
  });
};

/**
 * @name 上传单个文件资源
 */
const UploadFileSingle = async (ctx, next) => {
  // 处理额外字段
  const {
    description = "",
    uploader = "root",
    createTime,
    updateTime
  } = ctx.request.body;
  // 处理上传的文件
  const {
    originalname: originalFileName,
    mimetype: fileMimeType,
    filename: fileName,
    path: filePath,
    size: fileSize,
  } = ctx.file;
  await models.files_info.create({
    originalFileName,
    fileMimeType,
    fileName,
    filePath,
    fileSize,
    uploader,
    description,
    createTime: createTime || new Date(),
    updateTime: updateTime || new Date()
  }).then(fileData => {
    const fileDataForm = formatSourceContent(fileData);
    ctx.response.body = {
      code: 200,
      data: {
        id: fileDataForm.id,
        fileMimeType: fileDataForm.fileMimeType,
        description: fileDataForm.description,
        fileName: fileDataForm.fileName,
        fileSize: fileDataForm.fileSize,
        uploader: fileDataForm.uploader,
        createTime: fileDataForm.createTime,
        updateTime: fileDataForm.updateTime,
      },
      message: '文件上传成功'
    }
  }).catch(error => {
    ctx.response.body = {
      code: 404,
      data: null,
      message: "File upload failed."
    }
  })
};

/**
 * @name 上传多个文件资源
 * @description 暂未开放，等待开发中
 */
const UploadFileMultiple = async (ctx, next) => { };

/**
 * @name 读取所有图片资源
 */
const readAllImgsByStatic = async (ctx, next) => {
  const filesName = fs.readdirSync(path.join(__dirname, '../public/images'));
  const filesPath = filesName.map((item, index) => {
    return `${RESOURCE_URL}${item}`
  });
  ctx.response.body = {
    code: 200,
    data: filesPath,
    message: '所有图片资源查询成功'
  }
};

/**
 * @name 读取文件列表资源
 */
const readAllFileList = async (ctx, next) => {
  const filesList = fs.readdirSync(UPLOAD_DIRFILES);
  if (filesList.length === 0) {
    ctx.response.body = {
      code: 404,
      data: null,
      message: '未查询到服务内所在文件！'
    }
  }
  await models.files_info.findAll().then(fileData => {
    ctx.response.body = {
      code: 200,
      data: formatSourceContent(fileData),
      message: '所有文件查询成功'
    }
  })
};

/**
 * @name 以流的方式读取某个图片
 * @description 暂未区分sql查询的结果是图片，现阶段是图片和文件都查询出来了，等待后期优化，需要注意查询到的是图片类型
 */
const readPicToStream = async (ctx, next) => {
  const { id } = ctx.request.query;
  await models.files_info.findOne({ where: { id} }).then(picInfo => {
    const picInfoForm = formatSourceContent(picInfo);
    const picPath = path.join(UPLOAD_DIRIMGS, picInfoForm.fileName);
    const picStream = fs.createReadStream(picPath);
    ctx.set("Content-Type", picInfoForm.fileMimeType);
    ctx.response.body = picStream;
  });
};

/**
 * @name 以流的方式读取某个文件
 * @description 暂未区分sql查询的结果是图片，现阶段是图片和文件都查询出来了，等待后期优化，需要注意查询到的是文件类型
 */
const readFileToStream = async (ctx, next) => {
  const { id } = ctx.request.query;
  await models.files_info.findOne({ where: { id } }).then(fileInfo => {
    const fileInfoForm = formatSourceContent(fileInfo);
    const filePath = path.join(UPLOAD_DIRFILES, fileInfoForm.fileName);
    const fileStream = fs.createReadStream(filePath);
    ctx.set("Content-Type", fileInfoForm.fileMimeType);
    ctx.response.body = fileStream;
  });
};

module.exports = {
  UploadPicSingle,
  UploadFileSingle,
  UploadFileMultiple,
  readAllFileList,
  readPicToStream,
  readFileToStream,
  readAllImgsByStatic
};
