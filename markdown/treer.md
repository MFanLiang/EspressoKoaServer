EspressoKoaServer
├─ apis                            # 存放接口实体的目录
|  ├─ coffeeApi.js                 # 咖啡数据列表服务实体模块
|  ├─ commonApi.js                 # 公共的服务实体模块
|  ├─ emailApi.js                  # 邮箱服务实体模块
|  ├─ fileApi.js                   # 文件操作管理服务实体模块
|  ├─ indexApi.js                  # 默认(测试)服务实体模块
|  ├─ menuListApi.js               # 菜单服务实体模块
|  ├─ sysConfigApi.js              # 系统配置相关服务实体模块
|  ├─ userApi.js                   # 用户操作管理服务实体模块
├─ bin                             # 存放启动 KoaServer 服务时使用的核心文件的目录
│  ├─ www                          # http 核心启动脚本程序
├─ config                          # 存放 KoaServer 服务的一些配置文件的目录
│  ├─ logs.config.js               # 系统日志配置文件
│  ├─ nodemailer.config.js         # 邮件服务配置文件
│  ├─ sequelize-auto.config.js     # sequelize-auto 自动生数据表模型配置文件
│  ├─ serverConfig.js              # 全局基础服务配置文件
│  ├─ swagger.config.js            # Swagger-UI 配置文件
├─ core                            # 存放 KoaServer 服务所需要支持的核心能力
│  ├─ http-exception.js            # 加载 http 异常处理能力
│  ├─ ininManage.js                # 自动加载接口路由处理能力
│  ├─ jwt_unless.js                # JWT 验证能力
│  ├─ uploadFileCtl.js             # 文件资源上传处理能力
├─ dataCacheDir                    # 存放一些缓存数据文件的目录，用来减少重复的查表操作
├─ db                              # 存放数据库相关文件的目录
│  ├─ models                       # 存放数据库中包含的表映射模型文件的目录
│     ├─ init-modules.js           # 初始化模型文件
│     ├─ user_manage.js            # 用户模型文件
│  ├─ index.js                     # 数据模型入口文件
│  ├─ sequelize.js                 # Sequelize 实例运行脚本
├─ env
│  ├─ .env.dev                     # 开发环境变量
│  ├─ .env.prod                    # 生产环境变量
│  ├─ env.config.js                # env环境变量入口脚本文件
├─ images                          # 存放一些图片
├─ logs                            # 存放一些日志(忽略目录)
│  ├─ console                      # 存放接口打印的一些日志
│  ├─ error                        # 存放接口错误返回的一些日志
│  ├─ handle                       # 存放正常处理的返回的一些日志
│  ├─ response                     # 存放接口响应的一些日志
├─ markdown                        # 存放一些.md的文档
├─ middleware                      # 存放一些 KoaServer 服务runtime的中间件
│  ├─ errorHandler                 # 存放错误处理中间件
│  ├─ httpProxy                    # 存放http代理中间件(暂未使用)
│  ├─ log                          # 存放日志中间件
│  ├─ response                     # 存放统一接口返回格式中间件
│  ├─ token                        # 存放token中间件(暂未使用)
│  ├─ validate                     # 存放输入参数校验中间件(暂未使用)
│  ├─ index.js                     # 公共方法中间件文件
├─ public                          # 静态目录
│  ├─ images                       # 存放静态图片
│  ├─ javascripts                  # 存放静态脚本
│  ├─ stylesheets                  # 存放静态样式表
├─ routes                          # 存放接口路由的目录
|  ├─ coffee_server.js             # 咖啡数据列表接口路由
|  ├─ common_server.js             # 公共的服务接口路由
|  ├─ email_server.js              # 邮箱服务接口路由
|  ├─ file_server.js               # 文件操作管理服务
|  ├─ index_server.js              # 默认(测试)服务接口路由
|  ├─ menuList_server.js           # 菜单服务接口路由
|  ├─ sysConfig_server.js          # 系统配置相关服务接口路由
|  ├─ user_server.js               # 用户操作管理服务接口路由
├─ shell                           # 存放 shell 脚本的目录
├─ utils                           # 存放工具目录
├─ views                           # 存放服务端渲染的目录(暂未使用)
│  ├─ error.pug                    # 错误页面
│  ├─ index.pug                    # 首页
│  └─ layout.pug                   # 布局容器页面
├─ .editorconfig                   # 编辑器配置（格式化）
├─ .eslintignore                   # 忽略 Eslint 校验
├─ .eslintrc.js                    # Eslint 校验配置
├─ .gitignore                      # git 提交忽略
├─ .prettierignore                 # 忽略 prettier 格式化
├─ .prettierrc.js                  # prettier 配置
├─ app.js                          # KoaServer 服务实例程序
├─ LICENSE                         # 开源协议文件
├─ package.json                    # 依赖包管理
├─ pnpm-lock.yaml                  # 依赖包包版本锁
└─ README.md                       # README 介绍
