const fs = require("node:fs");
const { resolve } = require("node:path");

/**
 * 判断文件夹是否存在，若不存在则进行创建
 * @param {*} path 文件路径
 */
function isExist(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

/**
 * @param {*} sourcePath 文件源地址
 * @param {*} fileName 要复制的源文件名称
 * @param {*} newFileName 复制后的新文件名称
 */
function copyFileToNewServerConfig(sourcePath, fileName, newFileName) {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true });
  sourceFile.forEach(file => {
    const newSourcePath = resolve(sourcePath, file.name);
    if (file.isDirectory()) {
      isExist(newTargetPath);
      copyFileToNewServerConfig(newSourcePath, fileName, newFileName);
    }
    if (file.name == fileName) {
      fs.copyFile(newSourcePath, newFileName, (err) => {
        if (err) throw err;
        fs.rename(resolve(__dirname, `./${newFileName}`), resolve(__dirname, `../config/${newFileName}`), (err, data) => {
          if (err) {
            console.log('err :>> ', err);
            return false;
          }
          if (data === undefined) {
            console.log('文件移动成功');
          }
        })
      })
    }
  })
};

// copyFileToNewServerConfig(
//   resolve(__dirname, '../config'),
//   "serverConfig.js",
//   "serverConfig_bak.js"
// );
