export default function initKatex() {
  const hasKatexClass = document.body.querySelectorAll('[class^="katex-"]');

  if (hasKatexClass.length > 0) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css";
    document.head.appendChild(link);
  }
}
