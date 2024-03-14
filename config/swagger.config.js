/** Swagger 配置文件 */

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'swagger 在线接口平台',
    version: '0.0.1',
    description: 'Swagger是一款RESTful API的文档生成工具，它可以帮助开发者快速、准确地编写、维护和查阅API文档。'
  },
  host: 'localhost:5050',
  basePath: './',
  schemes: ['http', 'https'],
  // * servers 的每一项，可以理解为一个服务
  servers: [
    {
      url: '/',
      description: 'API server'
    },
    {
      url: '/server',
      description: 'Internal server'
    }
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
