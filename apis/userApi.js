const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { useDelay } = require('../utils');
const { expiresInTime } = require("../config/serverConfig.js");
const sequelizeDB = require('../db/sequelize.js');
const { decodePassword } = require('../utils');

/** 登录接口 */
const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  await sequelizeDB.userSchema.findAll({
    where: {
      username
    }
  }).then(async (user) => {
    if (!JSON.parse(JSON.stringify(user))[0]) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '用户名或密码错误'
      }
    } else {
      const flag = await decodePassword(password, JSON.parse(JSON.stringify(user))[0].password);
      if (!flag) {
        ctx.response.body = {
          code: 0,
          data: null,
          message: '用户名或密码错误'
        }
      } else {
        const { username, status, tel, userRole, avatar, userFullName, id } = JSON.parse(JSON.stringify(user))[0];

        // 生成鉴权 token 私钥口令，有效期2小时
        // 调用 jsonwebtoken 的 sign() 方法来生成token，接收三个参数，第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；第三个是options，可以设置 token 的过期时间

        const tokenStr = jwt.sign({
          username,
          id: JSON.parse(JSON.stringify(user))[0].id
        }, 'espresso_token', { expiresIn: expiresInTime });
        const userInfo = { username, status, tel, userRole, avatar, userFullName, id };
        await useDelay(800);
        ctx.response.body = {
          code: 200,
          data: userInfo,
          token: tokenStr,
          message: '登录成功'
        }
      }
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        msg: `登录接口服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 注册用户接口 */
const register = async (ctx, next) => {
  // 如果表不存在, 则创建用户表(如果已经存在, 则不执行任何操作)
  await sequelizeDB.userSchema.sync();
  let { password } = ctx.request.body;
  // 创建加密前的盐
  const salt = await bcrypt.genSalt(10);
  // 加密密码
  password = await bcrypt.hash(password, salt);
  await sequelizeDB.userSchema.create({ ...ctx.request.body, password }).then(async (users) => {
    await useDelay(1000);
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(users)),
      message: '用户创建成功',
    }
  }).catch(err => {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      code: 500,
      data: [],
      message: err.message || '创建用户失败'
    }
  });
};

/** 获取指定用户信息 */
const getPointerUserInfo = async (ctx, next) => {
  const { id } = ctx.request.query;

  await sequelizeDB.userSchema.findOne({
    where: {
      id
    }
  }
  ).then(user => {
    if (JSON.stringify(user).includes(id)) {
      ctx.response.body = {
        code: 200,
        data: JSON.parse(JSON.stringify(user)),
        message: '指定用户信息查询完成'
      }
    } else {
      ctx.response.body = {
        code: 200,
        data: [],
        message: '指定的用户不存在'
      }
    }

  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        message: `获取指定用户信息服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 获取所有用户信息列表 */
// const getAllUser = async (ctx, next) => {
//   await sequelizeDB.mysql_sequelize.query('SELECT id, username, userFullName, userRole, avatar, tel, status, createDate FROM sys_network.user_manage ORDER BY createDate DESC;', {
//     modal: sequelizeDB.userSchema,
//     mapToModel: true
//   }).then((data) => {
//     const result = JSON.parse(JSON.stringify(data))[0].map((item) => {
//       return {
//         ...item,
//         status: item.status === 1 ? true : false,
//       }
//     });
//     ctx.response.body = {
//       code: 200,
//       data: result,
//       message: '查询所有用户信息已完成',
//       total: JSON.parse(JSON.stringify(data))[0].length,
//       currentPage: 1,
//       pageSize: 10
//     }
//   }).catch((error) => {
//     if (error) {
//       ctx.response.body = {
//         code: 500,
//         data: null,
//         message: `获取所有用户信息服务接口异常，请检查koa服务接口配置`
//       }
//     }
//   })
// };

/** 更新指定用户信息 */
const updatePointerUser = async (ctx, next) => {
  await sequelizeDB.userSchema.update({ ...ctx.request.body }, {
    where: {
      id: ctx.request.body.id
    }
  }).then(async (user) => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(user)),
      message: '更新指定用户信息'
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        message: `更新指定用户信息服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 删除指定用户 */
const delPointerUser = async (ctx, next) => {
  await sequelizeDB.userSchema.destroy({
    where: {
      id: ctx.request.body.id
    }
  }).then((data) => {
    ctx.response.body = {
      code: 200,
      data: null,
      message: `删除指定用户成功`
    }
  }).catch((err) => {
    ctx.response.body = {
      code: 200,
      data: null,
      message: '删除指定用户失败',
    }
  })
};

/** 模糊搜索查询指定的用户列表 */
// const fuzzyQuery = async (ctx, next) => {
//   const { search } = ctx.request.body;
//   await sequelizeDB.mysql_sequelize.query(`SELECT * FROM sys_network.user_manage where userName LIKE "%${search}%"`, {
//     model: sequelizeDB.userSchema,
//     mapToModel: true // 如果你有任何映射字段,则在此处传递 true
//   }).then((data) => {
//     ctx.response.body = {
//       code: 200,
//       data: JSON.parse(JSON.stringify(data)),
//       message: `模糊查询成功`
//     }
//   }).catch(err => {
//     console.log('err :>> ', err);
//     ctx.response.body = {
//       code: 200,
//       data: null,
//       message: '模糊查询失败，请检查koa服务接口配置',
//     }
//   })
// };

module.exports = {
  register,
  login,
  getPointerUserInfo,
  // getAllUser,
  updatePointerUser,
  delPointerUser,
  // fuzzyQuery
};
