# 苹果风格设计规范（Apple-style Design Guide）

本规范是 zzzode.github.io 全站与所有文章内嵌 HTML 的**视觉与组件权威说明**。目标是让页面呈现统一、克制、有呼吸感的苹果（apple.com）气质，而不是"模板默认灰蓝"或"企业软件大屏"。

## 事实源关系

| 载体 | 实现事实源 | 本规范的角色 |
|---|---|---|
| 设计 token（颜色、字体、圆角） | `src/styles/global.css` 的 `@theme` 块；Tailwind 据此生成 `text-ink`、`bg-paper`、`rounded-card` 等工具类，同时把同名 CSS 自定义属性输出到 `:root` | 定义 token 语义与取值；新增 token 只能加在 `@theme`，禁止在组件里写死色值 |
| 全站框架组件（导航、页脚、Hero、板块卡、条目列表、空状态、正文排版） | `src/components/*.astro`、`src/layouts/BaseLayout.astro`、`src/pages/**` | 定义原则与组件外观；框架改动在组件层完成并跑 check / build |
| 文章 / 页面内嵌 HTML（技术博文里的总览、双栏对比、流程时间线、卡片组） | Markdown 正文里手写的 HTML | **直接作为制作与验收依据**，逐组件给出结构与 CSS 约束；取色只用 `var(--color-*)` |
| Markdown 长文排版 | `src/styles/global.css` 里的 `.prose`（@tailwindcss/typography）与 Astro 内置 Shiki（`astro.config.mjs` 中的近单色自定义主题） | 标题 / 正文 / 表格 / 代码的排版以此为准，不在单篇文章里重排 |

当视觉与 token 表冲突时：颜色、字体、圆角、间距一律以本规范 token 表为准。禁止自创第二套配色或组件。

---

## 1. 设计原则

1. **黑白灰为骨架，彩色是标点。** 整页以墨色、多级灰、浅灰底构成；强调色只用于链接、关键数字和"主体归属"小圆点，不用于铺底、整列文字或卡片描边。
2. **内容即层级。** 层级靠字号、字重、留白和圆角分区拉开，不靠深色大色块、重边框、阴影堆叠或彩色顶边。
3. **呼吸感。** 大留白、宽松行高（正文 1.6–1.75）、大圆角；区块之间留白大于元素之间留白。
4. **对称即公平。** 双主体对比（如 V8 vs JVM）必须逐点左右对称，主体归属只用一枚 7–8px 圆点标识，两侧信息密度、结构、行数尽量对齐。
5. **图形只服务理解。** 禁止装饰性渐变、阴影堆叠、emoji 充当图标、装饰动图和无信息图标；分隔线、表格线、步骤连线都用中性灰且尽量淡。
6. **浅色优先。** 全站默认浅色（白底 + `paper` 浅灰区块）；除首页刻意设计的一块品牌门面外，不在正文里压深色大色块。

---

## 2. 设计 Token

### 2.1 颜色

token 在 `src/styles/global.css` 的 `@theme` 中声明；组件用 Tailwind 类（`text-ink-2`、`bg-paper`、`border-line-soft`、`bg-blue`），文章内嵌 HTML 用 CSS 变量（`var(--color-ink)`）。

| Token（CSS 变量） | 值 | Tailwind 类示例 | 用途 | 禁止 |
|---|---|---|---|---|
| `--color-ink` | `#1d1d1f` | `text-ink` | 一级标题、导航文字、正文强调 | — |
| `--color-ink-2` | `#424245` | `text-ink-2` | 正文、卡片正文、表格正文 | 不用纯黑 `#000` 排大段文字 |
| `--color-muted` | `#6e6e73` | `text-muted` | 次要说明、lead、条目 meta、描述 | 不用于小号正文（对比不足） |
| `--color-muted-2` | `#86868b` | `text-muted-2` | eyebrow/kicker、页脚、最弱标注 | 不用于关键信息 |
| `--color-paper` | `#f5f5f7` | `bg-paper` | 浅灰分区底、卡片底、代码底、空状态 | 不再叠加别的灰 |
| `--color-line` | `#dedee3` | `border-line` | 卡片描边、表头分隔线 | — |
| `--color-line-soft` | `#ececf0` | `border-line-soft` | 列表行线、导航 / 页脚底线 | — |
| `--color-blue` | `#0066cc` | `bg-blue` / `text-blue` | 主色：链接、主按钮、对比主体 A | 不铺大面积底、不染整列文字 |
| `--color-blue-hover` | `#0050a3` | （hover 态内置） | 蓝色交互的 hover | 浅底之外不用 |
| `--color-blue-on-dark` | `#2997ff` | — | 仅深色底上的高亮 | 浅底上不用 |
| `--color-compare` | `#e8710a` | — | **仅**双主体对比中"另一方"圆点 | 不用于普通页面、不铺底 |

