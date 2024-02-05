const { coffeeSchema } = require('../core/sequelize');

/** 查询所有咖啡产品表数据 */
const getInvoiceList = async (ctx, next) => {
  await coffeeSchema.findAll().then(data => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
      message: '查询所有咖啡产品成功',
      total: JSON.parse(JSON.stringify(data)).length
    }
  }).catch((err) => {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      code: 500,
      data: [],
      message: err.message || '查询咖啡产品失败'
    }
  })
};

/** 删除查询所有咖啡产品表某项数据 */
const delInvoiceItem = async (ctx, next) => {
  await coffeeSchema.destroy({
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


/** 添加 sys_network.invoice 表数据 */
const addInvoiceItem = async (ctx, next) => {
  // 如果表不存在, 则创建咖啡产品表(如果已经存在, 则不执行任何操作)
  await coffeeSchema.sync();

  await coffeeSchema.create({ ...ctx.request.body }).then(data => {
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

module.exports = {
  getInvoiceList,
  addInvoiceItem,
  // updateInvoiceItem,
  delInvoiceItem,
  // pageSearchlist,
};
