/*
 * @Author: kasuie
 * @Date: 2024-06-13 10:00:42
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 20:30:03
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
  },
  {
    field: "subTitle",
    isRequired: false,
    label: "站点次标题",
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果/功能",
    items: [
      { label: "爱心图标", value: "heart" },
      { label: "打字效果", value: "typing" },
      { label: "打字循环", value: "loopTyping", tips: "开启打字效果生效" },
      { label: "文字阴影", value: "shadow" },
      { label: "打字光标", value: "typingCursor", tips: "开启打字效果生效" },
      { label: "显示来源", value: "showFrom" },
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
  },
  {
    controlKey: "checkbox",
    field: "$boolean",
    isRequired: false,
    label: "启用效果",
    items: [{ label: "渲染过渡动画", value: "istTransition" }],
  },
];

export const AppRules = [
  { title: "主要设置", rules: mainRules },
  { title: "头像设置", rules: avatarRules },
  { title: "布局设置", rules: layoutRules },
] 
