const crypto = require('crypto'); // 引入fs模块
const { useDelay, formatSourceContent } = require('../utils');
const { refreshTime, expiresInTime } = require("../config/serverConfig.js");
const Joi = require("joi"); // 接口接收到的参数校验
const { key } = require("../utils/encryption.js");
const models = require('@db/index');
const sequelize = require('../db/sequelize.js');

/** 登录接口 */
const login = async (ctx, next) => {
  let { username, password } = ctx.request.body;
  // 判断接收到的密码是否符合加密算法长度
  if (password.length !== 88) {
    ctx.error([0, '密码不符合加密安全算法的规则']);
    return false;
  }
  // 防止公钥有空格存在
  const pw = password.replace(/\s+/g, '+');
  // 对接收到的 password 处理解密
  password = key.decrypt(pw, 'utf8');

  // 校验接收到的参数类型
  const schema = Joi.object({
    username: ctx.joiRequired("用户名称"),
    password: ctx.joiRequired("账号密码")
  });
  const valueValid = schema.validate({ username, password });
  if (valueValid.error) {
    ctx.error([-1, valueValid.error.message]);
  }

  // 加密
  const hmac = crypto.createHmac("sha256", username);
  hmac.update(password);
  const required = { username, password }
  required.password = hmac.digest("hex");

  // 获取客户端系统的 IP 地址
  const forwardedFor = ctx.request.headers['x-forwarded-for'];
  const ip_address = forwardedFor ? forwardedFor.split(',')[0] : ctx.request.ip;

  const user_manage_response = await models.user_manage.findOne({ where: { username } });
  const user_manage_response_format = formatSourceContent(user_manage_response);
  const online_token_response = await models.online_token.findOne({ where: { user_id: user_manage_response_format.id } });
  const online_token_response_format = formatSourceContent(online_token_response);

  if (online_token_response_format !== null) {
    if (online_token_response_format.user_id === user_manage_response_format.id || online_token_response_format.ip_address === ip_address) {
      ctx.response.body = {
        code: 0,
        data: null,
        message: '该账号已在其他设备登录'
      }
      return false;
    }
  }

  if (online_token_response_format === null) {
    // 查询数据库中是否含有该用户
    const userInfoStatus = await models.user_manage.findAll({
      where: required
    });
    const userInfomation = formatSourceContent(userInfoStatus);

    if (userInfomation.length > 0) {
      // 生成 access_token 口令
      const access_token = ctx.getToken({
        id: userInfomation[0].id,
        username: userInfomation[0].username,
        ip_address
      }, expiresInTime);

      delete userInfomation[0].password;
      ctx.success({
        access_token,
        token_type: 'Bearer',
        expires_in: expiresInTime,
        userInfo: userInfomation[0],
      })
    } else {
      ctx.error([0, '用户名或密码错误']);
    }
  }
};

/** 用户退出登录系统 */
const logout = async (ctx, next) => {
  const decryptToken = ctx.decryptToken(ctx.request.header.authorization)
  models.online_token.destroy({ where: { token: decryptToken } })
  ctx.success(true);
};

/** 生成公钥 */
const generatePublicKey = async (ctx, next) => {
  const publicKey = key.exportKey('public'); // 生成公钥
  ctx.success(publicKey);
};

/** 注册用户接口 */
const register = async (ctx, next) => {
  // 如果表不存在, 则创建用户表(如果已经存在, 则不执行任何操作)
  await models.user_manage.sync();

  // 校验接收到的参数类型
  const schema = Joi.object({
    username: ctx.joiRequired("用户名称"),
    password: ctx.joiRequired("账号密码"),
    user_full_name: ctx.joiRequired("用户全名"),
    tel: ctx.joiRequired("手机号码"),
  });
  const data = ctx.request.body;
  const { username, password, user_full_name, tel } = data;
  const required = { username, password, user_full_name, tel };
  const valueValid = schema.validate(required);
  if (valueValid.error) {
    ctx.error([-1, valueValid.error.message]);
  } else {
    const hmac = crypto.createHmac("sha256", required.username);
    hmac.update(required.password);
    required.password = hmac.digest("hex");

    // 准备好要往数据库的用户表中插入的数据字段
    const cutInDataToSheet = {
      ...data,
      ...required,
      create_time: data.create_time || new Date(),
      update_time: data.update_time || new Date()
    };
    await models.user_manage.create(cutInDataToSheet)
      .then(async (users) => {
        const { id, avatar, username, tel, user_full_name, user_role, status, create_time, update_time } = JSON.parse(JSON.stringify(users));
        const displayData = { id, avatar, username, tel, user_full_name, user_role, status, create_time, update_time }
        await useDelay(1000);
        ctx.response.body = {
          code: 200,
          data: displayData,
          message: '用户创建成功',
        }
      })
      .catch(err => {
        const validate = JSON.parse(JSON.stringify(err.errors));
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
          code: 500,
          data: [],
          message: validate[0].message || '创建用户失败',
        }
      });
  }
};

