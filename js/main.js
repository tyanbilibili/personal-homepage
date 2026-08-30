/* =========================================================
   Tyan-an 个人主页 —— 主交互脚本
   功能：导航滚动、移动端菜单、Hero 粒子、滚动渐入、技能条、
         光标光斑跟随、联系表单（前端演示）
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 导航栏滚动背景 ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains("open");
    navMenu.classList.toggle("open", isOpen);
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };
  navToggle.addEventListener("click", () => toggleMenu());
  navMenu.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => toggleMenu(false))
  );

  /* ---------- Hero 粒子背景 ---------- */
  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles = [], raf = null;
    const COLORS = ["rgba(0,140,255,", "rgba(120,170,255,", "rgba(255,255,255,"];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      initParticles();
    }
    function initParticles() {
      const count = Math.min(70, Math.floor((w * h) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + "0.5)";
        ctx.fill();
        // 连线，形成网络感
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(0,140,255," + (0.12 * (1 - dist / 130)) + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);

    // 页面离开 Hero 时暂停，省电
    const hero = document.getElementById("hero");
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { if (!raf) draw(); }
          else { if (raf) { cancelAnimationFrame(raf); raf = null; } }
        });
      }, { threshold: 0.05 });
      io.observe(hero);
    } else {
      draw();
    }
  }

  /* ---------- 滚动渐入 ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            // 技能条触发
            if (e.target.classList.contains("skill-card")) {
              const bar = e.target.querySelector(".skill-bar span");
              const level = e.target.getAttribute("data-level") || 0;
              if (bar) bar.style.width = level + "%";
            }
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- 光标光斑跟随 ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    let tx = 0, ty = 0, x = 0, y = 0;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
    });
    function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate(${x - 210}px, ${y - 210}px)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- 联系表单（前端演示，无后端） ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("c-name").value.trim();
      const email = document.getElementById("c-email").value.trim();
      const msg = document.getElementById("c-msg").value.trim();
      if (!name || !email || !msg) {
        alert("请完整填写姓名、邮箱和内容。");
        return;
      }
      // 可替换：接入你真实的联系渠道（如 mailto 或表单后端）
      const mailto = `mailto:tyan-an@foxmail.com?subject=${encodeURIComponent(
        "来自个人主页的留言 by " + name
      )}&body=${encodeURIComponent(msg + "\n\n（发件人邮箱：" + email + "）")}`;
      window.location.href = mailto;
      form.reset();
      alert("已将信息整理为邮件；若未能自动打开邮箱，请手动添加我的邮箱。");
    });
  }
})();
