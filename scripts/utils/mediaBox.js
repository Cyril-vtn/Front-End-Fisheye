function lightBoxOpen(id, title) {
  const lightBoxSection = document.querySelector('.lightbox');
  const mediaWrapper = document.querySelector('.lightbox__container');
  const media = document.getElementById(id);

  lightBoxSection.style.display = 'block';

  const lightBoxDetails = `
    <button class="lightbox__closed" onclick="lightBoxClosed()">x</button>
    <div class="nav-btn-container">
      <button class="lightbox__prev" aria-label="previous">❮</button>
      <button class="lightbox__next" aria-label="next">❯</button>
    </div>
    <div id="lightbox__media" class="lightbox__media" tabindex="0"></div>
    <h3 class="lightbox__title">${title} </h3>
  `;

  mediaWrapper.innerHTML = lightBoxDetails;
  lightBoxSection.appendChild(mediaWrapper);

  const mediaArea = document.getElementById('lightbox__media');
  const mediaSrc = media.children[0].src;
  const mediaType = mediaSrc.endsWith('jpg') ? 'img' : 'video';

  if (mediaType === 'img') {
    const imageExt = `
      <img class="lightboxMedia" tabindex="0" src="${mediaSrc}" />
    `;
    mediaArea.innerHTML = imageExt;
  } else {
    const videoExt = `
      <video class="lightboxMedia" tabindex="0" controls>
        <source src=${mediaSrc} type="video/mp4" />
      </video>
    `;
    mediaArea.innerHTML = videoExt;
  }

  const mediaElts = document.querySelectorAll("[id*='media-']");
  const lightBox = document.getElementById('lightbox__media');
  const slideId = document.getElementById(id);
  const next = document.querySelector('.lightbox__next');
  const prev = document.querySelector('.lightbox__prev');
  const mediaTitle = document.querySelector('.lightbox__title');

  let currentValue = Array.from(mediaElts).indexOf(slideId);

  function nextMedia() {
    currentValue = (currentValue + 1) % mediaElts.length;
    updateMedia();
  }

  function prevMedia() {
    currentValue = (currentValue - 1 + mediaElts.length) % mediaElts.length;
    updateMedia();
  }

  function updateMedia() {
    const mediaEl = mediaElts[currentValue];
    const mediaSrc = mediaEl.children[0].src;
    const mediaType = mediaSrc.endsWith('jpg') ? 'img' : 'video';

    if (mediaType === 'img') {
      const imgSrc = mediaEl.children[0].src;
      const titleData = mediaEl.children[1].textContent;

      const imgData = `
        <img src=${imgSrc} class="lightboxMedia" tabindex="0" />
      `;

      lightBox.innerHTML = imgData;
      mediaTitle.textContent = titleData;
    } else {
      const vidSrc = mediaEl.children[0].src;
      const titleData = mediaEl.children[1].textContent;

      const videoData = `
        <video src=${vidSrc} class="lightboxMedia" tabindex="0" controls />
      `;

      lightBox.innerHTML = videoData;
      mediaTitle.textContent = titleData;
    }
  }

  next.addEventListener('click', nextMedia);
  prev.addEventListener('click', prevMedia);

  document.onkeydown = function(e) {
    switch (e.key) {
      case 'Right':
      case 'ArrowRight':
        nextMedia();
        break;
      case 'Left':
      case 'ArrowLeft':
        prevMedia();
        break;
      case 'Esc':
      case 'Escape':
        lightBoxClosed();
        break;
    }
  };

  mediaTitle.textContent = title;
  document.querySelector('.lightboxMedia').focus();
}

function lightBoxOnPress(id, title) {
  const navigationMedia = document.getElementById(id);
  const lightBoxSection = document.querySelector('.lightbox');
  const mediaWrapper = document.querySelector('.lightbox__container');
  let media = navigationMedia;

  lightBoxSection.style.display = 'block';

  const lightBoxDetails = `
    <button class="lightbox__closed" onclick="lightBoxClosed()">x</button>
    <div class="nav-btn-container">
      <button class="lightbox__prev" aria-controls="media_items">❮</button>
      <button class="lightbox__next" aria-controls="media_items">❯</button>
    </div>
    <div id="lightbox__media" class="lightbox__media"></div>
    <h3 class="lightbox__title">${title} </h3>
  `;

  mediaWrapper.innerHTML = lightBoxDetails;
  lightBoxSection.appendChild(mediaWrapper);

  const mediaArea = document.getElementById('lightbox__media');
  const mediaSrc = media.src;
  const mediaType = mediaSrc.endsWith('jpg') ? 'img' : 'video';

  if (mediaType === 'img') {
    const imageExt = `
      <img class="lightboxMedia" tabindex="0" src="${mediaSrc}" />
    `;
    mediaArea.innerHTML = imageExt;
  } else {
    const videoExt = `
      <video class="lightboxMedia" tabindex="0" controls>
        <source src=${mediaSrc} type="video/mp4" />
      </video>
    `;
    mediaArea.innerHTML = videoExt;
  }

  const mediaElts = document.querySelectorAll("[id*='focus-']");
  const lightBox = document.getElementById('lightbox__media');
  const slideId = document.getElementById(id);
  const next = document.querySelector('.lightbox__next');
  const prev = document.querySelector('.lightbox__prev');
  const mediaTitle = document.querySelector('.lightbox__title');

  let currentValue = Array.from(mediaElts).indexOf(slideId);

  function nextMedia() {
    currentValue = (currentValue + 1) % mediaElts.length;
    updateMedia();
  }

  function prevMedia() {
    currentValue = (currentValue - 1 + mediaElts.length) % mediaElts.length;
    updateMedia();
  }

  function updateMedia() {
    const mediaEl = mediaElts[currentValue];
    const mediaSrc = mediaEl.src;
    const mediaType = mediaSrc.endsWith('jpg') ? 'img' : 'video';

    if (mediaType === 'img') {
      const imgSrc = mediaEl.src;
      const titleData = mediaEl.alt;

      const imgData = `
        <img src=${imgSrc} class="lightboxMedia" tabindex="0" />
      `;

      lightBox.innerHTML = imgData;
      mediaTitle.textContent = titleData;
    } else {
      const vidSrc = mediaEl.src;
      const titleData = mediaEl.alt;

      const videoData = `
        <video src=${vidSrc} class="lightboxMedia" tabindex="0" controls />
      `;

      lightBox.innerHTML = videoData;
      mediaTitle.textContent = titleData;
    }
  }

  next.addEventListener('click', nextMedia);
  prev.addEventListener('click', prevMedia);

  document.onkeydown = function(e) {
    switch (e.key) {
      case 'Right':
      case 'ArrowRight':
        nextMedia();
        break;
      case 'Left':
      case 'ArrowLeft':
        prevMedia();
        break;
      case 'Esc':
      case 'Escape':
        lightBoxClosed();
        break;
    }
  };

  mediaTitle.textContent = title;
  document.querySelector('.lightboxMedia').focus();
}

function lightBoxClosed() {
  let lightboxSection = document.querySelector('.lightbox');
  lightboxSection.style.display = 'none';
}