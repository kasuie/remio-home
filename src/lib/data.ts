/*
 * @Author: kasuie
 * @Date: 2024-06-13 10:00:42
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 16:19:59
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

export const mainRules: RuleItem[] = [
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
