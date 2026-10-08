function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => el.classList.remove("show"), 2400);
}
function refreshIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}
function toggleMenu() {
  document.querySelector(".nav-links")?.classList.toggle("open");
}
function toggleSidebar() {
  document.querySelector(".sidebar")?.classList.toggle("open");
}
function openModal(title, body, action = "Simpan") {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.querySelector("[data-modal-title]").textContent = title;
  modal.querySelector("[data-modal-body]").innerHTML = body;
  modal.querySelector("[data-modal-action]").textContent = action;
  modal.classList.add("show");
  refreshIcons();
}
function closeModal() {
  document.getElementById("modal")?.classList.remove("show");
}
function demoAction(message = "Perubahan berhasil disimpan.") {
  toast(message);
}
function filterCards() {
  const q = (
    document.getElementById("searchPackage")?.value || ""
  ).toLowerCase();
  const type = document.getElementById("typeFilter")?.value || "all";
  document.querySelectorAll("[data-package]").forEach((card) => {
    const text = card.textContent.toLowerCase(),
      kind = card.dataset.package;
    card.style.display =
      text.includes(q) && (type === "all" || kind === type) ? "" : "none";
  });
}
function updateTotal() {
  const price = Number(document.getElementById("unitPrice")?.value || 0);
  const qty = Math.max(
    1,
    Number(document.getElementById("participant")?.value || 1),
  );
  const out = document.getElementById("totalPrice");
  if (out) out.textContent = (price * qty).toLocaleString("id-ID");
  const sum = document.getElementById("participantSummary");
  if (sum) sum.textContent = qty + " orang";
}
function submitDemoForm(e, message) {
  e.preventDefault();
  demoAction(message || "Data berhasil disimpan.");
  return false;
}
function confirmDemo(title, message) {
  openModal(
    title,
    `<p style="color:var(--muted);margin:10px 0 0">${message}</p>`,
    "Ya, Lanjutkan",
  );
  const btn = document.querySelector("[data-modal-action]");
  if (btn)
    btn.onclick = () => {
      closeModal();
      demoAction("Perubahan berhasil.");
    };
}
function setupHomeChoices() {
  const service = document.getElementById("homeService");
  service?.addEventListener("change", () => {
    if (service.value) window.location.href = service.value;
  });
  const destination = document.getElementById("homeDestination");
  destination?.addEventListener("change", () => {
    if (destination.value)
      window.location.href =
        "packages.html?destination=" + encodeURIComponent(destination.value);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("[data-demo]")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        demoAction(btn.dataset.demo || undefined),
      ),
    );
  document
    .querySelectorAll("[data-modal-close]")
    .forEach((b) => b.addEventListener("click", closeModal));
  document.getElementById("modal")?.addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
  document
    .getElementById("participant")
    ?.addEventListener("input", updateTotal);
  updateTotal();
  setupHomeChoices();
  refreshIcons();
});
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-gallery-filter]");
  if (!btn) return;
  document
    .querySelectorAll("[data-gallery-filter]")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.galleryFilter;
  document
    .querySelectorAll("[data-gallery]")
    .forEach(
      (card) =>
        (card.style.display =
          filter === "all" || card.dataset.gallery === filter ? "" : "none"),
    );
});
