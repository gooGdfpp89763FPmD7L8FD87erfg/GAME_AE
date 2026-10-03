
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  function tag(el, dir, delay) {
    el.classList.add("reveal", "r-" + dir);
    if (delay) el.style.transitionDelay = delay.toFixed(2) + "s";
  }

  var upGroups = [
    ".sec-head", ".why-card", ".band-inner", ".stat",
    ".qa", ".fcard", ".tcard", ".menu-shots figure"
  ];
  upGroups.forEach(function (sel) {
    var els = document.querySelectorAll(sel);
    els.forEach(function (el, i) {
      tag(el, "up", (i % 6) * 0.08);
    });
  });

  document
    .querySelectorAll(".games-grid > .game-card, .grid > .card")
    .forEach(function (el, i) {
      tag(el, i % 2 ? "right" : "left", Math.floor(i / 2) * 0.08);
    });

  document.querySelectorAll(".gallery").forEach(function (el) { tag(el, "left"); });
  document.querySelectorAll(".buybox").forEach(function (el) { tag(el, "right"); });

  var revealEls = document.querySelectorAll(".reveal");

  if (reduce || !hasIO) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  function fmt(n) {

    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  document.querySelectorAll(".stat .n").forEach(function (el) {
    var raw = el.textContent.trim();

    var m = raw.match(/^([\d\s  ]+)(\+?)$/);
    if (!m) return;
    var target = parseInt(m[1].replace(/[\s  ]/g, ""), 10);
    if (isNaN(target)) return;
    var suffix = m[2] || "";

    el.textContent = "0" + suffix;
    var started = false;

    function run() {
      if (started) return;
      started = true;
      if (reduce) { el.textContent = fmt(target) + suffix; return; }
      var dur = 1500, t0 = null;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!hasIO) { run(); return; }
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(); io2.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    io2.observe(el);
  });

  var pick = document.getElementById("hero-pick");
  if (pick) {
    var GAMES = {
      wz: {
        img: "https://hightgame.com/unreal.webp", alt: "غش Warzone",
        count: "3 باقات متاحة",
        name: "Call of Duty : Black Ops 7 / Warzone",
        desc: "ايم بوت، ESP، سبوفر Ranked وتريغر بوت. لا يظهر في البث 100%.",
        price: "3499 AED", consoles: "🖥️ PC · 🎮 Xbox · 🎮 PS5",
        cta: "تصفّح باقات Warzone ←", href: "https://hightgame.com/cheat-warzone.html",
        glow: "59,130,246"
      },
      arc: {
        img: "https://hightgame.com/arc-ghost.webp", alt: "غش Arc Rider PC",
        count: "3 باقات متاحة",
        name: "ARC Raiders",
        desc: "ايم بوت، ESP للاعبين والروبوتات، ESP للغنائم ونقاط الاستخراج، تريغر بوت وسبوفر HWID.",
        price: "3499 AED", consoles: "🖥️ PC · 🎮 Xbox · 🎮 PS5",
        cta: "تصفّح باقات ARC Raiders ←", href: "https://hightgame.com/cheat-arc-rider.html",
        glow: "245,158,11"
      },
      fn: {
        img: "https://hightgame.com/fn-delta.webp", alt: "غش Fortnite",
        count: "باقتان متاحتان",
        name: "Fortnite",
        desc: "ايم بوت قابل للتخصيص، ESP للاعبين، ESP للغنائم والصناديق، سبوفر HWID مع كلينر.",
        price: "3499 AED", consoles: "🖥️ PC · 🎮 Xbox · 🎮 PS5",
        cta: "تصفّح باقات Fortnite ←", href: "https://hightgame.com/cheat-fortnite.html",
        glow: "139,92,246"
      },
      val: {
        img: "https://hightgame.com/valorant-maxim.webp", alt: "غش Valorant PC",
        count: "باقة واحدة متاحة",
        name: "Valorant",
        desc: "ايم بوت، ESP، تريغر بوت وسبوفر HWID. غير قابل للكشف ولا يظهر في البث 100%.",
        price: "3499 AED", consoles: "🖥️ PC · 🎮 Xbox · 🎮 PS5",
        cta: "تصفّح باقة Valorant ←", href: "https://hightgame.com/cheat-valorant.html",
        glow: "255,70,85"
      },
      tk: {
        img: "https://hightgame.com/tarkov-reaper.webp", alt: "غش Tarkov PC",
        count: "باقة واحدة متاحة",
        name: "Escape from Tarkov",
        desc: "ايم بوت، ESP للاعبين والسكاف، ESP للغنائم ونقاط الاستخراج، سبوفر HWID. جاهز للتشغيل فوراً.",
        price: "3499 AED", consoles: "🖥️ PC",
        cta: "تصفّح باقة Tarkov ←", href: "https://hightgame.com/cheat-tarkov.html",
        glow: "166,154,70"
      }
    };

    var tabs = pick.querySelectorAll(".pick-tab");
    var stage = pick.querySelector(".pick-stage");
    var elGlow = pick.querySelector(".pick-glow");
    var elImg = pick.querySelector(".pick-img");
    var elCount = pick.querySelector(".pick-count");
    var elName = pick.querySelector(".pick-name");
    var elDesc = pick.querySelector(".pick-desc");
    var elPrice = pick.querySelector(".pick-price");
    var elCons = pick.querySelector(".pick-consoles");
    var elCta = pick.querySelector(".pick-cta");

    function apply(key) {
      var g = GAMES[key];
      if (!g) return;
      pick.style.setProperty("--game", "rgb(" + g.glow + ")");
      elGlow.style.background =
        "radial-gradient(closest-side,rgba(" + g.glow + ",.55),transparent)";
      elImg.src = g.img;
      elImg.alt = g.alt;
      elImg.title = g.alt;
      elCount.textContent = g.count;
      elName.textContent = g.name;
      elDesc.textContent = g.desc;
      elPrice.innerHTML = "ابتداءً من <b>" + g.price + "</b>";
      elCons.textContent = g.consoles;
      elCta.textContent = g.cta;
      elCta.href = g.href;
      elCta.title = g.alt;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        if (tab.classList.contains("is-active")) return;
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var key = tab.getAttribute("data-game");
        if (reduce) { apply(key); return; }
        stage.classList.add("fade");
        setTimeout(function () {
          apply(key);
          stage.classList.remove("fade");
        }, 180);
      });
    });

    apply("wz");
  }
})();
