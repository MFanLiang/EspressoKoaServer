/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 16:25:32
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 18:54:35
 * @FilePath: \koa-generator\config\nodemailer.config.js
 * @Description: 邮件服务配置。文件级别：配置文件
 */

const nodemailer = require('nodemailer');

const myEmail = {
	nodemailerConfigInfo: {
		// 默认支持的邮箱服务包括："QQ"、"163"、"126"、"iCloud"、"Hotmail"、"Yahoo"等
		service: "163", // 目前设置为 163 邮箱
		port: 465, // 邮箱服务器端口
		secure: true, // 是否使用tls加密。默认为false，当设置为true时，建议端口设置为465
		auth: {
			user: 'xiaomengge777076@163.com', // 发件人邮箱账号
			pass: 'FVHTOGLUYFWKMJPK' // 163的授权码
		}
	},
	/** 创建一个 SMTP 客户端配置对象并对外暴露 */
	get transporter() {
		return nodemailer.createTransport(this.nodemailerConfigInfo);
	},
	/** verify自定义的方法：生成验证码 */
	get verify() {
		return Math.random().toString().substring(2, 8); // substring(2,6)：验证码要6位，从2到8位提取
	},
	/** 获取当前时间戳儿 */
	get time() {
		return Date.now();
	}
}

module.exports = myEmail;
