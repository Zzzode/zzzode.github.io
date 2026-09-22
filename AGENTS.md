# zzzode.github.io 协作说明

本仓库是 Zzzode 的个人网站，采用 **Astro 7 + Tailwind CSS v4 + TypeScript** 静态构建；推送到 `main` 后由 GitHub Actions（`withastro/action@v6`）构建并发布到 GitHub Pages，产物为纯静态 HTML/CSS，**默认零 JavaScript**（Astro 岛屿架构，不挂 `client:*` 指令就不打包 JS）。

- 动手改任何内容或样式前，先阅读 [Site Curator Prompt](docs/prompts/site-curator.md)。
- 视觉以 [苹果风格设计规范](docs/design/apple-style-guide.md) 为唯一权威；苹果 token 只在 `src/styles/global.css` 的 `@theme` 块中定义（同时以 CSS 自定义属性落在 `:root`），组件与文章内嵌 HTML 只准引用 token，不在组件里写死色值，不自创配色或组件。
- 内容与呈现分离：学术条目各自进 `src/content/{publications,talks,teaching,posts}/` 的 Markdown 文件，front matter 受 `src/content.config.ts` 的 zod schema 构建期校验；通用组件在 `src/components/`，页面路由在 `src/pages/`，静态资源在 `public/`。
- 本地验证：`npm run check`（TypeScript strict + 集合校验）与 `npm run build` 必须通过；预览用 `npm run dev`（HMR）或 `npm run preview`（构建产物）。
- 不引入交互框架（React/Vue/…）、不引入运行时 CDN 脚本或 webfont；确需交互的组件才用岛屿（`client:load` 等），并在 PR / commit message 里说明为什么不能纯静态。
- 仓库公开：`public/files/`、页面文字与仓库内容视同公开发布；不提交 token、凭据、个人敏感信息。
- 最小变更：样式问题在 token 与组件层集中修，不在文章里堆内联样式；可复用结构抽组件，不复制粘贴重复标记。
- `dist/`、`.astro/`、`node_modules/` 已被 gitignore，绝不提交构建产物。
- push 到 `main` 即对外发布（Actions 约 1 分钟）；完成本地 check / build / 视觉自检后，**先给用户确认再 push**。
- GitHub 仓库 Settings → Pages → Source 必须是 **GitHub Actions**（不是从分支部署）；自定义域名在 `public/CNAME` 维护。

环境搭建、命令与故障处理见 [操作说明](docs/operations.md)。
