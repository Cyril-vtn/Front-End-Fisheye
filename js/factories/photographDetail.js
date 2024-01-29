function createPhotographDetail(photographers, media) {
  // Selecting the header and media sections from the DOM.
  const headerDetailSection = document.querySelector(".photograph__header");
  const mediaSectionContainer = document.querySelector(".photograph__media");

  // Parsing the URL to get the id parameter.
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get("id");
  const idValue = parseInt(idItem);

  // Finding the photographer with the matching id.
  const photographer = photographers.find(
    (photographer) => photographer.id === idValue
  );
  const photographName = photographer.name;

  // Function to populate the header section with photographer details.
  function getPhotographDetails() {
    for (let i = 0; i < photographers.length; i++) {
      if (photographers[i].id === idValue) {
        const photographersData = photographers[i];
        const header = `
          <div class="header__basic">
            <h1>${photographersData.name}</h1>
            <div class="header__location">
              <h3>${photographersData.city}, ${photographersData.country} </h3>
            </div>
            <p class="header__tagline">${photographersData.tagline}</p>
          </div>
          <div role="button" tabindex="0" class="photograph__contact__form" onkeypress=handleModal() onclick=handleModal()>
            Contactez-moi
          </div>
          <div class="header__img">
            <img src="assets/Photographers ID Photos/${photographersData.portrait}" alt=${photographersData.name} />
          </div>
        `;

        headerDetailSection.innerHTML = header;
      }
    }
  }

  // Function to populate the media section with photographer's media.
  function getPhotographMedia() {
    media
      .sort((a, b) => b.likes - a.likes)
      .forEach((mediaItem) => {
        // If the media item belongs to the photographer and is an image.
        if (mediaItem.photographerId === idValue && mediaItem.image) {
          const mediaTemplateItem = createMediaBuilder(
            mediaItem,
            photographName
          );
          const imageCard = mediaTemplateItem.getImageCard();
          mediaSectionContainer.appendChild(imageCard);
          // If the media item belongs to the photographer and is a video.
        } else if (mediaItem.photographerId === idValue && mediaItem.video) {
          const mediaTemplateItem = createMediaBuilder(
            mediaItem,
            photographName
          );
          const videoCard = mediaTemplateItem.getVideoCard();
          mediaSectionContainer.appendChild(videoCard);
        }
      });
  }

  return {
    getPhotographDetails,
    getPhotographMedia,
  };
}
