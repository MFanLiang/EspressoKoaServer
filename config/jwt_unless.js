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
    // * 特殊 post 接口，不需要验证 jwt
    if (ctx.path == '/user/login' || ctx.path == '/user/register') {
      return true
    }
    return false
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
