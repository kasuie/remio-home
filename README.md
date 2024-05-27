<!--
 * @Author: kasuie
 * @Date: 2024-05-20 19:31:13
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 20:46:02
 * @Description:
-->

# 个人主页

remio-home(homepage): 基于配置的个人主页

- Next.js构建，服务端渲染，较好的SEO
- 部署方便，支持docker，vercel快速部署
- 配置方便，修改一个文件基本就可完成
- Pwa 支持，也可进行配置
- 移动端适配...

预览：

> ![prve](./images/prev.png)

[演示 Demo](https://remio-home.vercel.app)


## 部署

### 容器部署

拉取镜像

```sh
docker pull kasuie/remio-home
```

启动容器

```sh
docker run --name remio-home -p 3000:3000 -v /usr/local/config:/remio-home/config -d kasuie/remio-home:latest
```

如果需要自定义`pwa`图标，则需多挂载一个`icons`目录，运行如下命令：

```sh
docker run --name remio-home -p 3004:3000 -v /usr/local/config:/remio-home/config -v /usr/local/icons:/remio-home/public/icons -d kasuie/remio-home:latest
```

注意 `-v` 后面冒号前是挂载宿主机目录，即 `/usr/local/config` 和 `/usr/local/icon` 是需要修改为你想要挂载的资源目录，端口和容器名可根据需要调整，其他的需要保持不变。

当然首次启动成功后，还需要在你挂载的配置目录里（`/usr/local/config`）新建`config.json`文件，在里面填写你站点的配置信息，可参考仓库里 `/src/config/config.json` 进行修改，下方有参数说明可进行查看。

对于自定义`pwa`图标需要你在挂载目录`/usr/local/icons`至少上传一张命名为 `favicon192.png` 的图片，不然`pwa`不会生效。另外为了还应包含`favicon64.png `,`favicon128.png`和`favicon512.png`，这三种不是必须，但是不上传控制台会有报错，后续看情况可能会调整所需尺寸的张数。

以上配置修改后不需要重启项目，在页面刷新一下就能看到效果了。

> 有一点需要注意，如果遇到 `icons` 目录上传了文件，但是没有生效，可能需要重启一下容器，首次上传`favicon192.png`的时候可能会出现。

### 部署到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kasuie/remio-home&project-name=remio-home&repository-name=remio-home)

点击上方按钮即可，完成后，回到自己创建的仓库里，按需修改 `/src/config/config.json` 文件即可，以下是一些参数说明：

| 字段        | 类型      | 必填 | 说明                                                                             |
| ----------- | --------- | ---- | --------------------------------------------------------------------------------|
| name        | string    | 是   | 站点标题                                                                         |
| favicon     | string    | 否   | 站点图标                                                                         |
| domain      | string    | 是   | 站点链接                                                                         |
| keywords    | string    | 否   | 站点关键词                                                                       |
| description | string    | 否   | 站点描述性信息                                                                    |
| avatar      | string    | 是   | 主页头像                                                                         |
| bg          | string    | 是   | PC背景图                                                                         |
| mbg         | string    | 是   | 移动端背景图                                                                      |
| bgStyle     | string    | 否   | 背景飘浮风格。可选值：`sakura` 或 `snow`，也可自行填写飘浮物资源图片                 |
| subTitle    | string    | 否   | 站点头像下的次标题。可填入一言API，例如：`https://v1.hitokoto.cn?c=a&c=b&c=c`     |
| footer      | string    | 否   | 底部文字                                                                         |
| links       | [Link[]](#link-类型说明)    | 是   | 社交媒体的链接                                                   |
| sites       | [Site[]](#site-类型说明)    | 是   | 项目或者其他站点链接                                             |
| sitesConfig | [SitesConfig](#sitesconfig-类型说明) | 否   | sites 渲染组件配置项                                    |

#### Link 类型说明

| 字段  | 类型   | 必填 | 说明   |
| ----- | ------ | ---- | ------ |
| title | string | 是   | 标题   |
| color | string | 否   | 颜色   |
| url   | string | 是   | 链接   |
| icon  | string | 否   | 图标链接 |

#### Site 类型说明

| 字段  | 类型   | 必填 | 说明   |
| ----- | ------ | ---- | ------ |
| icon  | string | 是   | 图标链接 |
| title | string | 是   | 标题   |
| url   | string | 否   | 链接   |
| desc  | string | 否   | 描述   |

#### 关于icon

目前内置有图标：

```js
    github,
    twitter,
    qq,
    telegram,
    email,
    steam,
    bilibili,
    discord,
    instargram,
    x,
```

`icon` 字段填写图标名即可使用，如果没有你需要的，也可以填写图标的资源链接使用

#### SitesConfig 类型说明

| 字段  | 类型   | 必填 | 说明   |
| ----- | ------ | ---- | ------ |
| hoverBlur | boolean | 否   | hover状态下是否模糊   |
| hoverScale | boolean | 否   | hover状态下是否调整比例   |


### 本地启动

安装依赖

```js
pnpm install // 需要先安装pnpm: https://pnpm.io/
```

本地启动

```js
pnpm dev
```

打包

```js
pnpm build
```

## 补充

在你部署后，可在部署域名后面加上`/api/config`查看目前的配置信息