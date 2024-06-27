import { AppConfig } from "@/config/config";

/*
 * @Author: kasuie
 * @Date: 2024-06-13 10:00:42
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-27 11:20:01
 * @Description:
 */
export interface ItemsItem {
  label: string;
  value: string;
  controlKey?: string;
  desc?: string;
  controlProps?: any;
}

export interface RuleItem {
  controlKey?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  items?: Array<ItemsItem>;
  field: string;
  desc?: string;
  controlProps?: any;
  default?: string | number | string[];
}

const mainRules: RuleItem[] = [
  {
    field: "favicon",
    isRequired: false,
    label: "站点图标",
  },
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
    controlKey: "radio",
    field: "theme",
    isRequired: false,
    label: "主题设置",
    items: [
      { label: "亮色", value: "light" },
      { label: "暗色", value: "dark" },
      { label: "手动切换", value: "switcher" },
    ],
    default: ["light"],
  },
  {
    field: "subTitle",
    isRequired: false,
    label: "站点次标题",
  },
  {
    controlKey: "list",
    field: "links",
    isRequired: false,
    label: "社媒链接",
    items: [
      { label: "标题", value: "title", controlKey: "input" },
      { label: "颜色", value: "color", controlKey: "input" },
      { label: "链接", value: "url", controlKey: "input" },
      { label: "图标链接", value: "icon", controlKey: "input" },
    ],
  },
  {
    controlKey: "list",
    field: "sites",
    isRequired: false,
    label: "站点链接",
    items: [
      { label: "标题", value: "title", controlKey: "input" },
      { label: "描述", value: "desc", controlKey: "input" },
      { label: "链接", value: "url", controlKey: "input" },
      { label: "图标链接", value: "icon", controlKey: "input" },
    ],
  },
];

const avatarRules: RuleItem[] = [
  {
    field: "src",
    isRequired: false,
    label: "头像资源路径",
  },
  {
    field: "size",
    isRequired: true,
    label: "头像尺寸",
    controlProps: {
      type: "number",
      min: 0,
    },
  },
  {
    controlKey: "select",
    field: "round",
    isRequired: false,
    label: "圆角程度",
    items: [
      { label: "100%", value: "full" },
      { label: "24px", value: "3xl" },
      { label: "12px", value: "xl" },
      { label: "8px", value: "lg" },
      { label: "6px", value: "md" },
      { label: "2px", value: "sm" },
    ],
    default: "full",
  },
  {
    controlKey: "radio",
    field: "style",
    isRequired: false,
    label: "头像动画",
    items: [
      { label: "无动画", value: "none" },
      { label: "边框闪烁", value: "glint" },
      { label: "涟漪动画", value: "wave" },
    ],
    default: ["none"],
  },
  {
    controlKey: "radio",
    field: "hoverAnimate",
    isRequired: false,
    label: "头像hover动画",
    items: [
      { label: "无动画", value: "none" },
      { label: "上移", value: "top" },
      { label: "旋转", value: "rotate" },
    ],
    default: ["none"],
  },
];

const layoutRules: RuleItem[] = [
  {
    controlKey: "select",
    field: "gapSize",
    isRequired: false,
    label: "布局组件间隔",
    items: [
      { label: "组件间隙48px", value: "lg" },
      { label: "组件间隙32px", value: "md" },
      { label: "组件间隙30px", value: "sm" },
    ],
    default: "md",
  },
  {
    controlKey: "select",
    field: "style",
    isRequired: false,
    label: "布局风格",
    items: [
      { label: "horizontal", value: "horizontal" },
      { label: "vertical", value: "vertical" },
    ],
    default: "vertical",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果",
    items: [{ label: "渲染过渡动画", value: "istTransition" }],
    default: ["istTransition"],
  },
];

