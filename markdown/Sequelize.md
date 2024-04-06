# Sequelize

## 1. 先给出官网链接

官网地址：

* [sequelize_zh](https://www.sequelize.cn/core-concepts/getting-started)

* [sequelize_en](https://sequelize.org/docs/v6/)

## 2. 简单介绍

Sequelize 是 Node.js 中常用的 ORM 库，其作用就是对数据库表和代码中的对象做一个映射，让我们能够通过面向对象的方式去查询和操作数据库。

举个🌰：假如说数据库有一张 <font color="orange">user</font> 表，如果是使用 sequelize 的话，需要将其映射为一个 <font color="orange">UserModel</font> 模型，然后就可以用这个 UserModel 模型去管理（<font color="orange">包括增删改查</font>） user 表中的数据。

当使用 Sequelize 时，需要手动定义一个数据模型，比如：

```javascript{.line-numbers}
// 例如当前文件名为： userModel.js
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const user = Sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    unique: true,
    comment: '唯一主键'
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    minlength: 2,
    maxlength: 20,
    comment: '用户名称'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    minlength: 6,
    maxlength: 16,
    comment: '密码'
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: false
});
```

然后就能通过 <font color="orange">sequelize.sync()</font> 将 <font color="orange">UserModel</font> 同步到数据库中。总之就是通过这种方式间接操作数据库的某张表。

但开发时，必须是先建表然后再写业务代码（总不能没有源数据就去胡乱开发吧:joy:）。而且表结构一旦确定下来了就不能轻易去动它，所以我们都是需要根据表结构手动写 Model 模型的，而不是直接使用 <font color="orange">sequelize.sync()</font> 去更新表结构。

这样就有一个最直接的问题，那就是太累人了 :scream: :sob:，这样手写所有的业务上所需要的数据模型不得累个半死呀，所以直接推荐一个工具 [sequelize-auto](https://github.com/sequelize/sequelize-auto)来解决这个问题，下边就不多说了，请移步到 [sequelize-auto文档](./sequelize-auto.md) 吧。
