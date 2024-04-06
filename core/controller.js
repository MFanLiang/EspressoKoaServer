//  服务接口控制器
const fs = require('fs');
const router = require('koa-router')();

/**
 * 统一添加处理 GET / POST请求
 * @param urlMapping 请求
 */
const handleUrl = (urlMapping) => {
  Object.entries(urlMapping).forEach(([url, hanler]) => {
    // 处理 GET 请求
    if (url.startsWith('GET')) {
      let _analyze_path = url.substring(4);
      router.get(_analyze_path, hanler);
      return null;
    }
    // 处理 POST 请求
    if (url.startsWith('POST')) {
      let _analyze_path = url.substring(5);
      router.post(_analyze_path, hanler);
      return null;
    }
    console.log(`invalid (无效的) URL：${url}`)
  })
};

/**
 * 读取所有的 API 处理方法
 * @param dir 目录
 */
const addController = (dir) => {
  const files = fs.readdirSync(dir);
  const jsFiles = files.filter(fileName => {
    return fileName.endsWith('.js');
  });
  for (let file of jsFiles) {
    console.log(`Porcess controller: ${file}...`)
    let mapping = require(dir + '/' + file);
    handleUrl(mapping);
  }
};

/**
 * 默认导出处理函数
 */
const MainController = (app, dir) => {
  // 默认识别目录，也可根据项目实际的工作目录环境进行配置更改
  const controllerDir = dir ? `${process.cwd() + dir}` : `${process.cwd()}/routes`;
  addController(controllerDir);
  // return app.use(router.routes());
};

module.exports = MainController;