用色红线：

- 一个普通页面**只有蓝色一个强调色**。
- 只有在"双主体逐点对比"场景才允许引入 `compare` 橙色，且蓝、橙**只能**出现在 7–8px 圆点、小 pill 标签内的圆点、表头 6px 小点上。
- 禁止：整列彩色正文、彩色卡片顶边/描边、彩色 `code`、彩色 badge / tag、高饱和大面积底色、红绿黄状态色堆叠、社交图标按品牌上彩色。
- 确需表达"好/坏/警告"时，优先用文字与中性色，不用成块的绿/红底色。

### 2.2 字体

```css
--font-sans: "SF Pro SC","SF Pro Text","SF Pro Display","PingFang SC",
  -apple-system, BlinkMacSystemFont, "Helvetica Neue","Segoe UI",Roboto,Arial,sans-serif;
--font-mono: "SF Mono",Menlo,Consolas,"Liberation Mono","Lucida Console",monospace;
```

- 标题用 sans 字族、字重 600、负字距（大标题 `letter-spacing:-0.02em ~ -0.03em`）。
- 正文 400；`html` 已开 `-webkit-font-smoothing:antialiased`。
- 代码用 mono，字号比正文小 1–2px。
- **只用系统字体栈，不引入 webfont 文件**（无外部字体请求、无 FOUT）。

字号阶梯（页面基准 15.5–16px）：

| 角色 | 尺寸 / 行高 |
|---|---|
| 首页 Hero H1 | `clamp(40px,6vw,64px)` / 1.08 |
| 内页 H1 | `clamp(30px,4vw,40px)` / 1.1 |
| 文章 H1 | `clamp(28px,4vw,38px)` / 1.12 |
| 区块 H2 | 22–28px / 1.15 |
| 卡片 H3 / 条目标题 | 16.5–19px / 1.25–1.35 |
| 正文 | 15.5px / 1.6–1.75 |
| 辅助 / meta / 标签 | 12–13px，`muted`；eyebrow/kicker 12px 大写 + `letter-spacing:.14em` |

### 2.3 圆角、间距、限宽

- 圆角 token：`--radius-sm 5px`（行内码）、`--radius 12px`、`--radius-card 18px`（板块卡）、`--radius-hero 28px`（Hero、空状态大区块）；按钮 / pill 用 `rounded-full`（999px）；头像 `rounded-full`。
- 间距用 4 的倍数；卡片内边距 20–28px；Hero 内边距移动 28px / 桌面 48–64px；区块纵向留白 40–56px，**区块外留白 > 卡片间 gap（16px）**。
- 限宽：常规内容容器 `max-width:1080px`，两侧 `px-5`（移动）/ `px-8`（桌面）；文章阅读列 `max-width:760px`。
- 文章内嵌 HTML 根容器流式全宽；内部需要限宽用 `max-width` + `margin:auto`，禁止写死像素页宽。

### 2.4 背景、边框、阴影

- 默认**无阴影**（Tailwind 默认阴影一律不用，含 hover 投影）。分区靠"白底 / `paper` 浅灰底"交替 + 圆角。
- 卡片二选一：白底下 1px `line`/`line-soft` 描边（首页板块卡），或直接 `paper` 浅灰底无边框；同一列表风格统一。
- 导航与页脚：白底 + 底部 / 顶部 1px `line-soft`；不使用渐变。

---

## 3. 全站框架组件

事实源为 `src/components/` 与 `src/layouts/BaseLayout.astro`；样式用 token 工具类集中写在组件上，不向 Markdown 正文泄漏实现细节。

### 3.1 顶部导航 `Nav.astro`

- 白底（`bg-white/85 backdrop-blur` 吸顶）+ 底部 1px `line-soft`，高 56px；不压深色条、不加投影。
- 站名 17px/600 墨色；导航项 14.5px 墨色，hover 与当前页转蓝（当前页不使用底色块）。
- 移动端（<768px）用原生 `<details>` 做零 JS 下拉：白底、1px hairline、12px 圆角，触控目标 ≥44px。

### 3.2 Hero（首页 `HomeHero.astro`）

