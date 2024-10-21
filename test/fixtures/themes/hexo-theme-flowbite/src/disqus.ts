export default function initDisqus() {
  const disqusDiv = document.getElementById("disqus_thread");

  if (disqusDiv) {
    let dsLoaded = false;
    const top = disqusDiv.getBoundingClientRect().top + window.scrollY; // WHERE TO START LOADING
    const disqusData = disqusDiv.dataset; // Use the DOMStringMap directly

    const check = function () {
      if (!dsLoaded && window.scrollY + window.innerHeight > top) {
        dsLoaded = true;

        // Iterate over the entries in disqusData
        for (const key in disqusData) {
          if (key.startsWith("disqus")) {
            window["disqus_" + key.replace("disqus", "").toLowerCase()] = disqusData[key];
          }
        }

        const dsq = document.createElement("script");
        dsq.type = "text/javascript";
        dsq.async = true;
        dsq.src = "//" + window.disqus_shortname + ".disqus.com/embed.js";
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
      }
    };

    window.addEventListener("scroll", check);
    check();
  }
}
