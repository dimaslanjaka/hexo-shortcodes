import { initClickable } from "./clickable";
import initDisqus from "./disqus";
import { highlightMain, initClipBoard } from "./highlight";
import initKatex from "./katex";
import initloader from "./loader";
import initMedia from "./media";
import initNavigationMenu, { initSearch } from "./nav";
import initToc from "./toc";

document.addEventListener("DOMContentLoaded", () => {
  initNavigationMenu();
  initMedia();
  initToc();
  initClickable();
  highlightMain();
  initClipBoard();
  initSearch();
  initKatex();
  initDisqus();
});

window.addEventListener("load", function () {
  // fix: loader not hidden after page load
  initloader();
});