- 浅灰 `paper` 大圆角 28px 横幅，内边距 28–64px；不是深色大屏封面。
- 结构：灰色大写 eyebrow（**不用蓝**）→ 墨色 H1（负字距）→ 灰色 lead（16.5–17px、max-width 620px）→ 按钮行。
- 主按钮蓝底白字胶囊；次按钮白底 1px hairline 墨字。

### 3.3 板块卡 `SectionCard.astro`

- 首页四张入口卡：白底 1px `line-soft`、圆角 18、无阴影；网格 `grid-cols-1 sm:grid-cols-2`、gap 16px。
- 卡内：eyebrow 英文小标签 + 中文标题（19px/600）；底部一行 13px `muted-2`（计数 / "暂无内容"）+ 中性 `›`。
- hover 仅标题转蓝、描边略加深；不位移、不投影。

### 3.4 条目列表 `EntryList.astro`（publications / talks / teaching / posts 主体）

- hairline 列表：条目上下 padding 20px，行间 1px `line-soft`，末行无线。
- 标题 16.5px/600 墨色，有链接时 hover 转蓝，无下划线；meta 行 12.5px `muted`（venue · 年份 / 日期 / 标签）。
- 摘要 13.5px `muted`、max-width 680px；标签为白底 1px hairline 小胶囊。
- 外部链接（论文 DOI / 正式链接）新标签打开；PDF 放 `public/files/`。

### 3.5 空状态 `EmptyState.astro`、页头 `PageHeader.astro`

- 空集合显示 `paper` 大圆角 22 区块、居中 14.5px `muted` 中文提示，不用灰色大锁 / 叉号等情绪化图形。
- 列表页页头：灰色大写 eyebrow → 中文 H1（clamp 30–40）→ 一句灰色 lead。

### 3.6 正文排版（`.prose`）、代码、页脚

- 长文用 `.prose max-w-none`（typography 插件，颜色在 `global.css` 覆盖为 token）：标题墨色负字距、正文 ink-2、链接蓝无下划线（hover 才出现）、引用与分隔线中性、图片 12px 圆角。
- 行内 `code`：mono、`paper` 底、ink-2 字、5px 圆角；代码块 `paper` 底、12px 圆角、13px。
- 语法高亮是 `astro.config.mjs` 里的**近单色 Shiki 主题**：默认 ink-2，关键字 ink 加粗，注释 muted-2 斜体；禁止彩色语法主题。
- 页脚：白底 + 顶部 1px `line-soft`，12.5px `muted-2`；GitHub / RSS 中性图标，hover 蓝；© 年份与署名。

### 3.7 图标与图片

- 导航 / 页脚用极简内联 SVG（GitHub、RSS、汉堡线），统一 `currentColor` 中性色。
- 不用 emoji 充当图标；头像未设置时不放大图，用首字母 monogram（见 `public/favicon.svg` 的做法）。
- 图片放 `src/content` 同目录或 `public/images/`，先压缩（长边建议 ≤2000px），不依赖外部图床、不内联 Base64 大图。

---

## 4. 文章内嵌 HTML 组件规范

适用于 Markdown 正文里手写的 HTML（研究总览、双主体对比、流程示意等）。

- 取色与字号**只允许使用 `:root` 上的 CSS 自定义属性**：`var(--color-ink)`、`var(--color-paper)`、`var(--radius-card)` 等；不写死十六进制色值。
- 根容器流式全宽、`box-sizing:border-box`，不写固定像素页宽。
- 图片放仓库内（`public/images/`），不引用外部图床。

技术综述 / 对比类长文推荐块序：① 顶部 Banner（4.1）；② 一组覆盖全篇要点的内容块——总览、双栏对比（4.3）、流程时间线（4.4）、对比表（4.5）、代码（4.6）按内容取舍，结构化要点要完整，不能只放一张总览；③ 总结块（4.7）。Markdown 原生正文穿插其间做白话讲解。

### 4.1 Hero 与顶部封面 Banner

- `background:var(--color-paper);border-radius:var(--radius-hero)`（28px），内边距 48–64px。
- 结构：灰色大写宽字距 eyebrow（**不用蓝**，写来源 / 主题归类）→ 墨色 `h1`（负字距）→ 灰色 lead（15–17px、行高 1.6、max-width 560–660px）→ 可选白色 hairline pill 行。
- 宽屏可左右分栏（`grid-template-columns:1.15fr .85fr`，约 860px 降单列）：左侧文案，右侧**纯内联极简 SVG** 表达核心结构，仅节点 / 强调点允许蓝、橙圆点；禁止位图、外部图片、彩色插画、emoji、装饰渐变。
- 不用整块深色 Hero、彩色半透明 pill、彩色边框 pill。

