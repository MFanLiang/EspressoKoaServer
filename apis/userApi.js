const crypto = require('crypto'); // 引入fs模块
const { formatSourceContent } = require('../utils');
const { expiresInTime } = require("../config/serverConfig.js");
const Joi = require("joi"); // 接口接收到的参数校验
const { key } = require("../utils/encryption.js");
const models = require('@db/index');
const https = require("https");
const sequelize = require('../db/sequelize.js');

/** 登录接口 */
const login = async (ctx, next) => {
  let { userName, passWord } = ctx.request.body;
  // 判断接收到的密码是否符合加密算法长度
  if (passWord.length !== 88) {
    ctx.error([0, '密码不符合加密安全算法的规则']);
    return false;
  }
  // 防止公钥有空格存在
  const pw = passWord.replace(/\s+/g, '+');
  // 对接收到的 passWord 处理解密
  passWord = key.decrypt(pw, 'utf8');

  // 校验接收到的参数类型
  const schema = Joi.object({
    userName: ctx.joiRequired("用户名称"),
    passWord: ctx.joiRequired("账号密码")
  });
  const valueValid = schema.validate({ userName, passWord });
  if (valueValid.error) {
    ctx.error([-1, valueValid.error.message]);
  }

  // 加密
  const hmac = crypto.createHmac("sha256", userName);
  hmac.update(passWord);
  const required = { userName, passWord }
  required.passWord = hmac.digest("hex");

  // 获取客户端系统的 IP 地址
  const forwardedFor = ctx.request.headers['x-forwarded-for'];
  const ipAddress = forwardedFor ? forwardedFor.replace(/^.*:/, '') : ctx.request.ip.replace(/^.*:/, '');

  const user_manage_response = await models.user_manage.findOne({ where: { userName } });
  const user_manage_response_format = formatSourceContent(user_manage_response);
  const online_token_response = await models.online_token.findOne({ where: { user_id: user_manage_response_format.id } });
  const online_token_response_format = formatSourceContent(online_token_response);

  if (online_token_response_format !== null) {
    if (online_token_response_format.userId === user_manage_response_format.id || online_token_response_format.ipAddress === ipAddress) {
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
    let loginSuccess = false;
    if (userInfomation.length > 0) {
      loginSuccess = true;
      // 生成 access_token 口令
      const accessToken = ctx.getToken({
        id: userInfomation[0].id,
        userName: userInfomation[0].userName,
        ipAddress
      }, expiresInTime);

      delete userInfomation[0].passWord;
      ctx.success({
        accessToken,
        tokenType: 'Bearer',
        expiresIn: expiresInTime,
        userInfo: userInfomation[0],
      });
      await models.log.create(
        {
          type: 1,
          ipAddress,
          userId: userInfomation[0].id,
          method: ctx.request.method,
          originalUrl: ctx.request.originalUrl,
          createTime: new Date(),
          updateTime: new Date(),
        }
      )
    } else {
      ctx.error([0, '用户名或密码错误']);
    }

    // 使用的具体说明，可查看 https://lbsyun.baidu.com/faq/api?title=webapi/ip-api-base
    // IP所在地查询
    if (loginSuccess) {
      const APIServer = `https://api.map.baidu.com/location/ip?ip=${ipAddress}&coor=bd09ll&ak=q1hUbqK1ozvaADkjYiLiXKylDV7t0D9W`;
      try {
        https.get(APIServer, response => {
          if (response.statusCode === 200) {
            response.on("data", async data => {
              const content = JSON.parse(data).content;
              models.log.update(
                { address: content?.address, point: JSON.stringify(content?.point) },
                { where: { ipAddress } }
              );
            })
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
};

/** 用户退出登录系统 */
const logout = async (ctx, next) => {
  const decryptToken = ctx.decryptToken(ctx.request.header.authorization)
  models.online_token.destroy({ where: { token: decryptToken } })
  ctx.success(null);
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
    userName: ctx.joiRequired("用户名称"),
    passWord: ctx.joiRequired("账号密码"),
    userFullName: ctx.joiRequired("用户全名"),
    tel: ctx.joiRequired("手机号码"),
  });
  const data = ctx.request.body;
  const { userName, passWord, userFullName, tel } = data;
  const required = { userName, passWord, userFullName, tel };
  const valueValid = schema.validate(required);
  if (valueValid.error) {
    ctx.error([-1, valueValid.error.message]);
  } else {
    const hmac = crypto.createHmac("sha256", required.userName);
    hmac.update(required.passWord);
    required.passWord = hmac.digest("hex");

    // 准备好要往数据库的用户表中插入的数据字段
    const cutInDataToSheet = {
      ...data,
      ...required,
      createTime: data.createTime || new Date(),
      updateTime: data.updateTime || new Date()
    };
    await models.user_manage.create(cutInDataToSheet)
      .then(async (users) => {
        const { id, avatar, userName, tel, userFullName, userRole, status, createTime, updateTime } = formatSourceContent(users);
        const displayData = { id, avatar, userName, tel, userFullName, userRole, status: status === "1" ? true : false, createTime, updateTime }
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
        data: [],
        message: `获取指定用户信息服务接口异常，请检查koa服务接口配置`
      }
    }
  })
};

/** 获取所有用户信息列表 */
const getAllUser = async (ctx, next) => {
  await models.user_manage.findAll({
    // 指定要查找的 field
    attributes: ["id", "userName", "userFullName", "userRole", "avatar", "tel", "status", "createTime", "updateTime"],
    // 根据创建时间的field进行降序排序
    order: [["createTime", "DESC"]]
  }).then(async (data) => {
    ctx.response.body = {
      code: 200,
      data: formatSourceContent(data),
      message: '查询所有用户信息已完成',
      total: formatSourceContent(data).length,
      pageSize: 10
    }
  }).catch((error) => {
    if (error) {
      ctx.response.body = {
        code: 500,
        data: null,
        message: `获取所有用户信息服务接口异常，请检查koa服务接口配置`,
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
        message: '更新指定用户信息完成'
      }
    } else {
      ctx.response.body = {
        code: 200,
        data: null,
        message: '参数格式错误，请检查后重试'
      }
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
  await models.user_manage.findByPk(ctx.request.query.id)
    .then(async (item) => {
      if (item === null) {
        ctx.response.body = {
          code: 200,
          data: null,
          message: '没有该条数据，无需删除'
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
            message: `删除指定用户成功`
          }
        }).catch((err) => {
          ctx.response.body = {
            code: 200,
            data: null,
            message: '删除指定用户失败',
            errorInfo: err.message
          }
        })
      }
    })
};

const fuzzyQuery = async (ctx, next) => {
  const { search } = ctx.request.body;
  await sequelize.query(`select um.user_name as userName, um.user_full_name as userFullName, um.user_role as userRole, um.avatar, um.tel, um.status, um.create_time, um.update_time from sys_network.user_manage um where user_name like "%${search}%";`, {
    model: models.user_manage,
    mapToModel: true // 如果你有任何映射字段,则在此处传递 true
  }).then(async (data) => {
    ctx.response.body = {
      code: 200,
      data: JSON.parse(JSON.stringify(data)),
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
