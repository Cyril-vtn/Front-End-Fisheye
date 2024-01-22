function createMediaBuilder(data, name) {
  const likes = data.likes;
  const title = data.title;
  const id = data.id;
  const image = data.image;
  const video = data.video;
  const alt = `${title}, closeup view”`;
  const photographerName = name.split(" ")[0];
  const photographerFirstName = photographerName.replace(/-/g, " ");
  function getImageCard() {
    const mediaTemplate = document.createElement("article");
    mediaTemplate.classList.add("media__container");

    const mediaSection = `
          <div  id="media-${id}" onclick="lightBoxOpen(id,'${title}')" class="media__box">
          <img tabindex="0" id="focus-${id}" onkeypress="lightBoxOnPress(id,'${title}')" class="focusable-media" src="assets/${photographerFirstName}/${image}" alt="${alt}" />
          <h3 class="media__title">${title}</h3>
          </div>
          <div class="media__pricing"> 	
          <h3>${title}</h3>
          <div id="${id}" class="likes__container">
          <p class="num__likes">${likes}</p> 
          <button onclick="incrementLikes(${likes},${id})" role="increment" aria-label="likes"> <i class="fas fa-heart"></i></button>
          </div>
          </div>
      `;

    mediaTemplate.innerHTML = mediaSection;
    return mediaTemplate;
  }

  function getVideoCard() {
    const mediaTemplate = document.createElement("article");
    mediaTemplate.classList.add("media__container");

    const mediaSection = `
          <div id="media-${id}" onclick="lightBoxOpen(id,'${title}')" class="media__box">
          <video tabindex="0" id="focus-${id}" onkeypress="lightBoxOnPress(id,'${title}')" src="assets/${photographerFirstName}/${video}" type="video/mp4" alt="${title}" class="focusable-media" />
          <h3 class="media__title">${title}</h3>
          </div>
          <div class="media__pricing"> 	
          <h3>${title}</h3>
          <div id="${id}" class="likes__container">
          <p class="num__likes">${likes}</p> 
          <button onclick="incrementLikes(${likes},${id})" role="increment" aria-label="likes"><i class="fas fa-heart"></i> </button>
          </div>
          </div>
      `;

    mediaTemplate.innerHTML = mediaSection;
    return mediaTemplate;
  }

  return {
    getImageCard,
    getVideoCard,
  };
}