### 4.2 章节与白 / 灰交替

- 默认章节白底；`section.alt` 用 `paper` 浅灰大圆角区块（28px、四周 12–16px 外边距），内部卡片反白。
- 章节头居中：灰色大写 kicker（如 `01 · INSTANCE MODEL`）→ `h2` → 一句灰色副述。

### 4.3 双栏对比卡片（核心组件）

```css
.dual{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.card{border-radius:var(--radius-card);padding:28px 26px;background:var(--color-paper);border:none}
.alt .card{background:#fff}
```

- 每侧一张卡：顶部归属标签 `.ctag`（白底 / 灰底 pill，内含 7px 圆点 + 11px 灰色大写小字），下面是 `h3` + 灰色 `.csub` 副标题。
- 归属色**只**在圆点上；标签文字、标题、正文全部用中性墨色 / 灰色。
- 卡内按统一小块组织：`.blk-t`（11px 灰色宽字距小标题）+ 正文或步骤；窄屏（≤640px）降单列。

### 4.4 管线 / 流程步骤（竖向时间线）

- 单列 `.steps`，每步为"编号圆点 + 标题 + 说明"；圆点统一中性灰（`background:var(--color-muted-2)`、白字、19px），步骤间用 1.5px `line-soft` 竖线连接，**禁止每步换彩色**。
- 标题 13px 深色、说明 12.5px 灰色；一套流程 3–5 步，标题用动宾短语。

### 4.5 用户视角对比表

- `paper`（`alt` 内白底）大圆角 22px 容器，内含标题 + 一句说明 + 一张 `table`。
- 表头 11–12px 灰色大写；主体列头用"6px 圆点 + 名称"标识（A 蓝 / B 橙），**不整列染底色**；表头下 1.5px `line`，行间 1px `line-soft`。
- 容器 `overflow-x:auto`，窄屏横向滑动而不溢出。

### 4.6 代码

- 行内 `code`：mono 12–13px、`paper` 底、`ink-2` 字、5px 圆角；禁止蓝 / 橙彩色 code 底或彩字；代码块同理，中性浅底深字，全篇统一。

### 4.7 总结与页脚

- 结尾"总结"用 1–2 张浅灰大圆角卡（22px），每张一个主体：8px 圆点 + 名称 + 一句加粗结论 + 灰色补充。
- 文内页脚用 11.5–13px `muted-2` 灰字居中，放来源与参考链接，不加重线。

### 4.8 图标与 emoji

- 不用 emoji 充当小标题或状态图标；小节标题直接写中文。
- 必须用图形时，用极简线性 SVG 或字符（序号、≠、→），中性色，不引入彩色图标块。

---

## 5. 双主体对比内容规范（V8 vs JVM 这类技术博文）

视觉对称之外，内容也必须逐点对称、有细节，不允许一侧详实一侧口号：

1. **逐点成对。** 每个技术维度一个章节，左右各一张卡；不能出现"只讲 A、B 一句话带过"的维度。
2. **每点三层细节。** 每张卡都要落到：
   - **架构设计**：关键组件、数据结构、隔离 / 共享边界，给出真实 API / 类型名（如 `Isolate`、`JNIEnv*`、`HandleScope`、`GlobalRef`）。
   - **管线设计**：3–5 步编号流程，覆盖创建、进入、执行、回收 / 销毁的真实顺序，而不是抽象形容词。
   - **用户视角区别**：卡外用对比表给出"多实例 / 故障域 / 并发 / 典型用法 / 销毁后行为"等可操作差异。
3. **主体配色全篇固定。** 两个主体各分配一个圆点色并全篇一致（默认 A = 蓝、B = 橙）；颜色只标识归属，不表示优劣。
4. **结论对称。** 结尾总结卡同样左右成对，各自一句话概括模型哲学。

---

## 6. Do / Don't

| ✅ 要 | 🚫 不要 |
|---|---|
| token 只在 `global.css @theme` 定义 | 在组件或文章里写死色值 |
| 白底 + 浅灰大圆角区块交替 | 深色大色块铺满正文 |
| 无边框浅灰卡片 / 1px hairline 卡片 | 彩色卡片顶边、彩色描边、投影 |
| 强调色只做链接、主按钮和 7–8px 圆点 | 整列彩字、彩色 badge、彩色 code、品牌彩图标 |
| 学术条目 hairline 列表、中性 meta | 彩色 type badge、一排彩色按钮 |
| 中性灰步骤编号与连接线 | 每步一个彩色圆点、彩虹时间线 |
| 灰色大写 eyebrow + 墨色大标题 | 蓝色 eyebrow、emoji 小标题 |
| 双栏逐点对称、三层细节 | 一侧详实一侧口号、只堆形容词 |
| 流式 max-width + 降列断点 | 写死像素页宽、横向溢出 |
| 大留白、行高 1.6–1.75、圆角 18–28 | 信息塞满、直角密集边框、渐变背景 |
| 改样式走 token / 组件层并 check + build | 内联样式、手改 `dist/`、引入 CDN 样式 |

