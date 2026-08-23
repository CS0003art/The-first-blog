# Cloudflare 安全加固操作指南

> 预计耗时：5-10 分钟  
> 难度：⭐⭐☆☆☆（跟着截图点就行）

---

## 📌 前置准备

1. 确保网站已部署到 Cloudflare Pages
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 选择你的域名（`touchwind.dpdns.org` 对应的 Zone）

---

## 第一步：SSL/TLS 加密设置（必做 ⭐⭐⭐）

### 1.1 设置加密模式为"完全（严格）"

**路径：** 左侧菜单 → **SSL/TLS** → **概述（Overview）**

**操作：**
1. 找到 **"SSL/TLS 加密模式"** 区域
2. 选择 **"完全（严格）"**（Full (strict)）
3. 等待几秒钟自动保存

**为什么这样做？**
- "灵活"模式：Cloudflare → 你的服务器是 HTTP（不安全❌）
- "完全（严格）"：全程 HTTPS 加密，证书有效性校验（安全✅）

---

### 1.2 设置最低 TLS 版本

**路径：** 左侧菜单 → **SSL/TLS** → **边缘证书（Edge Certificates）**

**操作：**
1. 找到 **"最低 TLS 版本"**（Minimum TLS Version）
2. 选择 **TLS 1.2**（不要选 1.0 或 1.1，已过时不安全）
3. 自动保存

**为什么这样做？**
- TLS 1.0/1.1 有已知漏洞
- 现代浏览器都支持 TLS 1.2+

---

### 1.3 开启自动 HTTPS 重写

**路径：** 仍在 **SSL/TLS** → **边缘证书** 页面

**操作：**
1. 找到 **"自动 HTTPS 重写"**（Automatic HTTPS Rewrites）
2. 打开开关（开关变成蓝色 = 已启用）

**为什么这样做？**
- 自动把页面中的 `http://` 链接改成 `https://`
- 避免混合内容警告

---

### 1.4 开启 HSTS（可选但推荐）

**路径：** 仍在 **SSL/TLS** → **边缘证书** 页面

**操作：**
1. 找到 **"HTTP 严格传输安全 (HSTS)"**
2. 点击 **"启用 HSTS"** 按钮
3. 在弹窗中配置：
   - **最大有效期（Max Age）**：`12 个月`（31536000 秒）
   - **应用于子域**：✅ 勾选
   - **Preload**：✅ 勾选（可选，如果你确定整个域名都用 HTTPS）
   - **No-Sniff 头**：✅ 勾选
4. 点击 **"下一步"** → **"我理解"** → **"启用 HSTS"**

**⚠️ 注意：**
- HSTS 一旦启用，浏览器会强制要求 HTTPS
- 如果你的网站有任何子域名不支持 HTTPS，不要勾选"应用于子域"

---

## 第二步：WAF（Web 应用防火墙）（必做 ⭐⭐⭐）

### 2.1 启用托管规则

**路径：** 左侧菜单 → **安全性（Security）** → **WAF**

**操作：**
1. 点击 **"托管规则"**（Managed rules）标签
2. 找到以下规则集并确保它们是 **"已启用"** 状态：
   - ✅ **Cloudflare Managed Ruleset**（Cloudflare 托管规则集）
   - ✅ **Cloudflare OWASP Core Ruleset**（OWASP 核心规则集）
3. 如果显示"已部署"或开关是蓝色，说明已启用

**为什么这样做？**
- 自动拦截 SQL 注入、XSS、命令注入等常见攻击
- OWASP 规则集是业界标准的 Web 安全规则

---

## 第三步：Bot 管理（推荐 ⭐⭐☆）

### 3.1 启用 Bot Fight Mode（免费版可用）

**路径：** 左侧菜单 → **安全性（Security）** → **Bots**

**操作：**
1. 找到 **"Bot Fight Mode"**
2. 打开开关（开关变成蓝色）

**为什么这样做？**
- 自动拦截恶意爬虫和自动化攻击
- 保护网站免受垃圾评论、暴力破解

