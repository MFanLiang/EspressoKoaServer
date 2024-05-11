const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('files_info', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "文件数据唯一主键"
    },
    originalFileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "源文件名称",
    },
    fileMimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "文件类型，遵循MIME类型"
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件名称",
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件存储路径",
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "文件大小",
    },
    uploader: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件上传者",
      references: {
        model: 'user_manage',
        key: 'user_name'
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "",
      comment: "可选字段，描述文件必要的内容信息",
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'files_info',
    timestamps: false,
    comment: "文件信息的存储表",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      }
    ]
  });
};
