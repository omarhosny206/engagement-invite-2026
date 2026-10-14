const openButton = document.getElementById("openButton");
const stage = document.getElementById("envelopeStage");
const invitation = document.getElementById("invitation");
const shareButton = document.getElementById("shareButton");
const toast = document.getElementById("toast");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function burstHearts() {
  if (reduceMotion.matches) return;
  for (let i = 0; i < 13; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-pop";
    heart.textContent = i % 3 === 0 ? "✦" : "♥";
    heart.style.left = `${48 + Math.random() * 4}%`;
    heart.style.top = `${38 + Math.random() * 12}%`;
    heart.style.setProperty("--dx", `${Math.round((Math.random() - .5) * 280)}px`);
    heart.style.setProperty("--dy", `${Math.round(-55 - Math.random() * 180)}px`);
    heart.style.setProperty("--rot", `${Math.round((Math.random() - .5) * 100)}deg`);
    stage.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

openButton.addEventListener("click", () => {
  if (stage.classList.contains("is-open")) return;
  stage.classList.add("is-open");
  openButton.setAttribute("aria-expanded", "true");
  burstHearts();
  setTimeout(() => invitation.scrollIntoView({ behavior: reduceMotion.matches ? "instant" : "smooth" }), reduceMotion.matches ? 0 : 950);
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: "دعوة خطوبة عمر وسماء",
    text: "عمر وسماء اتخطبوا! شاركونا فرحتنا يوم ٣٠ أكتوبر ٢٠٢٦ الساعة ٦ مساءً في Katameya Gardens Club ♥",
    url: window.location.href.split("#")[0]
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(shareData.url);
    showToast("لينك الدعوة اتنسخ! ابعتوه للي بتحبوهم ♥");
  } catch {
    showToast("انسخوا لينك الصفحة من شريط العنوان وشاركوه ♥");
  }
});
