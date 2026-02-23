/* =========================================
   VELO X1 — App JavaScript
   ========================================= */

(function () {
  "use strict";

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ── MOBILE BURGER MENU ── */
  const burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const links = document.querySelector(".nav__links");
      const cta = document.querySelector(".nav__cta");
      if (links) {
        const open = links.style.display === "flex";
        links.style.cssText = open ? "" : "display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(10,10,10,0.97);padding:32px 5%;gap:20px;";
        if (cta) cta.style.display = open ? "" : "inline-block";
      }
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealItems = document.querySelectorAll("[data-reveal]");
  const featureCards = document.querySelectorAll(".feature-card");
  const testiCards = document.querySelectorAll(".testi-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Feature cards with stagger
  featureCards.forEach((card, i) => {
    card.dataset.delay = i * 120;
    observer.observe(card);
  });

  // Testi cards with stagger
  testiCards.forEach((card, i) => {
    card.dataset.delay = i * 150;
    observer.observe(card);
  });

  // Generic reveal elements
  revealItems.forEach((el) => observer.observe(el));

  /* ── PARALLAX HERO SHOE ── */
  const heroShoe = document.getElementById("heroShoe");
  if (heroShoe) {
    window.addEventListener("mousemove", (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroShoe.style.transform = `
        translateY(${-18 * Math.sin(Date.now() / 2000)}px)
        rotate(${-3 + dx * 4}deg)
        perspective(600px)
        rotateY(${dx * 8}deg)
        rotateX(${-dy * 4}deg)
      `;
    });
  }

  /* ── COLOR SELECTOR ── */
  const colorChips = document.querySelectorAll(".color-chip");
  const colorTint = document.getElementById("colorTint");

  colorChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      colorChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const color = chip.dataset.color;
      if (colorTint) {
        colorTint.style.background = color;
        colorTint.style.opacity = color === "#FF6B35" ? "0" : "0.55";
      }
    });
  });

  /* ── SIZE SELECTOR ── */
  const sizeBtns = document.querySelectorAll(".size-btn");
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  /* ── BUY BUTTON ── */
  const buyBtn = document.getElementById("buyBtn");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      const selectedSize = document.querySelector(".size-btn.selected");
      if (!selectedSize) {
        // Shake size selector
        const grid = document.getElementById("sizeGrid");
        grid.style.animation = "none";
        grid.style.outline = "2px solid #FF6B35";
        setTimeout(() => {
          grid.style.outline = "";
          grid.style.animation = "";
        }, 1200);
        return;
      }
      const btnText = buyBtn.querySelector(".btn-text");
      buyBtn.classList.add("added");
      btnText.textContent = "✓ ¡Agregado al carrito!";
      setTimeout(() => {
        buyBtn.classList.remove("added");
        btnText.textContent = "🛒 Agregar al carrito";
      }, 3000);
    });
  }

  /* ── URGENCY BAR ── */
  const urgencyBar = document.getElementById("urgencyBar");
  const urgencyBarObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          if (urgencyBar) urgencyBar.style.width = "77%";
        }, 400);
        urgencyBarObs.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  if (urgencyBar) urgencyBarObs.observe(urgencyBar);

  /* ── LIVE COUNTER URGENCY ── */
  const urgencyText = document.getElementById("urgencyText");
  if (urgencyText) {
    let count = 23;
    setInterval(() => {
      if (Math.random() < 0.3 && count > 5) {
        count--;
        urgencyText.innerHTML = `⏳ Quedan <strong>${count} pares</strong> disponibles`;
      }
    }, 18000);
  }

  /* ── NOTIFICATION POPUP ── */
  const notif = document.getElementById("notif");
  const cities = [
    "Mendoza", "Córdoba", "Rosario", "La Plata",
    "Mar del Plata", "Tucumán", "Salta", "Santa Fe",
    "Buenos Aires", "Neuquén", "Bahía Blanca"
  ];
  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  const strong = notif ? notif.querySelector("strong") : null;
  const span = notif ? notif.querySelector("span") : null;

  function showNotif() {
    if (!notif) return;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    if (strong) strong.textContent = `Alguien de ${city}`;
    if (span) span.textContent = `acaba de comprar talle ${size}`;
    notif.classList.add("show");
    setTimeout(() => notif.classList.remove("show"), 3500);
  }

  // First popup after 4s, then every ~25s
  setTimeout(showNotif, 4000);
  setInterval(showNotif, 25000);

  /* ── SMOOTH SCROLL NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ── HERO SHOE ENTRANCE ── */
  window.addEventListener("load", () => {
    const hero = document.querySelector(".hero__copy");
    if (hero) {
      hero.style.opacity = "0";
      hero.style.transform = "translateX(-30px)";
      hero.style.transition = "opacity 0.9s ease, transform 0.9s ease";
      setTimeout(() => {
        hero.style.opacity = "1";
        hero.style.transform = "translateX(0)";
      }, 200);
    }
    const wrap = document.querySelector(".hero__image-wrap");
    if (wrap) {
      wrap.style.opacity = "0";
      wrap.style.transform = "translateX(30px)";
      wrap.style.transition = "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s";
      setTimeout(() => {
        wrap.style.opacity = "1";
        wrap.style.transform = "translateX(0)";
      }, 300);
    }
  });

})();
