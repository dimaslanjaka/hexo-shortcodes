export default function initToc() {
  // Table of content click event
  // Select all TOC links
  const tocLinks = document.querySelectorAll(".toc a");
  tocLinks.forEach((link) => {
    link.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault(); // Prevent default anchor click behavior

      // Get the target section ID from the link's href attribute
      const targetId = this.getAttribute("href");

      // First, try to find the exact match
      let targetElement = document.getElementById(targetId!.replace(/#/g, "")); // Remove '#' from the targetId

      // If not found, check for case-insensitive matches
      if (!targetElement) {
        const allElements = document.querySelectorAll<HTMLElement>("[id]");
        targetElement =
          Array.from(allElements).find(
            (element) => element.id.toLowerCase() === targetId!.replace(/#/g, "").toLowerCase()
          ) || null; // Ensure targetElement is null if not found
      }

      // If the target element exists, scroll to it
      if (targetElement instanceof HTMLElement) {
        targetElement.scrollIntoView({
          behavior: "smooth", // Smooth scroll
          block: "start" // Align to the start of the viewport
        });
      }
    });
  });
}
