# Tyan-an 个人主页

> 个人展示主页 · 作品集 · 极简高级毛玻璃深色风格 · 纯静态 HTML/CSS/JS

这是我的个人主页站点，展示我的简介、代表作品、技能与动态。采用无框架原生前端，支持手机/平板/电脑自适应，部署在 GitHub Pages。

## 预览入口

- 主页：`index.html`（GitHub Pages 部署后由根目录 index 呈现）
- 锐评集列表：`projects/reviews.html`
- 音游《MalodyV》谱面合集：`projects/charts.html`

---

## 本地预览

直接用浏览器打开 `index.html` 即可，无需安装依赖。

若要体验子路径下的相对路径一致性，可本地起一个静态服务器：

```bash
# 在本项目根目录（index.html 所在目录）执行
python -m http.server 8000
# 然后浏览器访问 http://localhost:8000/
```

## 目录结构

```
个人主页/
├── index.html              # 主页面（导航、Hero、关于、作品、技能、动态、页脚）
├── css/
│   └── style.css           # 全部样式（含详情页/列表页共用样式）
├── js/
│   └── main.js             # 交互：导航、移动菜单、粒子、滚动渐入、技能条、表单
├── assets/
│   ├── avatar.svg          # 头像（DiceBear 开源生成）
│   └── favicon.svg         # 站点图标
└── projects/
    ├── reviews.html        # 锐评集列表页（点击标题跳详情）
    ├── review-0.html ~ review-7.html   # 8 篇锐评详情页
    └── charts.html         # 音游《MalodyV》谱面合集列表页
```

---

## 部署到 GitHub Pages

采用「新建独立仓库 + 子路径访问」的方式：访问地址为
`https://<你的用户名>.github.io/<仓库名>/`。

以本机 Git 为例（仓库名建议 `personal-homepage`）：

### 1. 初始化仓库并推送

```bash
# 进入本项目根目录（index.html 所在目录）
git init
git add .
git commit -m "feat: Tyan-an 个人主页 v1.0"
git branch -M main
# 在 GitHub 新建空仓库 personal-homepage 后：
git remote add origin https://github.com/<你的用户名>/personal-homepage.git
git push -u origin main
```

> 注意：本项目仓库里**不需要**包含 `代表作品/`、`需求文档.docx` 等你的原始素材，
> 它们只用于内容提取，不应上传到 GitHub 仓库（避免仓库过大 / 夹杂无关内容）。

### 2. 开启 GitHub Pages

1. 进入仓库 `personal-homepage` → `Settings` → `Pages`
2. `Source` 选择 `Deploy from a branch`
3. Branch 选 `main`，目录选 `/ (root)`，点击 `Save`
4. 等待一两分钟，页面将出现在 `https://<你的用户名>.github.io/personal-homepage/`

> 若想用自定义域名，可在 `Settings → Pages → Custom domain` 填写，并在仓库根目录放一个 `CNAME` 文件。

---

## 需要上传到 GitHub 的文件 / 目录

下面这些是**网站本体**，需要纳入 Git 提交并推送：

```
index.html
css/style.css
js/main.js
assets/avatar.svg
assets/favicon.svg
projects/reviews.html
projects/review-0.html
projects/review-1.html
projects/review-2.html
projects/review-3.html
projects/review-4.html
projects/review-5.html
projects/review-6.html
projects/review-7.html
projects/charts.html
```

> `代表作品/`、`需求文档.docx` 是本地素材，**不要**上传到 GitHub Pages 仓库。

---

## 音游《MalodyV》谱面的下载

`projects/charts.html` 中「下载全部谱面 (zip)」按钮目前指向仓库的 Releases 页。
请把 11 个 `.mcz` 谱面打包成一个 zip，上传到 GitHub Release 后获取下载链接：

```bash
# 在 代表作品/《MalodyV》谱面合集/ 目录下，用命令行 zip 或任意压缩软件，
# 把 11 个 .mcz 文件打包成 malody-charts.zip
zip malody-charts.zip *.mcz   # 若命令行无 zip，可改用压缩软件（如 7-Zip / WinRAR）
```

1. 在 GitHub 仓库 `personal-homepage` 进入 `Releases` → `Create a new release`
2. 填一个版本号（如 `charts-v1.0`）
3. 上传打包好的 `py.zip`（建议命名如 `malody-charts.zip`）
4. 发布后，复制该 Release 的浏览器地址，替换 `projects/charts.html` 中下载按钮的 `href`

---

## 自定义与修改

- **配色**：修改 `css/style.css` 顶部的 `:root` 变量（`--primary` 等）。
- **文字内容**：在对应 HTML 中直接修改文本即可。
- **头像**：替换 `assets/avatar.svg`（或改用 `assets/avatar.png` 并改 `index.html` 引用）。
- **社交链接**：`index.html` 页脚里替换各平台 URL。

---

## 说明

- 站点图标与头像使用 [DiceBear](https://www.dicebear.com/) 开源生成，无版权风险。
- 图标库使用 Font Awesome（CDN），字体使用 Inter / Noto Sans SC（Google Fonts，国内自动回退系统字体）。
- 站内所有链接采用相对路径，可正常用于 GitHub Pages 的子路径部署。
