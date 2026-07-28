/* ============================================================================
   TROLL CAT — app.js  (vanilla, zero dependencies)
   Everything a "high-vol meme project turned ULTRA on" needs, honestly wired:
   pre-launch reads pre-launch. No fake counters, no fake countdowns.
   ========================================================================== */
(function () {
  "use strict";

  /* --- CONFIG: edit these when the cat launches --------------------------- */
  var CONFIG = {
    launched: false,                       // flip to true at launch
    contract: "TBA — not live yet",        // paste the verified CA at launch
    links: {
      buy:      "#how",                    // -> DEX deep link at launch
      chart:    "#chart",                  // -> DexScreener at launch
      x:        "https://x.com/",          // official X (fill handle)
      telegram: "https://t.me/trollcatt",   // official Telegram
      pad:      "https://robinlab.io"      // Robin Labs pad (launch home)
    },
    ticker: [
      "GM SER · THE CAT IS AWAKE","WAGMI IS OPTIONAL · THE GRIN IS MANDATORY",
      "GOLD CHAIN LOADED · WHISKERS ONLINE","FEW · VERY FEW · MOSTLY ONE CAT",
      "TERMINAL SAYS: troll --run","HE SEES YOUR STOP LOSS · HE IS UNBOTHERED",
      "BEIGE IS A LIFESTYLE · COPE IS A HOBBY","TRUST THE PROCESS · THE PROCESS IS A CAT",
      "PROBABLY NOTHING · POSSIBLY A CAT","NGMI? NEVER MET HER · SAYS THE CAT",
      "BASED FELINE UNITS DETECTED","LOADING GRIN... 100%",
      "THE CHAIN IS GOLD · THE CAT IS BEIGE · THE VIBE IS ETERNAL",
      "YOU CANNOT OUT-TROLL THE TROLL CAT","STAY HYDRATED · STAY TROLLPILLED · PET THE CAT",
      "TRADE LESS · TROLL MORE · PET CAT","CONTRACT: TBA · IMPOSTORS: MANY · REAL CAT: ONE",
      "NOT AN INVESTMENT · STILL SOMEHOW HERE","NICE LEADERBOARD · BE A SHAME IF A JESTER WALKED IN",
      "CATS LARPING AS FINANCE · ONE (1) CONFUSED DOG · AND US","THEY GOT THE CASH · WE GOT THE LAST LAUGH"
    ]
  };
  window.TROLL = CONFIG;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* --- toast -------------------------------------------------------------- */
  var toastEl, toastT;
  function toast(msg, warn) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.id = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.className = warn ? "warn show" : "show";
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.className = toastEl.className.replace("show", "").trim(); }, 2600);
  }

  /* --- marquees: fill + duplicate for seamless loop ----------------------- */
  function buildMarquees() {
    $$(".marquee").forEach(function (m) {
      var track = $(".track", m);
      if (!track) return;
      var one = CONFIG.ticker.map(function (t) {
        return "<b>" + t.replace(/troll --run/g, "<span>troll --run</span>") + " ·</b>";
      }).join("");
      track.innerHTML = one + one; // duplicate => -50% loop is seamless
    });
  }

  /* --- nav ---------------------------------------------------------------- */
  function nav() {
    var n = $(".nav");
    var onScroll = function () { n.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    var burger = $(".burger");
    if (burger) burger.addEventListener("click", function () { n.classList.toggle("open"); });
    $$(".nav-links a").forEach(function (a) { a.addEventListener("click", function () { n.classList.remove("open"); }); });
  }

  /* --- matrix rain (hero background, lightweight) ------------------------- */
  function matrix() {
    var c = $("#matrix"); if (!c) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = c.getContext("2d"), cols, drops, fs = 15;
    var glyphs = "01</>{}$#*+=TROLLCAT01".split("");
    function resize() {
      var host = c.parentElement;
      c.width = host.offsetWidth; c.height = host.offsetHeight;
      cols = Math.floor(c.width / fs); drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.random() * -40;
    }
    resize(); window.addEventListener("resize", resize);
    var last = 0;
    (function loop(t) {
      requestAnimationFrame(loop);
      if (t - last < 55) return; last = t;              // throttle ~18fps
      ctx.fillStyle = "rgba(7,10,7,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = fs + "px 'JetBrains Mono',monospace";
      for (var i = 0; i < cols; i++) {
        var txt = glyphs[(Math.random() * glyphs.length) | 0];
        var y = drops[i] * fs;
        ctx.fillStyle = Math.random() > 0.975 ? "rgba(255,210,63,.9)" : "rgba(57,255,20," + (0.25 + Math.random() * 0.5) + ")";
        ctx.fillText(txt, i * fs, y);
        if (y > c.height && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 0.5;
      }
    })(0);
  }

  /* --- mascot cursor-follow eyes ----------------------------------------- */
  function eyes() {
    var wrap = $(".mascot .eyes"); if (!wrap) return;
    var es = $$(".eye", wrap);
    if (!es.length) return;
    window.addEventListener("pointermove", function (e) {
      es.forEach(function (eye) {
        var r = eye.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        var a = Math.atan2(dy, dx), m = Math.min(4, Math.hypot(dx, dy) / 40);
        eye.style.transform = "translate(" + Math.cos(a) * m + "px," + Math.sin(a) * m + "px)";
      });
    }, { passive: true });
  }

  /* --- reveal on scroll --------------------------------------------------- */
  function reveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* --- count-up stats ----------------------------------------------------- */
  function countUp() {
    var els = $$("[data-count]");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "";
        var dec = (el.getAttribute("data-dec") | 0), t0 = null, dur = 1400;
        (function step(ts) {
          if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = (end * e).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* --- copy contract (honest pre-launch) ---------------------------------- */
  function copyCA() {
    $$("[data-copy-ca]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!CONFIG.launched) { toast("no contract yet, ser — the real CA lands here at launch. anything circulating now is a scam.", true); return; }
        var doToast = function () { toast("copied. verify it matches our pinned socials before you buy."); };
        if (navigator.clipboard) navigator.clipboard.writeText(CONFIG.contract).then(doToast, doToast); else doToast();
        coinBurst(btn);
      });
    });
  }

  /* --- MOON MATH (clearly a bit) ------------------------------------------ */
  function moonMath() {
    var input = $("#moon-in"), out = $("#moon-out"); if (!input || !out) return;
    var SUPPLY = 420690000000;         // meme supply
    var JOKE_LAUNCH_MC = 69420;        // a bit
    var JOKE_TARGET_MC = 69420000000;  // 69.420B — a bit, not a promise
    function fmt(n){ return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }
    function calc() {
      var usd = Math.max(0, parseFloat(input.value) || 0);
      if (!usd) { out.innerHTML = "type an amount you'd be happy to turn into a funny story later."; return; }
      var price0 = JOKE_LAUNCH_MC / SUPPLY;
      var tokens = usd / price0;
      var priceT = JOKE_TARGET_MC / SUPPLY;
      var val = tokens * priceT;
      out.innerHTML =
        "you'd hold <b>" + tokens.toLocaleString("en-US", { maximumFractionDigits: 0 }) + " $TROLL</b>.<br>" +
        "IF the cat ever reached the meme target of $69.420B <em>(he won't — this is a bit)</em>, that bag reads " +
        "<span class='big'>" + fmt(val) + "</span>.<br>" +
        "<span style='color:var(--red)'>entertainment only. not a projection, not advice. probably a screenshot.</span>";
    }
    input.addEventListener("input", calc); calc();
  }

  /* --- gold coin burst ---------------------------------------------------- */
  function coinBurst(anchor) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var r = anchor.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 16; i++) {
      (function () {
        var c = document.createElement("div"); c.className = "coin"; c.textContent = "$";
        c.style.left = cx + "px"; c.style.top = cy + "px"; document.body.appendChild(c);
        var ang = Math.random() * Math.PI * 2, vel = 60 + Math.random() * 120;
        var dx = Math.cos(ang) * vel, dy = Math.sin(ang) * vel - 80;
        var t0 = null;
        (function fly(ts) {
          if (!t0) t0 = ts; var p = (ts - t0) / 900;
          if (p >= 1) { c.remove(); return; }
          c.style.transform = "translate(" + dx * p + "px," + (dy * p + 240 * p * p) + "px) rotate(" + p * 540 + "deg)";
          c.style.opacity = String(1 - p);
          requestAnimationFrame(fly);
        })(performance.now());
      })();
    }
  }

  /* --- sound: tiny WebAudio purr/boop, muted by default ------------------- */
  var Sound = (function () {
    var on = localStorage.getItem("troll-sound") === "on", actx = null;
    function ctx() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); return actx; }
    function boop(freq) {
      if (!on) return;
      try {
        var a = ctx(), o = a.createOscillator(), g = a.createGain();
        o.type = "triangle"; o.frequency.value = freq || 220;
        o.connect(g); g.connect(a.destination);
        g.gain.setValueAtTime(0.0001, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.12, a.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.22);
        o.frequency.exponentialRampToValueAtTime((freq || 220) * 1.4, a.currentTime + 0.18);
        o.start(); o.stop(a.currentTime + 0.24);
      } catch (e) {}
    }
    function toggle() {
      on = !on; localStorage.setItem("troll-sound", on ? "on" : "off");
      updateIcon(); if (on) boop(330);
      toast(on ? "sound on. the cat purrs now." : "sound off. the cat respects your silence.");
    }
    function updateIcon() {
      var b = $(".sound"); if (b) b.setAttribute("data-on", on ? "1" : "0");
    }
    return { boop: boop, toggle: toggle, init: updateIcon, isOn: function () { return on; } };
  })();

  function wireSound() {
    var b = $(".sound"); if (b) b.addEventListener("click", Sound.toggle);
    Sound.init();
    $$("[data-boop]").forEach(function (el) {
      el.addEventListener("click", function () { Sound.boop(parseFloat(el.getAttribute("data-boop")) || 260); });
    });
  }

  /* --- pet the cat (primary CTA flourish) --------------------------------- */
  function petCat() {
    $$("[data-pet]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        coinBurst(btn); Sound.boop(300);
        if (!CONFIG.launched) { e.preventDefault(); toast("the cat isn't live yet — get in the litter box so you're early when he is."); }
      });
    });
  }

  /* --- easter egg: type "troll" ------------------------------------------ */
  function egg() {
    var buf = "";
    window.addEventListener("keydown", function (e) {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf.indexOf("troll") >= 0) { toast("troll --run :: grin deployed. you found the cat."); Sound.boop(420); buf = ""; }
      else if (buf.slice(-2) === "gm") { toast("gm ser. the terminal stays green."); }
    });
  }

  /* --- apply config to DOM (links, contract, launch state) ---------------- */
  function applyConfig() {
    $$("[data-link]").forEach(function (a) {
      var k = a.getAttribute("data-link"), v = CONFIG.links[k];
      if (v) { a.setAttribute("href", v); if (/^https?:/.test(v)) { a.target = "_blank"; a.rel = "noopener"; } }
    });
    $$("[data-ca-text]").forEach(function (el) { el.textContent = CONFIG.contract; });
    document.documentElement.setAttribute("data-launched", CONFIG.launched ? "1" : "0");
  }

  /* --- boot --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildMarquees(); nav(); matrix(); eyes(); reveal(); countUp();
    copyCA(); moonMath(); wireSound(); petCat(); egg(); applyConfig();
    $("#year") && ($("#year").textContent = new Date().getFullYear());
  });
})();
