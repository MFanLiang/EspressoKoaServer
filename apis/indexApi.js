const homePage = (ctx, next) => {
  ctx.response.body = 'hello Word 你好世界 Koa Server default page!';
};

module.exports = { homePage };
