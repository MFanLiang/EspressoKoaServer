const myEmail = require("../config/nodemailer.config");

const sendMail = async (ctx, next) => {
  // 定义配置收件人信息存储空间
  let receiver = null;
  receiver = ctx.request.body;

  return await new Promise((resolve, reject) => {
    myEmail.transporter.sendMail(receiver, (err, info) => {
      if (err) {
        console.log('邮件发送失败，error', err);
        reject(ctx.response.body = {
          code: 500,
          data: 0,
          message: '邮件发送失败'
        });
      }
      // 要记得关闭邮件服务，不然会导致接口一直处于 pending 状态，前端拿不到 response 数据
      myEmail.transporter.close();
      resolve(ctx.response.body = {
        code: 200,
        data: {
          captcha: myEmail.verify,
          time: myEmail.time,
        },
        message: info,
      });
    });
  });
};

module.exports = { sendMail };