/** 获取指定用户信息 */
const getPointerUserInfo = async (ctx, next) => {
  const { id } = ctx.request.query;

  await models.user_manage.findOne({
    where: {
      id
    }
  }
  ).then(user => {
    if (JSON.stringify(user).includes(id)) {
      ctx.response.body = {
        code: 200,
        data: JSON.parse(JSON.stringify(user)),
        msg: '指定用户信息查询完成'
      }
    } else {
      ctx.response.body = {
        code: 200,
        data: [],
        msg: '指定的用户不存在'
      }
    }

  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: [],
        msg: `获取指定用户信息服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 获取所有用户信息列表 */
const getAllUser = async (ctx, next) => {
  await sequelize.query('SELECT id, username, user_full_name, user_role, avatar, tel, status, created_at, updated_at FROM sys_network.user_manage ORDER BY created_at DESC;', {
    modal: models.user_manage,
    mapToModel: true
  }).then((data) => {
    const parseData = JSON.parse(JSON.stringify(data));
    const result = parseData[0].map((item) => {
      return {
        ...item,
        status: item.status === 1 ? true : false,
      }
    });
    ctx.response.body = {
      code: 200,
      data: result,
      msg: '查询所有用户信息已完成',
      total: parseData[0].length,
      pageSize: 10
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        msg: `获取所有用户信息服务接口异常，请检查koa服务接口配置`,
        total: 0,
        pageSize: 0
      }
    }
  })
};

/** 更新指定用户信息 */
const updatePointerUser = async (ctx, next) => {
  await models.user_manage.update({ ...ctx.request.body }, {
    where: {
      id: ctx.request.body.id
    }
  }).then(async (user) => {
    const userStatus = JSON.parse(JSON.stringify(user));
    if (userStatus[0] === 1) {
      const updatedUserObj = await models.user_manage.findOne({ where: { id: ctx.request.body.id } });
      ctx.response.body = {
        code: 200,
        data: JSON.parse(JSON.stringify(updatedUserObj)),
        msg: '更新指定用户信息完成'
      }
    } else {
      ctx.response.body = {
        code: 200,
        data: null,
        msg: '参数格式错误，请检查后重试'
      }
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        msg: `更新指定用户信息服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 删除指定用户 */
const delPointerUser = async (ctx, next) => {
  await models.user_manage.findByPk(ctx.request.query.id)
    .then(async (item) => {
      if (item === null) {
        ctx.response.body = {
          code: 200,
          data: null,
          msg: '没有该条数据，无需删除'
        }
      } else {
        await models.user_manage.destroy({
          where: {
            id: ctx.request.query.id
          }
        }).then((data) => {
          ctx.response.body = {
            code: 200,
            data: null,
            msg: `删除指定用户成功`
          }
        }).catch((err) => {
          ctx.response.body = {
            code: 200,
            data: null,
            msg: '删除指定用户失败',
            errorInfo: err.message
          }
        })
      }
    })
};

const fuzzyQuery = async (ctx, next) => {
  const { search } = ctx.request.body;
  await sequelize.query(`SELECT id, username, user_full_name, user_role, avatar, tel, status, created_at, updated_at FROM sys_network.user_manage where username LIKE "%${search}%"`, {
    model: models.user_manage,
    mapToModel: true // 如果你有任何映射字段,则在此处传递 true
  }).then((data) => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
      msg: '模糊查询成功'
    }
  }).catch(err => {
    ctx.response.body = {
      code: 200,
      data: null,
      msg: '模糊查询失败，请检查koa服务接口配置',
    }
  })
};

module.exports = {
  register,
  login,
  logout,
  generatePublicKey,
  getPointerUserInfo,
  getAllUser,
  updatePointerUser,
  delPointerUser,
  fuzzyQuery
};
