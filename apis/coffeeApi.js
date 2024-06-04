const models = require('@db/index');
const { formatSourceContent } = require('../utils/index');
const sequelize = require('../db/sequelize.js');

/**
 * @name 添加新的咖啡产品项
 */
const addCoffeeListItem = async (ctx, next) => {
  // 如果表不存在, 则创建咖啡产品表(如果已经存在, 则不执行任何操作)
  await models.coffee_list.sync();

  const requestBody = ctx.request.body;
  await models.coffee_list.create({
    ...requestBody,
    createTime: requestBody.createTime || new Date(),
    updateTime: requestBody.updateTime || new Date()
  }).then(data => {
    ctx.response.body = {
      code: 200,
      data: formatSourceContent(data),
      message: `添加咖啡产品成功`
    }
  }).catch((err) => {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      code: 500,
      data: [],
      message: err.message || '添加咖啡产品失败'
    }
  })
};

/**
 * @name 删除某个咖啡产品项
 */
const delCoffeeItemById = async (ctx, next) => {
  // findByPk 方法使用提供的主键从表中仅获得一个条目
  await models.coffee_list.findByPk(ctx.request.query.id)
    .then(async (item) => {
      if (item === null) {
        ctx.response.body = {
          code: 200,
          data: null,
          message: '没有该条数据，无需删除'
        }
      } else {
        await models.coffee_list.destroy({
          where: {
            id: ctx.request.query.id
          }
        }).then(data => {
          ctx.response.body = {
            code: 200,
            data: null,
            message: '数据删除成功',
          }
        }).catch((err) => {
          ctx.response.body = {
            code: 500,
            data: [],
            message: err.message || '数据删除失败'
          }
        })
      }
    });
};

/**
 * @name 获取咖啡数据列表
 */
const getCoffeeList = async (ctx, next) => {
  await models.coffee_list.findAll().then(data => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
      message: '查询咖啡产品列表数据已成功',
      total: formatSourceContent(data).length
    }
  }).catch((err) => {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      code: 500,
      data: null,
      message: err.message || '查询咖啡产品失败'
    }
  })
};

/**
 * @name 更新某个咖啡产品项
 */
const updateCoffeeItemById = async (ctx, next) => {
  await models.coffee_list.findByPk(ctx.request.body.id)
    .then(async (item) => {
      if (formatSourceContent(item) !== null) {
        await models.coffee_list.update({ ...ctx.request.body }, {
          where: { id: ctx.request.body.id }
        }).then((coffeeListItem) => {
          if (formatSourceContent(coffeeListItem)[0] === 1) {
            ctx.response.body = {
              code: 200,
              data: null,
              message: '数据更新成功'
            }
          } else {
            ctx.response.body = {
              code: 200,
              data: null,
              message: '参数格式错误，请检查后重试'
            }
          }
        })
      } else {
        ctx.response.body = {
          code: 200,
          data: null,
          message: '未成功更新该数据，请检查该项数据id是否存在'
        }
      }
    });
};

/**
 * @name 模糊搜索某个数据
 */
const pageSearchlistForCoffeeList = async (ctx, next) => {
  let { name, color, isFlush, isHot, author } = ctx.request.body;

  name = name == undefined ? '' : name;
  color = color == undefined ? '' : color
  isFlush = isFlush == undefined ? '' : (isFlush === 'true' ? '1' : '0');
  isHot = isHot == undefined ? '' : (isHot === 'true' ? '1' : '0');
  author = author == undefined ? '' : author;

  await sequelize.query(`
  SELECT cl.id,cl.name, cl.color, cl.count, cl.price, cl.description, cl.type, cl.is_flush as isFlush, cl.is_hot as isHot, cl.author,cl.create_time as createTime, cl.update_time as updateTime FROM sys_network.coffee_list cl
WHERE COALESCE(cl.name, '') LIKE '%${name}%'
   and COALESCE(cl.color, '') LIKE '%${color}%'
   and COALESCE(cl.is_flush, '') like '%${isFlush}%'
   and COALESCE(cl.is_hot, '') like '%${isHot}%'
   and COALESCE(cl.author, '') like '%${author}%';
  `, {
    model: models.user_manage,
    mapToModel: true // 如果你有任何映射字段,则在此处传递 true
  }).then(async (data) => {
    ctx.response.body = {
      code: 200,
      data: formatSourceContent(data),
      message: '模糊查询成功',
      total: formatSourceContent(data).length,
      pageSize: 10
    }
  }).catch(err => {
    ctx.response.body = {
      code: 200,
      data: null,
      message: '模糊查询失败，请检查koa服务接口配置',
    }
  })
};

module.exports = {
  addCoffeeListItem,
  delCoffeeItemById,
  getCoffeeList,
  updateCoffeeItemById,
  pageSearchlistForCoffeeList,
};
