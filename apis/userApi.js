const jwt = require('jsonwebtoken');
const { useDelay } = require('../utils');
const { userSchema } = require('../core/sequelize');

/** 登录接口 */
const login = async (ctx, next) => {
  const { userName, password } = ctx.request.body;

  await userSchema.findAll({
    where: {
      userName,
      password
    }
  }).then(async (user) => {
    if (!JSON.stringify(user).includes(userName)) {
      ctx.response.body = {
        code: 0,
        data: null,
        msg: `用户名或密码错误`
      }
    } else {
      const { userName, status, tel, userRole, avatar, userFullName, id } = JSON.parse(JSON.stringify(user))[0]
      // 生成鉴权 token 私钥口令，有效期2小时
      // 调用 jsonwebtoken 的 sign() 方法来生成token，接收三个参数，第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；第三个是options，可以设置 token 的过期时间
      const tokenStr = jwt.sign({
        userName,
        id: JSON.parse(JSON.stringify(user))[0].id
      }, 'espresso_token', { expiresIn: '2h' });
      const userInfo = { userName, status, tel, userRole, avatar, userFullName, id };
      await useDelay(800);
      ctx.response.body = {
        code: 200,
        data: userInfo,
        token: tokenStr,
        message: '登录成功'
      }
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        // msg: `服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 注册用户接口 */
const register = async (ctx, next) => {
  // 如果表不存在, 则创建用户表(如果已经存在, 则不执行任何操作)
  await userSchema.sync();

  await userSchema.create({ ...ctx.request.body }).then(users => {
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

  await userSchema.findOne({
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
        message: `服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 获取所有用户信息 */
const getAllUser = async (ctx, next) => {
  await userSchema.findAll().then(users => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(users)),
      message: '查询所有用户信息'
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        message: `服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 更新指定用户信息 */
const updatePointerUser = async (ctx, next) => {
  await userSchema.update({ ...ctx.request.body }, {
    where: {
      id: ctx.request.body.id
    }
  }).then(user => {
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
        message: `服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 删除指定用户 */
const delPointerUser = async (ctx, next) => {
  await userSchema.destroy({
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

module.exports = {
  register,
  login,
  getPointerUserInfo,
  getAllUser,
  updatePointerUser,
  delPointerUser
};