**⚠️ 注意：**
- 这可能会拦截一些"好"爬虫（如搜索引擎）
- 如果你发现 Google 收录出问题，可以关闭这个选项

---

## 第四步：其他推荐设置（可选 ⭐☆☆）

### 4.1 开启浏览器完整性检查

**路径：** 左侧菜单 → **安全性（Security）** → **设置（Settings）**

**操作：**
1. 找到 **"浏览器完整性检查"**（Browser Integrity Check）
2. 打开开关

**为什么这样做？**
- 拦截已知恶意浏览器和僵尸网络

---

### 4.2 启用电子邮件地址混淆

**路径：** 左侧菜单 → **Scrape Shield**

**操作：**
1. 找到 **"电子邮件地址混淆"**（Email Address Obfuscation）
2. 打开开关

**为什么这样做？**
- 自动混淆页面中的邮箱地址，防止爬虫收集
- 不影响用户点击邮箱链接

---

## 第五步：验证配置是否生效 ✅

### 5.1 检查 SSL 证书

访问你的网站 `https://touchwind.dpdns.org`，点击地址栏左侧的 🔒 图标：
- ✅ 显示"连接是安全的"
- ✅ 证书有效期正常
- ✅ 证书颁发者是 Cloudflare 或 Let's Encrypt

---

### 5.2 检查安全响应头

1. 按 **F12** 打开浏览器开发者工具
2. 切换到 **Network（网络）** 标签
3. 刷新页面（Ctrl+R 或 Cmd+R）
4. 点击第一个请求（通常是 HTML 文档）
5. 在右侧找到 **Response Headers（响应头）**

**应该能看到这些头：**
```
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self' ...
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
referrer-policy: strict-origin-when-cross-origin
```

---

### 5.3 使用在线工具检测

访问以下网站进行安全评级：

1. **SSL Labs**：https://www.ssllabs.com/ssltest/
   - 输入你的域名 `touchwind.dpdns.org`
   - 等待 2-3 分钟分析
   - 目标：**A 或 A+ 评级**

2. **Security Headers**：https://securityheaders.com/
   - 输入你的域名
   - 目标：**A 或 A+ 评级**

---

## 🎯 完成检查清单

- [ ] SSL/TLS 加密模式：完全（严格）
- [ ] 最低 TLS 版本：1.2
- [ ] 自动 HTTPS 重写：已启用
- [ ] HSTS：已启用（可选）
- [ ] Cloudflare Managed Ruleset：已启用
- [ ] OWASP Core Ruleset：已启用
- [ ] Bot Fight Mode：已启用（可选）
- [ ] 浏览器完整性检查：已启用（可选）
- [ ] SSL Labs 评级：A 或 A+
- [ ] Security Headers 评级：A 或 A+

---

## ❓ 常见问题

### Q1：配置后网站访问不了怎么办？
**A1：** 可能是 SSL 模式设置错误，尝试：
1. 改回"完全"（Full）模式
2. 等待 5 分钟
3. 如果恢复正常，说明你的源服务器证书有问题

### Q2：Bot Fight Mode 会影响 SEO 吗？
**A2：** Cloudflare 会自动允许 Googlebot、Bingbot 等合法搜索引擎爬虫，不影响 SEO。

### Q3：HSTS 启用后能撤销吗？
**A3：** 可以在 Cloudflare 关闭，但已访问过的用户浏览器会缓存这个策略（最长 12 个月）。所以启用前要确定整个域名都支持 HTTPS。

### Q4：为什么 Security Headers 评级不是 A+？
**A4：** 可能需要微调 CSP 策略或添加更多安全头，可以根据检测结果逐项优化。

---

## 📚 延伸阅读

- [Cloudflare SSL/TLS 文档](https://developers.cloudflare.com/ssl/)
- [OWASP Top 10 安全风险](https://owasp.org/www-project-top-ten/)
- [Content Security Policy 完整指南](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

---

**配置完成后记得告诉我，我帮你验证一下是否生效！** 🎉
