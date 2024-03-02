const { useDelay } = require('../utils');

/** 获取系统菜单 */
const getMenuList = async (ctx, next) => {
  await useDelay(880);

  ctx.response.body = {
    code: 200,
    data: [
      {
        icon: "HomeOutlined",
        title: "首页",
        path: "/home/index"
      },
      {
        icon: "ProfileOutlined",
        title: "React 学习",
        path: "/react",
        children: [
          {
            icon: "AppleOutlined",
            path: "/react/hooks",
            title: "Hooks学习",
          },
          {
            icon: "AndroidOutlined",
            path: '/react/dialog',
            title: "原生弹窗",
          },
          {
            icon: "UploadOutlined",
            path: "/react/pic-uploader",
            title: "图片文件上传器"
          },
          {
            icon: "PictureOutlined",
            path: "/react/pic-selector",
            title: "图片选择器"
          },
          {
            icon: "DragOutlined",
            path: "/react/drag-controler",
            title: '拖拽控制器'
          },
          {
            icon: 'VerticalRightOutlined',
            path: '/react/Hoc',
            title: '高阶组件'
          },
          {
            icon: 'BgColorsOutlined',
            path: '/react/react-intl',
            title: 'react国际化'
          }
        ]
      },
      {
        icon: "PlayCircleOutlined",
        title: "npm插件使用",
        path: "/npm-plugin",
        children: [
          {
            icon: "ArrowRightOutlined",
            path: "/npm-pulgin/copy",
            title: "copy-to-clipboard",
          }
        ]
      },
      {
        icon: "ExclamationCircleOutlined",
        title: "错误页面",
        path: "/error",
        children: [
          {
            icon: "AppstoreOutlined",
            path: "/404",
            title: "404页面"
          },
          {
            icon: "AppstoreOutlined",
            path: "/403",
            title: "403页面"
          },
          {
            icon: "AppstoreOutlined",
            path: "/500",
            title: "500页面"
          }
        ]
      },
    ],
    message: '查询系统菜单成功',
  }
};

module.exports = {
  getMenuList
};
