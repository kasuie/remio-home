/*
 * @Author: kasuie
 * @Date: 2024-06-13 10:00:42
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 11:57:20
 * @Description:
 */
interface RuleItem {
  controlKey?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  items?: Array<any>;
  field: string;
}

export const appRules: RuleItem[] = [
  {
    field: "name",
    isRequired: true,
    label: "站点标题",
  },
  {
    field: "keywords",
    isRequired: false,
    label: "站点关键词",
  },
  {
    field: "description",
    isRequired: false,
    label: "站点描述性信息",
  },
  {
    field: "theme",
    isRequired: false,
    label: "主题设置",
    items: [{ title: "" }],
  },
  {
    field: "name",
    isRequired: true,
    label: "站点标题",
  },
  // favicon?: string; // 站点图标
  // domain: string; // 站点链接
  // keywords?: string; // 站点关键词
  // description?: string; // 站点描述性信息
  // avatarConfig?: AvatarConfig; // 主页头像相关配置
  // layoutConfig?: LayoutConfig; // 布局相关的一些配置
  // bgConfig: BgConfig; // 背景相关的一些配置
  // primaryColor?: string;
  // theme?: string;
  // subTitle?: string; // 站点头像下方的次标题，可填入一言api，例：https://v1.hitokoto.cn?c=a&c=b&c=c
  // subTitleConfig?: SubTitleConfig;
  // socialConfig?: SocialConfig;
  // footer?: string | FooterConfig; // 底部文字
  // links: Link[]; // 社交媒体的链接
  // sites: Site[]; // 项目或者其他站点链接
  // sitesConfig?: SitesConfig; // sites 渲染组件配置项
  // sliders?: SlidersConfig;
];
