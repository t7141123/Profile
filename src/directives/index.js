const spotlight = {
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
};

const ripple = {
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
};

const tilt = {
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
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg) translateY(${-lift}px)`;
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
};

export default { spotlight, ripple, tilt };
