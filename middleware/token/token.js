/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-26 23:54:40
 * @FilePath: \EspressoKoaServer\middleware\token\token.js
 * @Description: token相关配置和方法函数
 */

const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const models = require('@db/index');

// 保存密钥，不能丢
const secret = new NodeRSA({ b: 512 }).exportKey("public");

// 加密必要参数
const ALGORITHM = 'aes-192-cbc';

const PASSWORD = 'espressoCoffee';

// key 是 algorithm 使用的原始密钥
const key = crypto.scryptSync(PASSWORD, '盐值', 24);

// 生成加密强伪随机数据作为初始化向量
const iv = Buffer.alloc(16, 16); // 初始化向量


/**
 * token生成
 * @param <Object | String> userInfo - 用户信息
 * @param <string | Number> time - 过期时间
 */
exports.getToken = (ctx, userInfo, time) => {
  // 为解码的token
  if (typeof userInfo === 'string') {
    const obj = this.decryptRSAToken('', userInfo);
    userInfo = {
      name: obj.name,
      id: obj.id
    };
  }
  // 创建token并导出
  // const token = jwt.sign(userInfo, secretKey, { expiresIn: time }); // 60, "2 days", "10h", "7d".
  const token = jwt.sign(userInfo, secret, { expiresIn: time }); // 60, "2 days", "10h", "7d".
  const data = {
    token,
    user_id: userInfo.id,
    ip_address: userInfo.ip_address,
    create_time: new Date(),
    update_time: new Date(),
  };
  models.online_token.create(data);

  // token加密 [api使用参考文档：https://nodejs.cn/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options]
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

/**
 * token解密
 * @param String 再加密后的tokens
 * @return String 三点式token
 */
exports.decryptToken = (ctx, tokens) => {
  // 解密
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  // 使用相同的算法、密钥和 iv 进行加密
  let decrypted = decipher.update(tokens, 'hex', 'utf8');
  try {
    decrypted += decipher.final('utf8');
  } catch (error) {
    return false;
  }
  return decrypted;
};

/**
 * token验证
 * @param String tokens
 * @param bool type, token: true,refreshToken: false
 * @return bool 过期: false, 不过期: true
 */
exports.checkToken = async (ctx, tokens, type = true) => {
  // 在线swagger-ui文档鉴权接口时，默认去除携带的 Bearer 标识元素
  if (tokens.includes("Bearer")) {
    tokens = tokens.split(" ")[1];
  }
  tokens = tokens.replace(/\s+/g, ''); // 空格替换
  const decryptToken = ctx.decryptToken(tokens);
  const datas = await models.online_token.findAll({ where: { token: decryptToken } })
  const datasStringfy = JSON.parse(JSON.stringify(datas));
  if (datasStringfy[0]?.user_id) {
    // 解密
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // 使用相同的算法、密钥和 iv 进行加密
    let decrypted = decipher.update(tokens, 'hex', 'utf8');
    try {
      decrypted += decipher.final('utf8');
    } catch (error) {
      return false;
    }
    const decoded = jwt.decode(decrypted, secret);
    // 600秒过期预警
    if (type) {
      if (decoded.exp > new Date() / 1000 && decoded.exp < new Date() / 1000 + 600) {
        ctx.append('refresh', true);
      } else {
        ctx.remove('refresh');
      }
    }
    return !(decoded && decoded.exp <= new Date() / 1000);
  } else {
    return false;
  }
};

/**
 * token解码
 * @param String tokens
 * @return token token解码后对象
 */
exports.decryptRSAToken = (ctx, tokens) => {
  tokens = tokens.replace(/\s+/g, ''); // 空格替换
  // 解密
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  // 使用相同的算法、密钥和 iv 进行加密
  let decrypted = decipher.update(tokens, 'hex', 'utf8');
  try {
    decrypted += decipher.final('utf8');
  } catch (error) {
    return false;
  }
  // decrypted += decipher.final('utf8');
  const decoded = jwt.decode(decrypted, secret);
  return decoded;
};

/**
 * token验证
 * @param String tokens
 */
exports.verifyToken = (ctx, token) => {
  token = token.replace(/\s+/g, ''); // 空格替换, 超级账号换行导致会有空格

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  // 使用相同的算法、密钥和 iv 进行加密
  let decrypted = decipher.update(token, 'hex', 'utf8');
  try {
    decrypted += decipher.final('utf8');
  } catch (error) {
    return false;
  }

  try {
    // jwt.verify方法验证token是否有效
    jwt.verify(decrypted, secret, {
      complete: true
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
