const models = require('@db/index');

const addCoffeeListItem = async (ctx, next) => {
  // 如果表不存在, 则创建咖啡产品表(如果已经存在, 则不执行任何操作)
  await models.coffee_list.sync();
  await models.coffee_list.create({ ...ctx.request.body }).then(data => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
      msg: `添加咖啡产品成功`
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

const delCoffeeItemById = async (ctx, next) => {
  await models.coffee_list.destroy({
    where: {
      id: ctx.request.query.id
    }
  }).then(data => {
    ctx.response.body = {
      code: 200,
      data: null,
      msg: '数据删除成功',
    }
  });
};

const getCoffeeList = async (ctx, next) => {
  await models.coffee_list.findAll().then(data => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
      msg: '查询咖啡产品列表数据已成功',
      total: JSON.parse(JSON.stringify(data)).length
    }
  }).catch((err) => {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      code: 500,
      data: [],
      msg: err.message || '查询咖啡产品失败'
    }
  })
};

// 根据id更新某个数据项
const updateCoffeeItemById = async (ctx, next) => {};

// 模糊搜索某个数据
const pageSearchlistForCoffeeList = async (ctx, next) => {};

module.exports = {
  addCoffeeListItem,
  delCoffeeItemById,
  getCoffeeList,
  updateCoffeeItemById,
  pageSearchlistForCoffeeList,
};
