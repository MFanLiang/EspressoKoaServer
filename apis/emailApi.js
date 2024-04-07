const myEmail = require("../config/nodemailer.config");

const sendMail = async (ctx, next) => {
  // 定义配置收件人信息存储空间
  let receiver = null;
  receiver = ctx.request.body;
  
  /** 接口入参实例
   * method: POST
   * Content-Type: application/x-www-form-urlencoded
   * {
   *  from: "xiaomengge777076<xiaomengge777076@163.com>"
   *  subject: '我爱吃红烧肉'
   *  to: "2837247375@qq.com"
   *  html: '<h1>你好, 这是我为你发送的一封测试邮件，请注意查收哦！</h1>'
   * }
   */
  return await new Promise((resolve, reject) => {
    myEmail.transporter.sendMail(receiver, (err, info) => {
      if (err) {
        console.log('邮件发送失败，error', err);
        reject(ctx.response.body = {
          code: 500,
          data: 0,
          message: '邮件发送失败'
        });
        return null;
      }
      transporter.close();
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
