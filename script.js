const openButton = document.getElementById("openButton");
const stage = document.getElementById("envelopeStage");
const invitation = document.getElementById("invitation");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeToggle = document.getElementById("themeToggle");
let savedTheme;
try {
  savedTheme = localStorage.getItem("engagement-theme");
} catch {
  savedTheme = null;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن");
}

applyTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light");
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  savedTheme = next;
  applyTheme(next);
  try {
    localStorage.setItem("engagement-theme", next);
  } catch {
    // The selected theme still works for this visit.
  }
});
document.documentElement.classList.add("js");

let scrollFrame = 0;
function updateScrollEffects() {
  scrollFrame = 0;
  if (reduceMotion.matches) return;
  const distance = Math.max(1, invitation.scrollHeight - invitation.clientHeight);
  const progress = Math.min(1, invitation.scrollTop / distance);
  invitation.style.setProperty("--flower-scroll", `${Math.round(progress * 24)}px`);
}
invitation.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
}, { passive: true });

function burstHearts() {
  if (reduceMotion.matches) return;
  for (let i = 0; i < 20; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-pop";
    heart.textContent = ["❀", "✿", "❀", "✿"][i % 4];
    heart.style.left = `${48 + Math.random() * 4}%`;
    heart.style.top = `${42 + Math.random() * 12}%`;
    heart.style.setProperty("--dx", `${Math.round((Math.random() - .5) * 360)}px`);
    heart.style.setProperty("--dy", `${Math.round(-55 - Math.random() * 240)}px`);
    heart.style.setProperty("--rot", `${Math.round((Math.random() - .5) * 100)}deg`);
    stage.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

function celebratePaper() {
  if (reduceMotion.matches) return;
  const symbols = ["❀", "✿", "❀", "✿"];
  for (let i = 0; i < 23; i += 1) {
    const piece = document.createElement("span");
    piece.className = "paper-confetti";
    piece.setAttribute("aria-hidden", "true");
    piece.textContent = symbols[i % symbols.length];
    piece.style.setProperty("--x", `${Math.round(Math.random() * 100)}vw`);
    piece.style.setProperty("--c", i % 2 ? "#bf7c8a" : "#b9a16f");
    piece.style.setProperty("--size", `${15 + Math.round(Math.random() * 15)}px`);
    piece.style.setProperty("--drift", `${Math.round((Math.random() - .5) * 200)}px`);
    piece.style.setProperty("--spin", `${Math.round((Math.random() - .5) * 720)}deg`);
    piece.style.setProperty("--dur", `${2.8 + Math.random() * 2}s`);
    piece.style.setProperty("--delay", `${Math.random() * .65}s`);
    invitation.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function openEnvelope(event) {
  if (stage.classList.contains("is-open")) return;
  event.preventDefault();
  stage.classList.add("is-open");
  openButton.setAttribute("aria-expanded", "true");
  burstHearts();
  setTimeout(() => {
    document.documentElement.classList.add("is-opened");
    invitation.scrollTop = 0;
    celebratePaper();
    document.getElementById("invitation-title").focus({ preventScroll: true });
  }, reduceMotion.matches ? 0 : 900);
}

stage.addEventListener("click", openEnvelope);
