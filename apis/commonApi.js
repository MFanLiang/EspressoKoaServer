const path = require("path");
const fs = require("fs");
const { formatSourceContent } = require("../utils");
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
    // 下面对数据库的操作类似于 mysql 查询语句的 seq.query('SELECT DISTINCT dictid from sys_dict_type;');
    const types = await models.sys_dict_type.findAll({
      attributes: ['type'],
      group: 'type'
    });
    const allDict = await models.sys_dict_data.findAll({
      attributes: ["label", "value", "type", "sort", "status", "remark","createBy", "createTime","updateBy", "updateTime"],
      order: [["sort", "DESC"]]
    });
    const allDictDataFormat = formatSourceContent(allDict);
    const result = {};
    for (const iterator of formatSourceContent(types)) {
      result[String(iterator.type)] = [];
      for (let i = allDictDataFormat.length - 1; i >= 0; i--) {
        const element = allDictDataFormat[i];
        if (iterator.type == element.type) {
          result[String(iterator.type)].push(element);
          allDictDataFormat.splice(i, 1);
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

// 获取指定的数据字典
const getPointerDict = async (ctx, next) => {
  const queryId = formatSourceContent(ctx.request.query);

  let r = await models.sys_dict_type.findOne({
    where: { id: queryId.id },
    attributes: ["type"]
  })

  if (r === null) return ctx.error("无该项数据");
  let dictData = await models.sys_dict_data.findAll({
    where: { type: r.type }
  });
  ctx.success(dictData, 200, `类型为 [${r.type}] 的数据字典查询成功`);
};

// 添加数据字典类型表的数据
const addDictTypeData = async (ctx, next) => {
  // 如果表不存在，则创建数据字典表(如果已经存在，则不执行任何操作)
  models.sys_dict_type.sync();

  const requestBody = ctx.request.body;
  await models.sys_dict_type.create({
    ...requestBody,
    createTime: requestBody.createTime || new Date(),
    updateTime: requestBody.updateTime || new Date()
  }).then(data => {
    const dataFormat = formatSourceContent(data);
    ctx.success(dataFormat);
  }).catch(error => {
    const errObj = formatSourceContent(error);
    console.log('errObj :>> ', errObj);
  })
};

// 根据数据字典类型添加n个数据实体
const addDataByType = async (ctx, next) => {
  // 如果表不存在，则创建数据字典表(如果已经存在，则不执行任何操作)
  await models.sys_dict_data.sync();

  const requestBody = ctx.request.body;
  await models.sys_dict_data.create({
    ...requestBody,
    sort: Number(requestBody.sort),
    createTime: requestBody.createTime || new Date(),
    updateTime: requestBody.updateTime || new Date()
  }).then(data => {
    const dataFormat = formatSourceContent(data);
    ctx.success(dataFormat);
  }).catch(error => {
    const errObj = formatSourceContent(error);
    console.log('errObj :>> ', errObj);
  })
};

module.exports = { getAllSysDist, getPointerDict, addDictTypeData, addDataByType }