const bgRules: RuleItem[] = [
  {
    field: "bg",
    isRequired: false,
    label: "pc背景图",
    default: "https://cs.kasuie.cc/blog/image/wallpaper/bg.webp",
  },
  {
    field: "mbg",
    isRequired: false,
    label: "移动端背景图",
    default: "https://kasuie.cc/api/img/bg?type=mobile&size=regular",
  },
  {
    field: "bgStyle",
    isRequired: false,
    label: "背景飘浮",
    desc: "内置sakura(樱花)，snow(雪花)",
  },
  {
    controlKey: "select",
    field: "blur",
    isRequired: false,
    label: "背景模糊",
    items: [
      { label: "无模糊", value: "none" },
      { label: "4px", value: "sm" },
      { label: "12px", value: "md" },
      { label: "16px", value: "lg" },
    ],
    default: "sm",
  },
  {
    field: "cardOpacity",
    isRequired: false,
    label: "卡片的透明度",
    desc: "0-1之间，默认0.3",
    controlProps: {
      type: "number",
      max: 1,
      min: 0,
      step: "0.05",
    },
    default: 0.1,
  },
  {
    field: "carouselGap",
    isRequired: false,
    label: "图片轮播间隔时间",
    desc: "单位s(秒)，默认5s，最小3s",
    controlProps: {
      type: "number",
      min: 3,
    },
    default: 5,
  },
  {
    controlKey: "select",
    field: "transitionStyle",
    isRequired: false,
    label: "图片轮播过渡动画",
    items: [
      { label: "默认", value: "default" },
      { label: "向下", value: "toBottom" },
      { label: "向上", value: "toTop" },
      { label: "向左", value: "toLeft" },
      { label: "向右", value: "toRight" },
      { label: "由远及近", value: "toIn" },
      { label: "远近混合", value: "toInOut" },
    ],
    default: "default",
  },
  {
    field: "transitionTime",
    isRequired: false,
    label: "图片轮播过渡时间",
    desc: "单位s(秒)，默认0.7s",
    controlProps: {
      type: "number",
    },
    default: 0.7,
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果",
    items: [
      { label: "图片轮播", value: "carousel" },
      { label: "背景图动画", value: "autoAnimate" },
    ],
  },
];

const footerRules: RuleItem[] = [
  {
    field: "text",
    isRequired: false,
    label: "展示文字",
  },
  {
    field: "url",
    isRequired: false,
    label: "文字的链接",
  },
  {
    field: "ICP",
    isRequired: false,
    label: "备案号",
    desc: "填写后会链接到工信部",
  },
  {
    controlKey: "select",
    field: "direction",
    isRequired: false,
    label: "元素排列方式",
    items: [
      { label: "垂直排列", value: "col" },
      { label: "水平排列", value: "row" },
      { label: "反向垂直排列", value: "col-reverse" },
      { label: "反向水平排列", value: "row-reverse" },
    ],
    desc: "默认col",
    default: "col",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果",
    items: [{ label: "链接图标", value: "isExternal" }],
  },
];

const sitesRules: RuleItem[] = [
  {
    controlKey: "select",
    field: "cardStyle",
    isRequired: false,
    label: "站点卡片风格",
    items: [
      { label: "默认", value: "default" },
      { label: "翻转", value: "flip" },
    ],
    default: "default",
  },
  {
    controlKey: "select",
    field: "direction",
    isRequired: false,
    label: "卡片排列方式",
    items: [
      { label: "垂直排列", value: "col" },
      { label: "水平排列", value: "row" },
    ],
    desc: "默认col，cardStyle为flip生效",
    default: "col",
  },
  {
    field: "modalTitle",
    isRequired: false,
    label: "modal的标题",
  },
  {
    field: "modalTips",
    isRequired: false,
    label: "modal次标题",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果",
    items: [
      { label: "隐藏该组件", value: "hidden" },
      { label: "hover状态模糊", value: "hoverBlur" },
      { label: "hover状态伸缩", value: "hoverScale" },
      { label: "卡片是否可翻转", value: "hoverFlip" },
      { label: "是否显示modal", value: "modal" },
    ],
    default: ["hoverFlip"],
  },
];

