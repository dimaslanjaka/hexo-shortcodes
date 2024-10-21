export function initClickable() {
  const elements = Array.from(document.querySelectorAll('[data-clickable="true"]'));
  elements.forEach((el) => {
    if (el.hasAttribute("data-href")) {
      el.addEventListener("click", (_e) => {
        window.location.href = el.getAttribute("data-href");
      });
    }
  });
}
