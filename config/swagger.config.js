/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-05-11 20:29:29
 * @FilePath: \EspressoKoaServer\config\swagger.config.js
 * @Description: Swagger-UI 配置文件。文件级别：配置文件
 */

const path = require("path");
const yaml = require('yamljs');
const swaggerJSDoc = require('swagger-jsdoc');

// 读取 YAML 文件
const swaggerDefinition = yaml.load(path.resolve(__dirname, './swagger.yaml'));

const options = {
  definition: {
    ...swaggerDefinition,
    // * servers 的每一项，可以理解为一个服务
    servers: [
      {
        url: process.env.NODE_ENV === "development" ? '/' : '/api',
        description: 'API dev server'
      }
    ],
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
