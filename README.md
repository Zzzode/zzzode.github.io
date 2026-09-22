# zzzode.github.io

Zzzode 的个人网站：论文、演讲、教学与文章。

- **框架**：[Astro 7](https://astro.build)（静态输出，默认零 JavaScript）
- **样式**：[Tailwind CSS v4](https://tailwindcss.com)，苹果风格设计 token（见 [docs/design/apple-style-guide.md](docs/design/apple-style-guide.md)）
- **内容**：Astro Content Collections + zod，构建期校验 frontmatter
- **部署**：推送到 `main`，GitHub Actions 自动发布到 GitHub Pages

## 本地开发

要求 Node.js ≥ 22.12。

```bash
npm install
npm run dev        # http://localhost:4321
```

## 构建与检查

```bash
npm run check      # TypeScript strict + 内容集合校验
npm run build      # 产物到 dist/
npm run preview    # 预览构建产物
```

## 目录结构

```
src/
  components/       # Nav、Footer、HomeHero、SectionCard、EntryList、EmptyState …
  layouts/          # BaseLayout
  pages/            # 文件路由（首页、四个板块、文章页、CV、404、RSS）
  content/          # Markdown 内容：publications / talks / teaching / posts
  styles/           # global.css：@theme 设计 token 与 .prose 排版
  lib/              # 类型与格式化工具
public/             # favicon、files/（PDF）、images/
astro.config.mjs    # 站点、集成、近单色 Shiki 主题
```

新增条目：在对应集合目录放一个 Markdown 文件，字段以 [`src/content.config.ts`](src/content.config.ts) 为准。

## 部署

推送到 `main` 即发布（`.github/workflows/deploy.yml`）。首次使用前，在 GitHub 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

## 文档

- [协作说明 AGENTS.md](AGENTS.md)
- [苹果风格设计规范](docs/design/apple-style-guide.md)
- [站点维护 Prompt](docs/prompts/site-curator.md)
- [操作说明](docs/operations.md)
