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
  reveal: {
    mounted(el, binding) {
      if (el._revealInit) return;
      el._revealInit = true;

      const opts = binding.value || {};
      const stagger = opts.stagger ?? 60;
      const blur = opts.blur ?? 6;
      const y = opts.y ?? 10;
      const duration = opts.duration ?? 700;
      const once = opts.once ?? true;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        el.setAttribute("data-reveal-ready", "");
        return;
      }

      const original = el.innerHTML;
      const tmp = document.createElement("div");
      tmp.innerHTML = original;

      const wrapWord = (node, parentTag, word) => {
        const span = document.createElement(parentTag);
        span.className = "reveal-word";
        span.textContent = word;
        return span;
      };

      const fragment = document.createDocumentFragment();
      let wordCount = 0;
      tmp.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const tokens = text.split(/(\s+)/);
          tokens.forEach((tok) => {
            if (/^\s+$/.test(tok)) {
              fragment.appendChild(document.createTextNode(tok));
            } else if (tok.length) {
              const w = document.createElement("span");
              w.className = "reveal-word";
              w.textContent = tok;
              w.style.transitionDelay = `${wordCount * stagger}ms`;
              w.style.setProperty("--reveal-blur", `${blur}px`);
              w.style.setProperty("--reveal-y", `${y}px`);
              w.style.transitionDuration = `${duration}ms`;
              fragment.appendChild(w);
              wordCount++;
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName.toLowerCase();
          if (tag === "br") {
            fragment.appendChild(document.createElement("br"));
          } else {
            const clone = node.cloneNode(false);
            node.childNodes.forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                const tokens = text.split(/(\s+)/);
                tokens.forEach((tok) => {
                  if (/^\s+$/.test(tok)) {
                    clone.appendChild(document.createTextNode(tok));
                  } else if (tok.length) {
                    const w = document.createElement("span");
                    w.className = "reveal-word";
                    w.textContent = tok;
                    w.style.transitionDelay = `${wordCount * stagger}ms`;
                    w.style.setProperty("--reveal-blur", `${blur}px`);
                    w.style.setProperty("--reveal-y", `${y}px`);
                    w.style.transitionDuration = `${duration}ms`;
                    clone.appendChild(w);
                    wordCount++;
                  }
                });
              } else {
                clone.appendChild(child.cloneNode(true));
              }
            });
            fragment.appendChild(clone);
          }
        }
      });

      el.innerHTML = "";
      el.appendChild(fragment);
      el.setAttribute("data-reveal-ready", "");

      el._revealReveal = () => el.classList.add("is-revealed");
      el._revealHide = () => el.classList.remove("is-revealed");

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el._revealReveal();
              if (once) io.unobserve(el);
            } else if (!once) {
              el._revealHide();
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(el);
      el._revealIO = io;
    },
    unmounted(el) {
      if (el._revealIO) el._revealIO.disconnect();
    },
  },
};
