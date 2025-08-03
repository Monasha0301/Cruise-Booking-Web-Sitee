document.addEventListener("DOMContentLoaded", () => {
  setupLoginAndSignup();
  setupSearch();
  setupGallery();
  setupMenuToggle();
  setupBookingForm();
  setupVideoSlider();
});

// === VIDEO AUTOPLAY + MANUAL SWITCHING ===
  const btns = document.querySelectorAll(".vid-btn");
  const videoSlider = document.getElementById("video-slider");
  let currentIndex = 0;

  function playVideoSafely(videoElement) {
    if (!videoElement) return;
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Autoplay blocked or interrupted:", error.message);
      });
    }
  }

  // Initial video load
  if (btns.length > 0 && videoSlider) {
    const initialBtn = document.querySelector(".vid-btn.active") || btns[0];
    initialBtn.classList.add("active");
    videoSlider.src = initialBtn.getAttribute("data-src");
    videoSlider.load();
    playVideoSafely(videoSlider);
  }

  // Function to switch video
  function switchVideo(index) {
  if (!btns[index] || !videoSlider) return;

  const active = document.querySelector(".vid-btn.active");
  if (active) active.classList.remove("active");

  const newSrc = btns[index].getAttribute("data-src");
  videoSlider.src = newSrc;

  // Wait for the video to load before playing
  videoSlider.onloadeddata = () => {
    playVideoSafely(videoSlider);
  };

  videoSlider.load();
  btns[index].classList.add("active");
}


  // Manual switch on button click
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentIndex = i;
      switchVideo(i);
    });
  });

  // Auto-switch every 10 seconds
  if (btns.length > 0) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % btns.length;
      switchVideo(currentIndex);
    }, 10000);
  }

  const searchBtn = document.getElementById("search-btn");
  const searchBar = document.getElementById("search-bar-container");

  
  // === SEARCH BUTTON FUNCTIONALITY ===
  if (searchBtn && searchBar) {
    searchBtn.onclick = () => {
      searchBar.classList.toggle("active");
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const boxes = document.querySelectorAll(".services .box, .packages .box");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();

      boxes.forEach(box => {
        const text = box.innerText.toLowerCase();
        if (text.includes(filter)) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      });
    });
  }

  // Toggle search bar visibility
  const searchBtn = document.getElementById("search-btn");
  const searchBar = document.getElementById("search-bar-container");

  if (searchBtn && searchBar) {
    searchBtn.onclick = () => {
      searchBar.classList.toggle("active");
    };
  }
});
