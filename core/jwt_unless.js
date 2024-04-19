/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-12-30 16:37:30
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-19 18:24:58
 * @FilePath: \EspressoKoaServer\core\jwt_unless.js
 * @Description: JWT 验证能力
 */

const { WHITELIST } = require("../config/serverConfig");
/** 用于判断客户端当前请求接口是否需要jwt验证 */

// * 定义secret
const secretToken = 'espresso_token';

// * 定义不需要 jwt 验证的接口数组(get方法)
const nonTokenApiArr = [
  '/',
  '/post'
];

// * 定义不需要 jwt 验证的接口正则数组(get方法)
const nonTokenApiRegArr = [
  /^\/user\/\d/,
  /^\/post\/\d/
];

// * 判断请求 api 是否在数组里
const isNonTokenApi = (path) => {
  return nonTokenApiArr.includes(path)
}

// * 判断请求 api 是否在正则数组里
const isNonTokenRegApi = (path) => {
  return nonTokenApiRegArr.some(p => {
    return (typeof p === 'string' && p === path) ||
      (p instanceof RegExp && !!p.exec(path))
  });
}

// * 判断当前请求 api 是否不需要 jwt 验证
const checkIsNonTokenApi = (ctx) => {
  if ((isNonTokenApi(ctx.path) || isNonTokenRegApi(ctx.path)) && ctx.method == 'GET') {
    return true
  } else {
    // * 特殊的接口地址，不需要验证 jwt
    // * /user/login --> 登录地址忽略验证
    // * /user/register --> 注册地址忽略验证
    // * /swagger-ui --> swagger接口文档地址忽略验证
    if (WHITELIST.includes(ctx.path)) {
      return true;
    } else {
      const headerToken = ctx.request.header.authorization;
      const queryToken = ctx.query.authorization;
      if (headerToken || queryToken) {
        if (!ctx.checkToken(headerToken || queryToken)) {
          return ctx.error([401, '令牌已过期！']);
        } else {
          return true;
        }
      } else {
        return ctx.error([401, 'token检验未通过！']);
      }
    }
  }
}

module.exports = {
  secretToken,
  nonTokenApiArr,
  nonTokenApiRegArr,
  isNonTokenApi,
  isNonTokenRegApi,
  checkIsNonTokenApi
};
