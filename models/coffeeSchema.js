/** 咖啡产品相关的数据模型 */

const coffeeSchema = (mysql_sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const coffee_list = mysql_sequelize.define("coffee_list", {
    id: {
      type: DataTypes.UUID, // 数据类型，须遵循 mysql 的数据类型原则
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true, // 是否为主键
      unique: true, // 是否必须唯一
    },

    name: {
      type: DataTypes.STRING(40),
      allowNull: false, // 是否允许为空
      comment: '咖啡具的名称'
    },

    color: {
      type: DataTypes.STRING(20),
      allowNull: true, // 是否允许为空
      comment: '颜色值',
    },

    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '数量',
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '价格',
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '描述信息',
    },

    type: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: '类型',
    },

    // (1 需要冲洗，0 不需要冲洗)
    isFlush: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: '是否需要冲洗',
    },

    // (1 会变热，0 不会变热)
    isHot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: '是否会变热',
    },

    author: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: '提交作者',
    }
  }, {
    // 是否自动添加 createdAt / updateAt 字段
    timestamps: false,
    // 是否禁止自动将表名修改为复用
    freezeTableName: true,
    // 是否自定义表名
    tableName: false
  });

  return coffee_list;
};

module.exports = coffeeSchema;
