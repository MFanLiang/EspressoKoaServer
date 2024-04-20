const { useDelay } = require('../utils');
const sequelize = require('../db/sequelize.js');
const sysDataMenu = require("../dataCacheDir/sysDataMenuList.json")


/** 获取系统菜单 */
const getMenuList = async (ctx, next) => {
  await useDelay(880);
  ctx.response.body = {
    code: 200,
    data: sysDataMenu[1],
    message: '查询系统菜单成功',
  };
};

/** 根据不同的用户获取权限按钮 */
const getAuthBtns = async (ctx, next) => {
  const decryptToken = ctx.decryptToken(ctx.request.header.authorization);
  const queryed = await sequelize.query(`select user_role from sys_network.user_manage um  where um.id = (select user_id from sys_network.online_token ot  where token = "${decryptToken}");`);
  const userRole = queryed[0][0].user_role;
  let btnsTemp = null;
  switch (userRole) {
    // 超级管理员
    case 0:
      btnsTemp = {
        root: true,
        delUser: true, // 删除用户
        add: true, // 新增按钮
        delete: true, // 删除
        update: true, // 更新
        query: true, // 查询
        edit: true, // 编辑
      };
      break;
    // 系统管理员
    case 1:
      btnsTemp = {
        add: true, // 新增按钮
        delete: true, // 删除
        update: true, // 更新
        query: true, // 查询
        edit: true, // 编辑
      }
      break;
    // 普通用户
    case 2:
      btnsTemp = {
        add: true,
        update: true,
        query: true,
        edit: true,
      }
      break;
    // 访客用户
    case 3:
      btnsTemp = {
        add: true,
        query: true,
      }
      break;
    // 临时用户
    case 4:
      btnsTemp = {
        query: true,
      }
      break;
    default:
      break;
  }
  ctx.response.body = {
    code: 200,
    data: {
      buttons: btnsTemp
    },
    message: '权限按钮查询返回成功'
  };
};

module.exports = {
  getMenuList,
  getAuthBtns,
};
