function createLightBoxContent(id, title, mediaSrc, isImage) {
  const lightBoxSection = document.querySelector('.lightbox');
  const mediaWrapper = document.querySelector('.lightbox__container');

  lightBoxSection.style.display = 'block';

  const lightBoxDetails = `
  <button class="lightbox__closed" onclick="lightBoxClosed()">x</button>
  <div class="nav-btn-container">
  <button class="lightbox__prev" aria-label="previous">❮</button>
  <button class="lightbox__next" aria-label="next">❯</button>
  </div>
  <div id="lightbox__media" class="lightbox__media" tabindex="0">
  </div>
  <h3 class="lightbox__title">${title} </h3>
  `;

  mediaWrapper.innerHTML = lightBoxDetails;
  lightBoxSection.appendChild(mediaWrapper);

  let mediaArea = document.getElementById('lightbox__media');
  const mediaContent = isImage ? `
  <img class="lightboxMedia" tabindex="0" src="${mediaSrc}" />	
  ` : `
  <video class="lightboxMedia" tabindex="0"  controls >
  <source src=${mediaSrc} type="video/mp4" /> 
  </video>
  `;
  mediaArea.innerHTML = mediaContent;

  return mediaWrapper;
}

function lightBoxOpen(id, title) {
  const media = document.getElementById(id);
  const isImage = media.children[0].src.endsWith('jpg');
  const mediaSrc = media.children[0].src;

  const mediaWrapper = createLightBoxContent(id, title, mediaSrc, isImage);
  setupNavigation(id, "[id*='media-']", mediaWrapper);
}

function lightBoxOnPress(id, title) {
  const media = document.getElementById(id);
  const isImage = media.src.endsWith('jpg');
  const mediaSrc = media.src;

  const mediaWrapper = createLightBoxContent(id, title, mediaSrc, isImage);
  setupNavigation(id, "[id*='focus-']", mediaWrapper);
}

function setupNavigation(id, selector, mediaWrapper) {
  const mediaElts = document.querySelectorAll(selector);
  let lightBox = document.getElementById('lightbox__media');
  let slideId = document.getElementById(id);
  let next = document.querySelector('.lightbox__next');
  let prev = document.querySelector('.lightbox__prev');
  let mediaTitle = document.querySelector('.lightbox__title');

  for (let currentValue = 0; currentValue < mediaElts.length; currentValue++) {
    if (mediaElts[currentValue] === slideId) {
      next.addEventListener('click', () => navigateMedia(currentValue, mediaElts, lightBox, mediaTitle, 1));
      prev.addEventListener('click', () => navigateMedia(currentValue, mediaElts, lightBox, mediaTitle, -1));
      console.log(currentValue);
      document.onkeydown = function (e) {
        switch (e.key) {
          case 'Right':
          case 'ArrowRight':
            navigateMedia(currentValue, mediaElts, lightBox, mediaTitle, 1);
            break;
          case 'Left':
          case 'ArrowLeft':
            navigateMedia(currentValue, mediaElts, lightBox, mediaTitle, -1);
            break;
          case 'Esc':
          case 'Escape':
            lightBoxClosed();
            break;
        }
      };
    }
  }

  document.querySelector('.lightboxMedia').focus();
}

function navigateMedia(currentValue, mediaElts, lightBox, mediaTitle, direction) {
  lightBox.innerHTML = '';
  console.log(currentValue, direction, mediaElts.length);
  currentValue = (currentValue + direction + mediaElts.length) % mediaElts.length;
  const imgElement = mediaElts[currentValue].querySelector('img');
  const src = imgElement ? imgElement.src.replace("http://127.0.0.1:5500", "") : null;
  console.log(src);
  const isImage = src.endsWith('jpg');
  console.log(isImage);
  const mediaSrc = src;
  const titleData = isImage ? mediaElts[currentValue].alt : mediaElts[currentValue].textContent;

  const mediaContent = isImage ? `
  <img src=${mediaSrc} class="lightboxMedia" tabindex="0" />
  ` : `
  <video src=${mediaSrc} class="lightboxMedia" tabindex="0" controls />
  `;

  lightBox.innerHTML = mediaContent;
  mediaTitle.textContent = titleData;
}

function lightBoxClosed() {
  let lightboxSection = document.querySelector('.lightbox');
  lightboxSection.style.display = 'none';
}