const subTitleRules: RuleItem[] = [
  {
    controlKey: "select",
    field: "loading",
    isRequired: false,
    label: "出现动画",
    items: [
      { label: "无动画", value: "none" },
      { label: "波浪渐入", value: "wave" },
    ],
    default: "none",
  },
  {
    field: "typingGap",
    isRequired: false,
    label: "一言间隔多久开始清除",
    desc: "单位秒(s)，默认为10s，最小3s",
    controlProps: {
      type: "number",
      min: 3,
      step: "0.5",
    },
    default: 10,
  },
  {
    controlKey: "select",
    field: "style",
    isRequired: false,
    label: "样式风格",
    items: [
      { label: "默认", value: "default" },
      { label: "介绍风格", value: "desc" },
    ],
    default: "default",
    desc: "layoutConfig.style 为 horizontal 生效",
  },
  {
    field: "desc",
    isRequired: false,
    label: "简要的描述",
    desc: "subTitleConfig.style 为 desc 生效，如果需要分行展示以;分隔",
  },
  {
    field: "content",
    isRequired: false,
    label: "详细描述内容",
    desc: "subTitleConfig.style 为 desc 生效，如果需要分行展示以;分隔",
  },
  {
    field: "gapDelay",
    isRequired: false,
    label: "单个文字出现间隔",
    controlProps: {
      type: "number",
      step: "0.01",
    },
    default: 0.05,
    desc: "单位秒(s)，默认0.05s，搭配loading属性定义动画",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果/功能",
    items: [
      { label: "爱心图标", value: "heart" },
      { label: "打字效果", value: "typing" },
      { label: "打字循环", value: "loopTyping", desc: "开启打字效果生效" },
      { label: "文字阴影", value: "shadow" },
      { label: "打字光标", value: "typingCursor", desc: "开启打字效果生效" },
      { label: "显示来源", value: "showFrom" },
    ],
    default: ["heart", "typingCursor", "showFrom"],
  },
];

const socialRules: RuleItem[] = [
  {
    controlKey: "select",
    field: "loading",
    isRequired: false,
    label: "出现动画",
    items: [
      { label: "无动画", value: "default" },
      { label: "波浪渐入", value: "wave" },
    ],
    default: "default",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果/功能",
    items: [{ label: "涟漪动画", value: "ripple" }],
    default: ["ripple"],
  },
];

const slidersRules: RuleItem[] = [
  {
    field: "title",
    isRequired: false,
    label: "标题",
    desc: "为空不展示",
  },
  {
    field: "color",
    isRequired: false,
    label: "进度条颜色",
    default: "#fff",
  },
  {
    field: "dotColor",
    isRequired: false,
    label: "标题前面点的颜色",
    default: "#fff",
  },
  {
    field: "column",
    isRequired: false,
    label: "一行展示几列",
    desc: "2-4的范围，默认2",
    controlProps: {
      type: "number",
      min: 2,
      max: 4,
    },
    default: 2,
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果/功能",
    items: [{ label: "隐藏该组件", value: "hidden" }],
  },
  {
    controlKey: "list",
    field: "data",
    isRequired: false,
    label: "技能数据",
    items: [
      { label: "标题", value: "title", controlKey: "input" },
      { label: "颜色", value: "color", controlKey: "input" },
      {
        label: "掌握程度",
        value: "value",
        controlKey: "input",
        controlProps: {
          type: "number",
          min: 0,
          max: 100,
        },
      },
      { label: "图标链接", value: "icon", controlKey: "input" },
    ],
  },
];

export const AppRules = [
  { title: "主要设置", rules: mainRules },
  { title: "头像设置", rules: avatarRules, field: "avatarConfig" },
  { title: "布局设置", rules: layoutRules, field: "layoutConfig" },
  { title: "背景设置", rules: bgRules, field: "bgConfig" },
  { title: "底部设置", rules: footerRules, field: "footer" },
  { title: "站点设置", rules: sitesRules, field: "sitesConfig" },
  { title: "标题设置", rules: subTitleRules, field: "subTitleConfig" },
  { title: "社媒设置", rules: socialRules, field: "socialConfig" },
  { title: "技能设置", rules: slidersRules, field: "sliders" },
];