---

## 7. 技术约束（Astro / GitHub Pages）

- **默认零 JS**：不挂 `client:*` 指令的组件不产生任何 JS；整站当前没有任何 JS bundle。新交互优先用原生能力（如导航下拉用 `<details>`），确需岛屿时先说明理由。
- **不引框架与 CDN**：不引入 React/Vue/Svelte 等 UI 框架（Astro 支持但本站不需要），不引 Bootstrap/Tailwind CDN/jQuery/webfont/统计脚本；第三方资源必须 vendoring 进仓库或走 npm。
- **样式只用 Tailwind v4**（`@tailwindcss/vite`，配置即 `global.css`）+ typography 插件；不装第二套 CSS 方案。
- **语法高亮**用 Astro 内置 Shiki + 本仓库的近单色自定义主题（`astro.config.mjs`），不引 Prism/highlight.js。
- **内容受 schema 约束**：frontmatter 字段以 `src/content.config.ts` 为准，类型 / 格式错误在 `npm run build` 与 `astro check` 阶段失败。
- **部署**：`withastro/action@v6` 构建并部署；仓库 Settings → Pages → Source 必须设为 **GitHub Actions**。用户主页仓（zzzode.github.io）不设 `base`；自定义域名放 `public/CNAME`。
- 图片先压缩；不内联 Base64 大图；`dist/`、`.astro/`、`node_modules/` 不入 git。
- 响应式断点沿用 Tailwind：`sm 640 / md 768 / lg 1024 / xl 1280`；多列用 Grid + `minmax(0,1fr)` / Tailwind 网格并提供窄屏降列。

---

## 8. 发布前视觉自检清单

push 前本地构建后，按桌面 1280px、平板 768px、手机 390px 三档逐项核对（可用 Chrome DevTools 设备模拟或 headless 截图）：

- [ ] `npm run check` 与 `npm run build` 无错误、无新增警告。
- [ ] 整站以黑白灰为主，强调色仅出现在链接、主按钮和 7–8px 圆点上，无大面积彩色块、无彩色 tag / 品牌彩图标。
- [ ] 字号、负字距、行高、圆角符合 token 表；没有直角卡片、没有任何投影。
- [ ] 导航白底 hairline、吸顶不挡内容；移动端汉堡下拉可用（零 JS）。
- [ ] 首页 Hero 为浅灰大圆角，eyebrow 灰色大写、无 emoji；板块卡两列 / 单列切换正确。
- [ ] 条目列表行线、meta、标签中性；空集合显示中文空状态。
- [ ] 文章页标题、日期、标签与 `.prose` 排版正常；代码块近单色；双主体块左右对称、三层细节齐备。
- [ ] 窄屏下多列正确降列，无文字截断、横向溢出；触控目标 ≥44px。
- [ ] 图片已压缩、有 alt；无外链图床、无 localhost / 占位链接。
- [ ] 构建产物中无自有 JS bundle（除非该页明确用了岛屿）、无外链字体 / CDN。
- [ ] diff 中无 token、凭据、个人敏感信息，无 `dist/` 等产物噪声。

## 9. 文件地图

- Token 与全局排版：`src/styles/global.css`（`@theme` + base + `.prose`）。
- 代码高亮主题与站点配置：`astro.config.mjs`。
- 内容 schema：`src/content.config.ts`；条目：`src/content/{posts,publications,talks,teaching}/`。
- 框架组件：`src/components/{Nav,Footer,HomeHero,SectionCard,PageHeader,EntryList,EmptyState}.astro`。
- 页面：`src/pages/index.astro`、`src/pages/{publications,talks,teaching,posts}/index.astro`、`src/pages/posts/[slug].astro`、`src/pages/cv.astro`、`src/pages/404.astro`、RSS 在 `src/pages/rss.xml.ts`。
- 静态资源：`public/favicon.svg`、`public/files/`（PDF）、`public/images/`。
- 部署：`.github/workflows/deploy.yml`。
