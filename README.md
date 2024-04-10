# 后端 nodejs 接口服务系统

## 项目介绍

koa 后端服务框架，开箱即用的脚手架，由 koa-generator 提供的 Koa2 命令安装实现，代码功能完全开源，用以给个性化独立网站提供必要的接口服务。

## 项目目录结构

[treer.md](./markdown/treer.md)

## 项目 start

:point_right:必备条件

> - node > 14.0
> - mysql > 8.0

### 初始化配置数据库

在跑项目之前，首先要做的就是，在本地安装 mysql 8.0.* 数据库服务，当数据库准备完毕后，进行初始化数据库配置工作。

项目中集成了 sequelize 第三方库管理数据库，因此后续操作须按照如下进行：

- 1. 先找到项目的 <font color='red'>\koa-generator\config\serverConfig.js </font> 配置文件，根据实际的数据库配置将文件内的参数修改正确

- 2. 调用接口 <font color="red">/coffee/rundbSyncShell</font>，或找到项目目录 shell 内的 dbSync.js 脚本直接在终端运行，就可以在数据库创建所有的数据表哦

具体的操作，我写了简单的文档，已经放到了 [这里](./markdown/Sequelize.md)

### 项目 install & run

```shell{.line-numbers}
git clone https://github.com/MFanLiang/EspressoKoaServer.git

cd EspressoKoaServer

npm config set --registry=https://registry.npm.taobao.org

pnpm install

pnpm run start:dev
```

## 功能点

- [x] 登录能力
- [ ] 注销能力
- [ ] token权限验证
- [x] 系统日志文件
- [x] swagger文档
- [x] Sequelize映射
- [x] 邮件功能
- [x] 异常处理
- [x] 静态资源目录
- [x] 文件上传
- [ ] 各个接口的响应数据格式的swagger文档注释还没有全部完成
- [x] 发送邮件服务的swagger文档未编写完整

## 注意事项及问题

[Q&A.md](./markdown/Q&A.md)
