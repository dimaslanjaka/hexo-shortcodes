import hljs from "highlight.js";

if (typeof window !== "undefined") {
  window.hljs = hljs;
}

export const isIe =
  navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1;

/**
 * fallback when `navigator.clipboard` not found
 * @param text
 */
function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export async function copyTextToClipboard(textToCopy: string, e?: Event) {
  try {
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(textToCopy);
    }
    await navigator.clipboard.writeText(textToCopy);
    if (isIe && window.clipboardData) {
      window.clipboardData.setData("Text", textToCopy);
    } else if (e && e.clipboardData) {
      e.clipboardData.setData("text/plain", textToCopy);
    }
  } catch (error) {
    console.error("failed to copy to clipboard", error);
  }
}

/**
 * generate random string
 * @param len length
 * @returns
 */
export const randomStr = (len = 8) =>
  Math.random()
    .toString(36)
    .substring(2, len + 2);

export interface LoadJSOpt {
  proxy?: boolean;
  async?: boolean;
  defer?: boolean;
  onload?: GlobalEventHandlers["onload"] | null;
  onerror?: GlobalEventHandlers["onerror"] | null;
  crossOrigin?: string;
}
/**
 * No Operations
 * @param _
 */
export const noop = (...args: any[]) => {
  if (args.length > 0) {
    args.forEach((item) => {
      console.error(item);
    });
  }
};
/**
 * load js with prevent duplicated ability
 * @param url
 * @param onload
 * @example
 * React.useEffect(() -> { loadJS('//host/path/file.js') });
 * // or in class React.Component
 * componentDidMount() { loadJS('//host/path/file.js') }
 */
export function loadJS(url: string, props?: LoadJSOpt) {
  props = Object.assign(
    {
      proxy: false,
      onload: noop,
      onerror: noop
    },
    props || {}
  );

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    // fix dynamic protocol source
    if (url.startsWith("//")) url = window.location.protocol + url;
    if (props) {
      const onload = props.onload || noop;
      const onerror = props.onerror || noop;
      // proxying when enabled
      if (url.startsWith("http") && props.proxy) url = "https://crossorigin.me/" + url;
      // skip duplicate
      const existingSources = Array.from(document.scripts)
        .map((el) => stripProtocol(el.src))
        .filter((source) => source === stripProtocol(url));
      if (existingSources.length > 0) return resolve(onload.call(null));
      if (document.querySelector(`script[src="${url}"]`)) return resolve(onload.call(null));
      script.src = url.replace(/(^\w+:|^)/, window.location.protocol);
      script.async = props.async || false;
      script.defer = props.defer || false;
      script.crossOrigin = props.crossOrigin || "anonymous";
      script.onload = () => resolve(onload.call(null));
      script.onerror = (err) => reject(onerror.call(null) || err);
      document.body.appendChild(script);
    }
  });
}

/**
 * remove protocol (https?) from url
 * @param url
 * @returns
 */
export function stripProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "");
}

// start highlight pre code
function startHighlighter(preCode: HTMLElement) {
  // validate hljs for browser
  // if ('hljs' in window === false) return loadHljs();
  // validate hljs for react
  if ("highlightAll" in hljs === false) return loadHljs();
  // deterimine <code /> tag
  let code: HTMLPreElement | HTMLElement | null | undefined = preCode;
  // skip already parsed
  if (code.hasAttribute("highlighted")) return;
  if (preCode.tagName.toLowerCase() === "pre" && code) {
    const dh = preCode.getAttribute("data-highlight");
    // ignore on data-highlight=false
    if (dh && dh == "false") return;
    // select inner <code /> from <pre /> tag
    code = preCode.querySelector("code");
    if (!code) {
      // create <code /> tag on single <pre /> tag
      const newC = document.createElement("code");
      newC.innerHTML = preCode.innerHTML;
      preCode.innerHTML = "";
      preCode.appendChild(newC);
      // re-assign new created <code />
      code = preCode.querySelector("code");
    }
  }
  if (!code) {
    console.log("pre code is null");
    console.log(preCode);
    return;
  }
  // add new id
  if (!code.id) code.id = "code-" + randomStr(4);
  // fix mysql highlight
  if (code.classList.contains("language-mysql")) {
    code.classList.remove("language-mysql");
    code.classList.add("language-sql");
  }
  // const uniqueId = `id=${code.id} class=${code.className}`;
  // console.info(`apply syntax highlighter on ${uniqueId}`);
  code.parentElement?.setAttribute("highlighted", "true");
  // start highlight pre code[data-highlight]
  if (code.hasAttribute("data-highlight")) {
    if (code.getAttribute("data-highlight") != "false") {
      // highlight on data-highlight="true"
      highlightElement(code);
      // console.log('highlighting', code.id);
    }
  } else {
    // highlight no attribute data-highlight
    // enable highlighting by default
    highlightElement(code);
  }
}

function highlightElement(code: HTMLElement) {
  // only execute highlight on non-highlighted element
  if (!code.hasAttribute("highlighted")) {
    code.setAttribute("highlighted", "true");
    if (hljs.highlightElement) {
      hljs.highlightElement(code);
    } else {
      hljs.highlightBlock(code);
    }
  }
}

let loadedHljs = false;

/**
 * load Highlight.js
 * @returns
 */
function loadHljs() {
  if (loadedHljs) return;
  loadedHljs = true;
  console.log("highlight.js used not in react");
  // validate hljs already imported
  if ("hljs" in window === true) return;
  // otherwise create one
  loadJS("//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js", { onload: initHljs });
}

export function initHljs() {
  // highlight pre code
  document.querySelectorAll("pre").forEach(startHighlighter);

  // highlight all pre code elements
  // when use below syntax, please remove above syntax
  /*
  if ("initHighlightingOnLoad" in hljs) {
    hljs.initHighlightingOnLoad();
  } else if ("highlightAll" in hljs) {
    hljs.highlightAll();
  }
  */
}

/**
 * init copy to clipboard button on pre-code
 * @returns
 */
export function initClipBoard() {
  Array.from(document.querySelectorAll("pre")).forEach(function (codeBlock) {
    if (!codeBlock.getAttribute("id")) {
      codeBlock.setAttribute("id", randomStr(4));
    }

    let button = codeBlock.querySelector(".copy-code-button") as HTMLButtonElement;
    let append = false;
    if (!button) {
      // create one when copy button not found
      append = true;
      button = document.createElement("button");
      button.className = "copy-code-button";
      button.type = "button";
      const s = codeBlock.innerText;
      button.setAttribute("data-clipboard-text", s);
      button.setAttribute("title", "Copy code block");
      const span = document.createElement("span");
      span.innerText = "Copy";
      button.appendChild(span);
    }

    button.onclick = function (e) {
      const id = codeBlock.getAttribute("id");
      if (id) {
        const el = document.getElementById(id);

        if (el) {
          const text = el.textContent;
          if (text) {
            copyTextToClipboard(text.replace(/(Copy|Copied)$/gm, ""), e)
              .then(() => {
                (e.target as Element).textContent = "Copied";
              })
              .finally(() => {
                window.setTimeout(function () {
                  (e.target as Element).textContent = "Copy";
                }, 2000);
              })
              .catch(console.error);
          }
        }
      }
    };

    if (append) codeBlock.appendChild(button);
  });
}

/** main */

export function highlightMain() {
  console.log("init highlight.js");
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState !== "loading") {
      // fix react
      document.addEventListener("scroll", initHljs);
    } else {
      document.addEventListener("DOMContentLoaded", initHljs);
    }
  }
}
