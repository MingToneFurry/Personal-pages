# Mint Glass Homepage

一个薄荷色玻璃拟态风格的 Vue 3 多页面个人主页模板。

## 特性

- Vue 3 + Vue Router + Vite
- 5 个页面：Home / About / Projects / Gallery / Contact
- 全站背景图来自：`https://api.furry.ist/furry-img`
- 自动黑夜模式：首帧生效，跟随系统，可手动切换并记忆
- 内容配置集中在：`src/content/site.config.ts`

## 背景图策略（避免过于频繁变化）

你的背景接口特性是「刷新页面就会换图」，因此模板默认：

- **不会在路由切换时刷新背景**（避免你说的“背景一直在变动”）
- 仅在 **页面刷新 / 首次进入** 时请求一次背景

你可以在 `src/content/site.config.ts` 里改：

- `siteConfig.background.refreshOnRouteChange`
- `siteConfig.background.refreshOnceAfterMs`

## 背景模糊强度（可调）

同样在 `src/content/site.config.ts`：

- `siteConfig.background.blurPx`
- `siteConfig.background.saturate`
- `siteConfig.background.contrast`

## 开发启动

```bash
npm install
npm run dev
```

访问：`http://localhost:3287/`

## 构建

```bash
npm run build
```

产物在 `dist/`。

## 本地预览构建产物

```bash
npm run preview
```

## 部署（静态站点）

把 `dist/` 目录部署到任意静态托管即可。

### Nginx（history 模式时需要）

如果你把路由改成 history 模式，需要加 SPA 回退：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
