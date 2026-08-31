# Tyan-an 个人主页

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
