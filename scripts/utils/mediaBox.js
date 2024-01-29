// Function to open the lightbox with the selected media.
function lightBoxOpen(id, title) {
  // Selecting the lightbox and media container from the DOM.
  const lightBoxSection = document.querySelector(".lightbox");
  const mediaWrapper = document.querySelector(".lightbox__container");
  // Selecting the media with the provided id.
  const media = document.getElementById(id);

  // Making the lightbox visible.
  lightBoxSection.style.display = "block";

  // Constructing the HTML for the lightbox.
  const lightBoxDetails = `
    <button class="lightbox__closed" aria-label="Close dialog" onclick="lightBoxClosed()">x</button>
    <div class="nav-btn-container">
      <button class="lightbox__prev" aria-label="Previous image" aria-label="previous">❮</button>
      <button class="lightbox__next" aria-label="Next image" aria-label="next">❯</button>
    </div>
    <div id="lightbox__media" class="lightbox__media" aria-label="${title}" tabindex="0"></div>
    <h3 class="lightbox__title">${title} </h3>
  `;

  mediaWrapper.innerHTML = lightBoxDetails;
  lightBoxSection.appendChild(mediaWrapper);

  // Selecting the media area from the DOM.
  const mediaArea = document.getElementById("lightbox__media");
  // Getting the source of the media and determining its type.
  const mediaSrc = media.children[0].src;
  const mediaType = mediaSrc.endsWith("jpg") ? "img" : "video";

  // If the media is an image, insert an img tag into the media area.
  if (mediaType === "img") {
    const imageExt = `
      <img class="lightboxMedia" tabindex="0" src="${mediaSrc}" alt="${title}"/>
    `;
    mediaArea.innerHTML = imageExt;
    // If the media is a video, insert a video tag into the media area.
  } else {
    const videoExt = `
      <video class="lightboxMedia" tabindex="0" controls title="${title}">
        <source src=${mediaSrc} type="video/mp4" />
      </video>
    `;
    mediaArea.innerHTML = videoExt;
  }

  // Selecting all media elements, the lightbox, and the navigation buttons from the DOM.
  const mediaElts = document.querySelectorAll("[id*='media-']");
  const lightBox = document.getElementById("lightbox__media");
  const slideId = document.getElementById(id);
  const next = document.querySelector(".lightbox__next");
  const prev = document.querySelector(".lightbox__prev");
  const mediaTitle = document.querySelector(".lightbox__title");

  // Determining the index of the current media.
  let currentValue = Array.from(mediaElts).indexOf(slideId);

  function nextMedia() {
    currentValue = (currentValue + 1) % mediaElts.length;
    updateMedia();
  }

  function prevMedia() {
    currentValue = (currentValue - 1 + mediaElts.length) % mediaElts.length;
    updateMedia();
  }

  // Function to update the media displayed in the lightbox.
  function updateMedia() {
    const mediaEl = mediaElts[currentValue];
    const mediaSrc = mediaEl.children[0].src;
    const mediaType = mediaSrc.endsWith("jpg") ? "img" : "video";

    if (mediaType === "img") {
      const imgSrc = mediaEl.children[0].src;
      const titleData = mediaEl.children[1].textContent;

      const imgData = `
        <img src=${imgSrc} class="lightboxMedia" tabindex="0" alt="${title}" />
      `;

      lightBox.innerHTML = imgData;
      mediaTitle.textContent = titleData;
    } else {
      const vidSrc = mediaEl.children[0].src;
      const titleData = mediaEl.children[0].textContent;

      const videoData = `
        <video src=${vidSrc} class="lightboxMedia" tabindex="0" controls title="${title}" />
      `;

      lightBox.innerHTML = videoData;
      mediaTitle.textContent = titleData;
    }
  }

  next.addEventListener("click", nextMedia);
  prev.addEventListener("click", prevMedia);

  // Adding a keydown event listener to the document for keyboard navigation.
  document.onkeydown = function (e) {
    switch (e.key) {
      case "Right":
      case "ArrowRight":
        nextMedia();
        break;
      case "Left":
      case "ArrowLeft":
        prevMedia();
        break;
      case "Esc":
      case "Escape":
        lightBoxClosed();
        break;
    }
  };

  mediaTitle.textContent = title;
  document.querySelector(".lightbox__closed").focus();
}

function lightBoxClosed() {
  let lightboxSection = document.querySelector(".lightbox");
  lightboxSection.style.display = "none";
}
