const { useDelay, formatSourceContent, transformDataStructure } = require('../utils');
const sequelize = require('../db/sequelize.js');
const models = require('@db/index');

/** 获取系统菜单 */
const getMenuList = async (ctx, next) => {
  const queryFormat = formatSourceContent(ctx.request.query);
  const tempUserRole = typeof queryFormat.user_role === "string" ? Number(queryFormat.user_role) : queryFormat.user_role;

  // * 模拟网络延迟体现接口返回数据缓慢的现象
  await useDelay(880);

  // * 递归 mysql 语句查询“菜单路由【sys_network.menu_route】”的数据表表
  const queryed = await sequelize.query(`
  with recursive menuTree as (
	select id, name as title, alias as path, icon, status, parent_menu_id, subordinate_role, is_link, sort
	from sys_network.menu_route 
	where parent_menu_id is null 
	union all 
	select m.id, m.name, m.alias, m.icon, m.status, m.parent_menu_id, m.subordinate_role, m.is_link, m.sort
	from sys_network.menu_route m 
	join menuTree mt on m.parent_menu_id = mt.id 
  )
  select * from menuTree where subordinate_role = ${tempUserRole} ORDER BY sort ASC;
  `);

  const treeData = transformDataStructure(queryed[0]);
  ctx.response.body = {
    code: 200,
    data: treeData,
    message: '查询系统菜单成功',
  };
};

/** 新建菜单 */
const createMenu = async (ctx, next) => {
  // 如果表不存在, 则创建菜单路由表(如果已经存在, 则不执行任何操作)
  await models.menu_route.sync();

  const data = ctx.request.body;
  await models.menu_route.create({
    ...data,
    create_time: data.create_time || new Date(),
    update_time: data.update_time || new Date()
  })
    .then(async (menuData) => {
      const menuDataFormat = formatSourceContent(menuData);
      ctx.response.body = {
        code: 200,
        data: menuDataFormat,
        message: '新建菜单操作成功',
      };
    })
    .catch(err => {
      const errorFormat = formatSourceContent(err);
      ctx.response.status = 500;
      ctx.response.body = {
        code: 500,
        data: [],
        message: errorFormat.errors[0].message || '新建菜单操作失败',
      }
    });
};

/** 根据不同的用户获取权限按钮 */
const getAuthBtns = async (ctx, next) => {
  // 解密前端传递的token
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
  createMenu,
  getAuthBtns,
};
