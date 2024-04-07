const path = require("path");
const fs = require("fs");
const models = require("@db");

// 获取系统所有的数据字典列表
const getAllSysDist = async (ctx, next) => {
  const url = path.join(path.resolve(), "dataCacheDir/dict.json");
  // 下面的判断逻辑是为了缓存从数据库查到的数据
  // 若在数据库查到数据之后立刻保存到缓存目录dataCache内
  // 这样一来，可以减少对数据查询的频率，提高对前端响应数据的效率
  if (ctx.checkPath(url)) {
    const data = JSON.parse(fs.readFileSync(url, "utf-8"));
    ctx.success(data, 200, '数据字典查询返回成功');
  } else {
    // 下面对数据库的操作类似于 mysql 查询语句的 seq.query('SELECT DISTINCT dictid from dictionary;');
    let ids = await models.dictionary.findAll({
      attributes: ['dictId'],
      group: 'dictId'
    });
    const res = JSON.parse(
      JSON.stringify(
        await models.dictionary.findAll({
          attributes: ['dictId', 'label', 'value']
        })
      )
    );
    ids = JSON.parse(JSON.stringify(ids));
    const result = {};
    for (const iterator of ids) {
      result[String(iterator.dictId)] = [];
      for (let i = res.length - 1; i >= 0; i--) {
        const element = res[i];
        if (iterator.dictId == element.dictId) {
          result[String(iterator.dictId)].push(element);
          res.splice(i, 1);
        }
      }
    }
    ctx.success(result, 200, '数据字典查询返回成功');

    fs.writeFile(url, JSON.stringify(result), err => {
      if (err) throw err;
      console.log('文件已被保存');
    });
  }
};

module.exports = { getAllSysDist }
