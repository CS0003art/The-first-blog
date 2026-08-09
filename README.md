# 个人博客

基于 [Astro](https://astro.build/) 与 [Firefly](https://github.com/CuteLeaf/Firefly) 的静态个人博客。当前版本包含首页、文章详情、分类、标签、归档、关于页、Pagefind 全文搜索、RSS、Sitemap 和亮暗色模式。

## 本地运行

环境要求：

- Node.js 22 或更高版本
- pnpm 9 或更高版本
- Git

安装并启动：

```bash
pnpm install
pnpm dev
```

默认访问地址为 `http://localhost:4321`。

## 修改个人信息

上线前至少检查这些文件：

- `src/config/siteConfig.ts`：站点标题、描述、主题色和功能开关
- `src/config/profileConfig.ts`：作者名称、简介、头像和社交链接
- `src/config/navBarConfig.ts`：顶部导航
- `src/content/spec/about.md`：关于页面
- `.env.example`：正式域名示例

当前头像是原创的中性占位图。拿到自己的头像后，请替换：

- `src/assets/images/blog-avatar.png`
- `public/assets/images/blog-avatar.png`

## 发布文章

文章位于 `src/content/posts/`。可以复制 `welcome.md`，或运行：

```bash
pnpm new-post
```

推荐的 Frontmatter：

```yaml
---
title: 文章标题
published: 2026-07-18
description: 文章摘要
image: ./cover.jpg
tags: [标签一, 标签二]
category: 分类名称
draft: false
pinned: false
comment: false
slug: stable-english-slug
---
```

`slug` 发布后不要随意修改，以免已有链接失效。

## 验证

```bash
pnpm check
pnpm type-check
pnpm build
pnpm preview
```

生产文件生成在 `dist/`。

## 部署到 Cloudflare Pages

将仓库连接到 Cloudflare Pages，并设置：

- 构建命令：`pnpm build`
- 输出目录：`dist`
- Node.js：22 或更高版本
- 环境变量 `SITE_URL`：你的完整正式域名

每次推送到默认分支后，Cloudflare Pages 会自动重新构建和发布。

也可以在完成 Cloudflare 登录后直接上传当前构建：

```bash
npx wrangler login
pnpm build
npx wrangler pages deploy dist --project-name personal-blog
```

## 许可

本项目保留 Firefly 与 Fuwari 的原始 MIT 版权声明，详见 [LICENSE](./LICENSE)。
