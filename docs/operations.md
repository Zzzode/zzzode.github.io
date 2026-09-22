# 操作说明

## 环境要求

- **Node.js ≥ 22.12**（Astro 7 要求；本机 v22.x 满足，CI 用 Node 24）。
- **npm ≥ 9.6.5**，用 npm 管理依赖（提交 `package-lock.json`；`withastro/action` 靠锁文件识别包管理器）。
- 不需要 Ruby / Python；内容生成已被 Astro Content Collections + zod 取代。

## 首次准备

    npm install

如果在字节内网使用默认镜像（`bnpm.byted.org`）时出现 `@astrojs/markdown-satteri` 版本找不到的错误，是镜像未同步该包所致；仓库根目录的 `.npmrc` 已把 registry 指向 `https://registry.npmjs.org/`，直接在仓库内执行 `npm install` 即可（GitHub Actions 同样走公网 npm，无需额外配置）。

## 本地开发

    npm run dev        # http://localhost:4321，HMR 热更新

生产等价构建（push 前最终自检必须用这个）：

    npm run check      # astro check：TS strict + content collection 校验
    npm run build      # 产物输出到 dist/
    npm run preview    # 本地预览 dist/（默认 http://localhost:4321）

改 `astro.config.mjs`、`src/content.config.ts` 后 dev 会自动重启同步；新增 / 删除集合目录不需要重启。

## 添加内容

- 论文：`src/content/publications/<slug>.md`，`title/date/venue` 必填，附 PDF 放 `public/files/` 并填 `pdf: /files/xxx.pdf`。
- 演讲：`src/content/talks/<slug>.md`；教学：`src/content/teaching/<slug>.md`；文章：`src/content/posts/YYYY-MM-DD-slug.md`。
- frontmatter 字段以 `src/content.config.ts` 为准；构建期校验，字段错误会让 `build` 失败——在源文件修正，不要放宽 schema。
- 文章正文支持 GFM 与代码高亮；内嵌 HTML 取色只用 `var(--color-*)`，规范见 `docs/design/apple-style-guide.md`。

## 发布

没有独立部署脚本：commit 推送到 `main` 后，`.github/workflows/deploy.yml`（`actions/checkout@v7` → `withastro/action@v6` → `actions/deploy-pages@v5`）自动构建上线。

1. `npm run check` 与 `npm run build` 通过。
2. 完成设计规范第 8 节的三档宽度视觉自检。
3. 用户确认后 `git push`。
4. 在 GitHub 仓库 **Settings → Pages → Source 确认是 "GitHub Actions"**（首次部署前必须设置；之前若用分支部署，这里不切换会继续构建旧内容或失败）。
5. 在 Actions 页确认工作流绿色，线上抽查。

## 常见故障

- **`npm install` 报 `No matching version found for @astrojs/markdown-satteri`**：内网镜像未同步；仓库 `.npmrc` 已指定公网 registry，确认未用 `--registry` 覆盖。
- **build 报 content / schema 错误**：按报错文件行号修 front matter（日期用 ISO、枚举值合法、URL 合法）；不要改 schema 迁就错误数据。
- **样式没更新 / 新 token 不生效**：`@theme` 里变量名必须是 `--color-*` / `--radius-*` 这类 Tailwind v4 能识别的命名空间；改后重启 dev。
- **页面 404 或资源路径错**：本仓是 `<user>.github.io` 根站，**不要设置 `base`**；内部链接以 `/` 开头写绝对路径。日后若改为项目仓或加自定义域名，再按 Astro 文档调整。
- **Actions 构建失败但本地通过**：先看 Actions 日志；常见为推送了未 `npm install` 后的 lockfile 漂移、或用了白名单外的环境变量。本地以 `npm run build`（而不是全局 astro）为准。
- **页面字体或样式在本地与线上不一致**：确认没有引入 webfont / CDN；本站只使用系统字体栈。
- **图片过大**：先压缩（长边 ≤2000px），不内联 Base64、不入大体积数据文件。

## 不要提交

- `dist/`、`.astro/`、`node_modules/`（已在 `.gitignore`）。
- token、凭据、个人敏感信息；公开仓库中一切内容视同对外发布。
