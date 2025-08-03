document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-box-container");

  if (galleryContainer) {
    fetch("../JSON/gallery.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load gallery.json");
        }
        return response.json();
      })
      .then(images => {
        images.forEach(image => {
          const box = document.createElement("div");
          box.className = "box";

          const imageWrapper = document.createElement("div");
          imageWrapper.className = "image";

          const img = document.createElement("img");
          img.src = image.src;
          img.alt = "Cruise Tour Gallery";

          imageWrapper.appendChild(img);
          box.appendChild(imageWrapper);
          galleryContainer.appendChild(box);
        });
      })
      .catch(error => {
        console.error("Error loading gallery images:", error);
      });
  }
});