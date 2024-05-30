/*
 * @Author: kasuie
 * @Date: 2024-05-26 01:00:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 22:03:59
 * @Description: 
 */
export interface Link {
  title: string;
  color?: string;
  url?: string;
  icon?: string;
}

export interface Site {
  icon?: string;
  title: string;
  url?: string;
  desc?: string;
}

export interface SitesConfig {
  hoverBlur?: boolean;
  hoverScale?: boolean;
  modal?: boolean;
}

export interface SubTitleConfig {
  heart?: boolean;
  shadow?: boolean;
  typing?: boolean;
  typingGap?: number | string;
  loopTyping?: boolean;
  typingCursor?: boolean;
  showFrom?: boolean;
}

export interface SocialConfig {
  autoAnimate?: boolean;
}

export interface BgConfig {
  bg: string; // pc背景图
  mbg: string; // 移动端背景图
  bgStyle?: string; // 背景飘浮风格 可选 sakura 或者 snow 或者自行填写飘浮物资源图片
  blur?: string;
}

interface LayoutConfig {
  istTransition?: boolean; // 是否启动过渡动画
  gapSize?: string; // sm | md | lg  组件间隔大小
}

interface PWA {
  theme_color: string;
  background_color: string;
  display: string;
  orientation: string;
  scope: string;
  start_url: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose: string;
  }>;
  splash_pages: any;
}

export interface AppConfig {
  name: string; // 站点标题
  favicon?: string; // 站点图标
  domain: string; // 站点链接
  keywords?: string; // 站点关键词
  description?: string; // 站点描述性信息
  avatar: string; // 主页头像
  layoutConfig?: LayoutConfig; // 布局相关的一些配置
  bgConfig: BgConfig; // 背景相关的一些配置
  primaryColor?: string;
  subTitle?: string; // 站点头像下方的次标题，可填入一言api，例：https://v1.hitokoto.cn?c=a&c=b&c=c
  subTitleConfig?: SubTitleConfig;
  socialConfig?: SocialConfig;
  footer?: string; // 底部文字
  links: Link[]; // 社交媒体的链接
  sites: Site[]; // 项目或者其他站点链接
  sitesConfig?: SitesConfig; // sites 渲染组件配置项
}