const Router = require('koa-router')
const { homePage } = require('../apis/indexApi')
const swaggerUI = require('koa2-swagger-ui').koaSwagger
const swaggerSpec = require('../config/swagger.config')

const router = new Router();

router.get('/', homePage);

router.get(
  '/swagger',
  swaggerUI({
    routePrefix: '/swagger',
    swaggerOptions: {
      spec: swaggerSpec,
      url: 'http://localhost:5050/swagger'
    },
  })
);

module.exports = router;
