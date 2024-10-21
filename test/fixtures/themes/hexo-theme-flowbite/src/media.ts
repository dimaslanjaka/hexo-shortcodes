import { Fancybox } from "@fancyapps/ui";

export function initFancybox() {
  const wrapper = document.querySelector<HTMLElement>(".post");
  if (wrapper) {
    document.querySelectorAll("img").forEach((el) => {
      if (!el.hasAttribute("data-caption")) {
        let caption = "";
        caption += el.getAttribute("title") || "";
        if (caption.trim().length > 0) caption += " - ";
        caption += el.getAttribute("alt") || "";
        el.setAttribute("data-caption", caption);
      }
      if (!el.hasAttribute("data-fancybox")) el.setAttribute("data-fancybox", "true");
    });
    Fancybox.bind(wrapper, "[data-fancybox=true]", {
      // Your custom options
    });

    // mansonry - \layout\macro\gallery-mansonry.njk
    // Select all buttons with the masonry-target attribute
    const buttons = document.querySelectorAll("[masonry-target]");

    // Loop through each button and add a click event listener
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        // Get the target ID from the masonry-target attribute
        const targetId = this.getAttribute("masonry-target");
        const image = document.getElementById(targetId);
        if (image) {
          // Get the src of the original image
          const imageSrc = image.getAttribute("src");

          // Show Fancybox with the image
          Fancybox.show([
            {
              src: imageSrc, // Use the copied src instead of inline
              type: "image" // Specify type as image
            }
          ]);
        }
      });
    });
  }
}

export function processGalleryTag() {
  const wrapper = document.querySelector<HTMLElement>(".post");
  if (wrapper) {
    const galleryItemsDivs = wrapper.querySelectorAll<HTMLDivElement>(".gallery-items");

    if (galleryItemsDivs.length > 0)
      galleryItemsDivs.forEach((galleryItemsDiv, index) => {
        const results = [] as HTMLElement[];

        try {
          galleryItemsDiv.classList.add("masonry-grid", "not-format");
          const jsonData = JSON.parse(galleryItemsDiv.textContent) as { url: string; caption: any; alt: any }[];

          jsonData.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "masonry-item relative overflow-hidden rounded-lg";
            const img = document.createElement("img");
            img.src = item.url;
            img.alt = item.alt || item.caption || "";
            img.className =
              "w-full h-full object-cover transition-transform transform hover:scale-105 duration-300 not-format";
            img.id = "masonry-img-" + index;

            itemDiv.appendChild(img);
            results.push(itemDiv);
          });
        } catch (e) {
          console.error("failed to create gallery", e);
        }

        galleryItemsDiv.innerHTML = ""; // Clear existing content
        if (results.length > 0) results.forEach((itemDiv) => galleryItemsDiv.appendChild(itemDiv));
      });
  }
}

export function fixMasonry() {
  const masonryGrid = document.querySelectorAll<HTMLDivElement>(".masonry-grid");
  masonryGrid.forEach((container) => {
    const total = container.children.length;
    for (let i = 1; i < total; i += 2) {
      const item = container.querySelector<HTMLElement>(`div:nth-child(${i})`);
      if (item) item.style.gridRowEnd = "span 2";
    }
  });
}

export default function initMedia() {
  processGalleryTag();
  initFancybox();
  fixMasonry();
}
