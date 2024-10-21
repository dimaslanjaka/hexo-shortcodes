/**
 * loading animation remover.
 * this should run inside `window.addEventListener("load"` or in global scope
 */
export default function initloader() {
  const preloader = document.getElementById("preloader");
  const preloaderMini = document.getElementById("preloader-mini");
  if (preloader) preloader.style.display = "none";
  if (preloaderMini) preloaderMini.style.display = "none";
}
