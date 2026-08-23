# 项目开发进度总结

> 更新日期：2026-08-23
> 项目名称：风域的博客（Firefly 主题的个人博客）
> 本地路径：`d:\Codex\personal blog`

---

## 一、项目概况

| 项目 | 详情 |
|---|---|
| 博客名称 | 风域的博客 |
| 正式域名 | https://touchwind.dpdns.org（www 子域自动跳转） |
| GitHub 仓库 | https://github.com/CS0003art/The-first-blog（私有） |
| 部署平台 | Cloudflare Pages（连接 GitHub 自动部署） |
| 技术栈 | Astro 6 + Svelte 5 + Tailwind CSS |
| 主题 | Firefly（Fork 自 Fuwari） |
| 包管理器 | pnpm（严格限制，Node.js >= 22） |
| 语言 | 简体中文（支持 i18n） |

## 二、已完成工作

### 1. 站点初始化（2026-08-11）
- [x] 站点信息配置：站点名"风域的博客"、副标题"技术成长"
- [x] 清理全部示例文章
- [x] 新增欢迎文章 `src/content/posts/welcome.md`（置顶）
- [x] 新增关于页 `src/content/spec/about.md`
- [x] 主题色相 195（蓝绿色），跟随系统深浅色
- [x] 头像/Logo：`src/assets/images/blog-avatar.png`（同时有 public 副本）

### 2. Git 工作流打通（2026-08-11）
- [x] Git 全局配置：Coren / q392719601@gmail.com
- [x] Git 代理配置：127.0.0.1:7897（Clash，用户科学上网端口）
- [x] 仓库推送：origin = CS0003art/The-first-blog，upstream = CuteLeaf/Firefly
- [x] 修复浅克隆问题（`git fetch --unshallow upstream`）
- [x] 修复 `pnpm-workspace.yaml` 错误（packages 字段缺失，Cloudflare 构建失败）

### 3. 部署上线（2026-08-11）
- [x] Cloudflare Pages 连接 GitHub 仓库
- [x] 构建配置：Build command `pnpm build`，Output `dist`，环境变量 `NODE_VERSION=22`
- [x] 域名绑定：`www.touchwind.dpdns.org` + 根域名重定向规则（301）
- [x] DNS：CNAME 记录 + Cloudflare Proxy（橙色云朵）
- [x] 部署成功，网站可访问

### 4. 首篇图文文章（2026-08-11）
- [x] `src/content/posts/hongkong-travel.md` — 香港三天两夜旅游攻略
- [x] 11 张配图：`public/images/posts/hongkong-travel/`（Unsplash 下载）
- [x] 文章结构：frontmatter 完整（author、license、category、tags 等）

### 5. 安全加固（2026-08-16）
- [x] HTTP 安全响应头（`public/_headers`）：
  - HSTS（max-age=31536000, includeSubDomains, preload）
  - CSP（严格内容策略，允许 Giscus/Google Fonts/CDN/Sentry）
  - X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy
- [x] Cloudflare 配置：SSL 完全（严格）、TLS 1.2、WAF 托管规则、OWASP 核心规则集、Bot Fight Mode
- [x] Dependabot 每日依赖安全检查（`.github/dependabot.yml` 已存在，无需新建）
- [x] **安全评级：A+**（SSL Labs & Security Headers 双 A+）
- [x] 操作指南文档：`docs/cloudflare-security-guide.md`（⚠️ 未提交，见"待办"）
- [x] SSL 证书：Cloudflare 自动续期，无需人工干预

## 三、关键配置备忘

### 部署配置（Cloudflare Pages）
| 配置项 | 值 |
|---|---|
| Framework | Astro |
| Build command | `pnpm build` |
| Output directory | `dist` |
| 环境变量 | `NODE_VERSION=22` |

### 站点配置（`src/config/siteConfig.ts`）
- `SITE_URL` = `https://touchwind.dpdns.org`（第 6 行，有 `process.env.SITE_URL` 覆盖）
- 关闭的页面：friends/sponsor/guestbook/bangumi/gallery/anime/dynamic 全部 false
- 开启：categoryBar 分类导航、foldArticle 归档折叠
- 评论系统：未启用
- 分析工具：未启用

### 环境注意事项
- **bash 环境下 `pnpm` 不可用**，需用 `npm run dev` 替代（Windows 上 pnpm 在 PowerShell/CMD 可用）
- 推送 GitHub 需代理开启（127.0.0.1:7897）

## 四、日常操作流程

### 发布新文章
1. 在 `src/content/posts/` 创建 `.md` 文件（frontmatter 参考 hongkong-travel.md）
2. 图片放 `public/images/posts/文章名/`，Markdown 中用 `![描述](/images/posts/文章名/图.jpg)`
3. 本地预览：`npm run dev`（bash 下）→ http://localhost:4321
4. 提交推送：
   ```bash
   git add .
   git commit -m "feat: 新增文章xxx"
   git push origin master
   ```
5. Cloudflare Pages 自动构建部署（3-5 分钟上线）

### 修改站点配置
编辑 `src/config/` 下对应文件 → 提交推送 → 自动部署

## 五、待办事项

- [ ] **提交 `docs/cloudflare-security-guide.md`**（安全指南文档尚未提交到 Git）
- [ ] 用户计划写更多文章（正在自己撰写中）
- [ ] 可选：启用评论系统（Giscus 已在 CSP 中预留）
- [ ] 可选：启用访问统计（Sentry 已在 CSP 中预留）
- [ ] 可选：同步上游 Firefly 主题更新（upstream 分支有新版 6.14.3+）

## 六、用户信息

- 用户名：Coren（风域）
- 邮箱：q392719601@gmail.com
- 经验：CLI 新手，需要操作提示和教学
- 偏好：中文交流、逐步引导、图文说明
- 科学上网：Clash，本地端口 7897

## 七、重要提醒（给 Codex 的交接笔记）

1. **提交信息用中文**，遵循 Conventional Commits（feat:/fix:/chore: 等）
2. **bash 下没有 pnpm**，本地命令改用 `npm run xxx`
3. **CSP 限制**：新增第三方资源（CDN、脚本）时必须在 `public/_headers` 的 CSP 中添加域名白名单
4. **不要动** `pnpm-workspace.yaml`（曾因此导致 Cloudflare 构建失败）
5. **Git 推送需要代理**（127.0.0.1:7897），已配置在 git config 全局
6. 文章图片放 `public/`（不参与 Astro 优化），站点资源放 `src/assets/`（参与优化）
