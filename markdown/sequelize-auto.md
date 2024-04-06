# sequelize-auto

## 1. 先挂上官网

[sequelize-auto](https://github.com/sequelize/sequelize-auto)

## 2. 简单介绍下吧，虽然我也是刚接触

sequelize-auto 是一个根据表结构自动创建 models 数据模型的工具

主要的功能有：

- 支持 MySQL / PostgreSQL / Sqlite / MariaDB / Microsoft SQL Server 等 Sequelize 支持的所有数据库

- 支持生成 JavaScript / TypeScript / Egg.js / Midway.js 等不同风格的 Models，并且可扩展

- 支持主键、外键、自增、字段注释等属性

- 支持自定义变量命名、文件名风格

举个🌰：

比如数据库正好有张 user 表，通过 sql 指令执行的话，那就是这个样子滴：

```sql{.line-numbers}
CREATE TABLE 'user' (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary ket',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'user name',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'user password',
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User table'
```

要是直接使用 sequelize-auto 工具自动生成的话，那就是：

```js{.line-numbers}
const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
      field: "id"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "user name",
      field: "name",
      unique: "uk_name"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "user password",
      field: "password"
    }
  };
  const options = {
    timestamps: false,
    freezeTableName: true,
    tableName: false
    tableName: "user",
    comment: "",
    indexes: []
  };
  const UserModel = sequelize.define("user_model", attributes, options);
  return UserModel;
};
```

这样就可以直接在项目上通过这个 user_model 数据模型操作 User 表了，比如像这样：

```javascript{.line-numbers}
const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite' */
});

const userModel = UserModel(sequelize);
const users = await userModel.findAll();
```

## 3. 安装和使用

在这个项目上，我直接安装到生产环境依赖了，这个项目上我用的包管理器是pnpm，因为它很 nice。

```shell{.line-numbers}
pnpm install sequelize-auto --save
```

然后还需要安装使用的数据库对应的依赖包，项目上用的数据库是 mysql，所以我就把 mysql2 安装上了，当然还可以根据数据的类型自己确认选型，不知道直接看sequelize官网就好啦，这儿 --> [sequelize](https://www.sequelize.cn/core-concepts/getting-started)

```shell{.line-numbers}
pnpm install mysql2 --save
```

安装完成后，就能运行 sequelize-auto 提供的命令，它在 node_modules\.bin\ 里面，当然开发时候为了方便，一定不会特意跳到这个目录下执行命令，所以搞个项目命令吧，在 package.json 的 scripts 上添加一下就好。

```json{.line-numbers}
"scripts": {
    ...
    "auto-models": "node ./config/sequelize-auto.config.js"
  },
```

需要注意的是：./config/sequelize-auto.config.js 这个 json 配置文件，需要根据官网提供的 API 来编写选项，而且也需要注意不同环境下，是会有不同的配置参数，比如 sequelize-auto.config.js 文件内的数据库名、密码等参数，需要根据实际业务场景编写

这样就能直接运行 npm run auto-models 命令生成数据库所有的表映射模型。
