const scramble = {
  mounted(el, binding) {
    const original = el.textContent;
    const chars = "!@#$%&*()_+-=[]{}|;:,.<>?/~абвгдежзийклмнопрстуфхцчшщъыьэюя";
    let timer;

    const start = () => {
      clearInterval(timer);
      let i = 0;
      const max = binding.value?.iterations ?? 10;
      timer = setInterval(() => {
        el.textContent = original
          .split("")
          .map((c, j) => {
            if (j < i) return original[j];
            if (c === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (i < original.length) i++;
        else clearInterval(timer);
      }, binding.value?.speed ?? 50);
    };

    const stop = () => {
      clearInterval(timer);
      el.textContent = original;
    };

    el.addEventListener("mouseenter", start);
    el.addEventListener("mouseleave", stop);
    el._scrambleStop = stop;
    el._scrambleOriginal = original;
  },
  unmounted(el) {
    el.removeEventListener("mouseenter", el._scrambleStop);
    el.removeEventListener("mouseleave", el._scrambleStop);
    clearInterval(el._scrambleTimer);
  },
};

export default {
  spotlight: {
    mounted(el) {
      const move = (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
      };
      el._spotlightMove = move;
      el.addEventListener("mousemove", move);
    },
    unmounted(el) {
      el.removeEventListener("mousemove", el._spotlightMove);
    },
  },
  ripple: {
    mounted(el) {
      el._rippleClick = (e) => {
        const rect = el.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height) * 2.2;
        const span = document.createElement("span");
        span.className = "ripple-effect";
        span.style.width = `${diameter}px`;
        span.style.height = `${diameter}px`;
        span.style.left = `${e.clientX - rect.left - diameter / 2}px`;
        span.style.top = `${e.clientY - rect.top - diameter / 2}px`;
        el.appendChild(span);
        span.addEventListener("animationend", () => span.remove(), { once: true });
      };
      el.addEventListener("click", el._rippleClick);
    },
    unmounted(el) {
      el.removeEventListener("click", el._rippleClick);
    },
  },
  tilt: {
    mounted(el, binding) {
      const opts =
        typeof binding.value === "number"
          ? { max: binding.value }
          : binding.value || {};
      const max = opts.max ?? 6;
      const lift = opts.lift ?? 0;
      el.style.transition =
        "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease";
      el._tiltOnMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(${-lift}px)`;
      };
      el._tiltOnLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", el._tiltOnMove);
      el.addEventListener("mouseleave", el._tiltOnLeave);
    },
    unmounted(el) {
      el.removeEventListener("mousemove", el._tiltOnMove);
      el.removeEventListener("mouseleave", el._tiltOnLeave);
      el.style.transition = "";
    },
  },
  scramble,
  magnetic: {
    mounted(el, binding) {
      const opts = binding.value || {};
      const strength = opts.strength ?? 0.35;
      const max = opts.max ?? 12;
      el.style.transition = "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.willChange = "transform";
      const clamp = (v) => Math.max(-max, Math.min(max, v));
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * strength);
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * strength);
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      el._magMove = move;
      el._magLeave = leave;
    },
    unmounted(el) {
      el.removeEventListener("mousemove", el._magMove);
      el.removeEventListener("mouseleave", el._magLeave);
      el.style.transform = "";
      el.style.transition = "";
    },
  },
  inview: {
    mounted(el, binding) {
      const opts = binding.value || {};
      el.classList.add("iv-init");
      if (opts.variant) el.setAttribute("data-iv", opts.variant);
      if (opts.delay) el.style.transitionDelay = `${opts.delay}ms`;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              el.classList.add("iv-in");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
      el._ivIO = io;
    },
    unmounted(el) {
      if (el._ivIO) el._ivIO.disconnect();
    },
  },
  count: {
    mounted(el, binding) {
      const opts =
        typeof binding.value === "number"
          ? { value: binding.value }
          : binding.value || {};
      const target = Number(opts.value) || 0;
      const suffix = opts.suffix ?? "";
      const prefix = opts.prefix ?? "";
      const dur = opts.duration ?? 1500;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const render = (v) => {
        el.textContent = `${prefix}${v}${suffix}`;
      };
      if (reduce) {
        render(target);
        return;
      }
      render(0);
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(el);
            const t0 = performance.now();
            const tick = (t) => {
              const p = Math.min((t - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              render(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      el._countIO = io;
    },
    unmounted(el) {
      if (el._countIO) el._countIO.disconnect();
    },
  },
  reveal: {
    mounted(el, binding) {
      if (el._revealInit) return;
      el._revealInit = true;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        el.setAttribute("data-reveal-ready", "");
        return;
      }

      const opts = binding.value || {};
      el._revealConfig = {
        stagger: opts.stagger ?? 60,
        blur: opts.blur ?? 6,
        y: opts.y ?? 10,
        duration: opts.duration ?? 700,
        once: opts.once ?? true,
      };

      // Keep references to Vue-managed nodes so i18n updates still reach them.
      el._revealNodes = Array.from(el.childNodes);
      el._revealSignature = nodesSignature(el._revealNodes);

      el._revealReveal = () => el.classList.add("is-revealed");
      el._revealHide = () => el.classList.remove("is-revealed");

      el._revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el._revealReveal();
              if (el._revealConfig.once) el._revealIO.unobserve(el);
            } else if (!el._revealConfig.once) {
              el._revealHide();
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );

      renderReveal(el);
      el._revealIO.observe(el);
    },
    updated(el) {
      if (!el._revealNodes) return;
      const sig = nodesSignature(el._revealNodes);
      if (sig !== el._revealSignature) {
        el._revealSignature = sig;
        el.classList.remove("is-revealed");
        renderReveal(el);
        el._revealIO.observe(el);
      }
    },
    unmounted(el) {
      if (el._revealIO) el._revealIO.disconnect();
    },
  },
};

const nodesSignature = (nodes) =>
  Array.from(nodes)
    .map((n) =>
      n.nodeType === Node.TEXT_NODE ? n.nodeValue : n.outerHTML
    )
    .join("|");

const LATIN_RUN = /^[0-9A-Za-z.%+±~×\-]+$/;

const renderReveal = (el) => {
  const { stagger, blur, y, duration } = el._revealConfig;
  let wordCount = 0;

  const makeWord = (txt) => {
    const w = document.createElement("span");
    w.className = "reveal-word";
    w.textContent = txt;
    w.style.transitionDelay = `${wordCount * stagger}ms`;
    w.style.setProperty("--reveal-blur", `${blur}px`);
    w.style.setProperty("--reveal-y", `${y}px`);
    w.style.transitionDuration = `${duration}ms`;
    wordCount++;
    return w;
  };

  const wrapTokens = (text) => {
    const parts = [];
    const units = [];
    text.split(/\s+/).filter(Boolean).forEach((word) => {
      (word.match(/[0-9A-Za-z.%+±~×\-]+|[\s\S]/gu) || []).forEach((u) =>
        units.push(u)
      );
    });
    const toks = [];
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      const next = units[i + 1];
      if (
        LATIN_RUN.test(u) &&
        u.length <= 3 &&
        next &&
        !LATIN_RUN.test(next)
      ) {
        toks.push(u + next);
        i++;
      } else {
        toks.push(u);
      }
    }
    toks.forEach((tk, ti) => {
      parts.push(makeWord(tk));
      if (ti < toks.length - 1) parts.push(document.createTextNode(" "));
    });
    return parts;
  };

  const fragment = document.createDocumentFragment();
  el._revealNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTokens(node.nodeValue).forEach((n) => fragment.appendChild(n));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      if (tag === "br") {
        fragment.appendChild(document.createElement("br"));
        return;
      }
      const clone = node.cloneNode(false);
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          wrapTokens(child.nodeValue).forEach((n) => clone.appendChild(n));
        } else {
          clone.appendChild(child.cloneNode(true));
        }
      });
      fragment.appendChild(clone);
    }
  });

  el.innerHTML = "";
  el.appendChild(fragment);
  el.setAttribute("data-reveal-ready", "");
};