export const defaultAppConfig: AppConfig = {
  name: "我的主页✨",
  favicon: "/favicon.ico",
  keywords: "remio,rem,mio,C.C.,KASUIE,个人主页,主页",
  description: "KASUIEの次元，兴趣至上，内容随缘，个人主页",
  avatarConfig: {
    src: "https://s2.loli.net/2024/06/19/8zlOyDUnGjXeHpi.webp",
    size: 150,
    round: "full",
    hoverAnimate: "top",
    style: "glint",
  },
  bgConfig: {
    bg: "",
    mbg: "",
    bgStyle: "snow",
    blur: "",
    cardOpacity: 0.1,
    carousel: true,
    carouselGap: 5,
    transitionTime: 0.7,
    transitionStyle: "default",
    autoAnimate: false,
  },
  layoutConfig: {},
  subTitle: "https://v1.hitokoto.cn?c=a&c=b&c=c",
  subTitleConfig: {},
  links: [
    {
      title: "qq",
      color: "#dfba00",
      url: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=zIvBSvLDRr4MvqFSHcioDwS090ljUYHT&authKey=THHoVVpDZWHfnpZoNf57rDWzwrXmTWtnlN70ljCM6cG9eZ5KTIJcTxrvc7%2B7YdVI&noverify=0&group_code=793752494",
      icon: "qq",
    },
    {
      title: "github",
      color: "#000000",
      url: "https://github.com/kasuie",
      icon: "github",
    },
    {
      title: "email",
      color: "#fd3232",
      url: "mailto:i@kasuie.cc",
      icon: "email",
    },
    {
      title: "bilibili",
      color: "#0088cc",
      url: "https://space.bilibili.com/85447052",
      icon: "bilibili",
    },
  ],
  sites: [
    {
      icon: "https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover",
      title: "KASUIEの次元",
      url: "https://kasuie.cc",
      desc: "博客主页",
    },
    {
      icon: "https://cs.kasuie.cc/icons/1419ac35-0a57-4359-bb2f-55a26fc52bd8.png!cover",
      title: "Mio 导航",
      url: "https://nav.kasuie.cc",
      desc: "Mio 网站导航",
    },
    {
      icon: "https://cs.kasuie.cc/icons/a8cb45a8-c0ec-41e7-ab8f-ff4fe8817230.jpg!cover",
      title: "KASUIEのAI",
      url: "https://ai.kasuie.cc",
      desc: "ChatGPT",
    },
    {
      icon: "https://cs.kasuie.cc/icons/1419ac35-0a57-4359-bb2f-55a26fc52bd8.png!cover",
      title: "KASUIEの库",
      url: "https://dist.kasuie.cc",
      desc: "网盘挂载程序",
    },
    {
      icon: "https://cs.kasuie.cc/icons/0d2e7fe7-3cca-4989-9bb4-4a39cee77801.png!cover",
      title: "KASUIEの图床",
      url: "https://upload.kasuie.cc",
      desc: "图床服务",
    },
    {
      icon: "https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover",
      title: "监控服务",
      url: "https://status.kasuie.cc/status",
      desc: "服务程序监控",
    },
    {
      icon: "https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover",
      title: "KASUIEのDocs",
      url: "https://docs.kasuie.cc",
      desc: "文档服务",
    },
    {
      icon: "https://cs.kasuie.cc/icons/1419ac35-0a57-4359-bb2f-55a26fc52bd8.png!cover",
      title: "喜好生成表",
      url: "https://like.kasuie.cc",
      desc: "个人喜好生成表",
    },
  ],
  sitesConfig: {},
  socialConfig: {},
  sliders: {},
  footer: {
    text: "© 2020 - 2024 By KASUIE",
    url: "https://kasuie.cc",
    ICP: "ICP备xxxxxxxx号",
    direction: "col-reverse",
    isExternal: true,
  },
};
