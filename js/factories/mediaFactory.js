function createMediaBuilder(data, name) {
  const likes = data.likes;
  const title = data.title;
  const id = data.id;
  const image = data.image;
  const video = data.video;
  const alt = `${title}, closeup view”`;

  const photographerName = name.split(" ")[0];
  const photographerFirstName = photographerName.replace(/-/g, " ");

  // Returns an image card template.
  function getImageCard() {
    const mediaTemplate = document.createElement("article");
    mediaTemplate.classList.add("media__container");

    const mediaSection = `
          <div  tabindex="0" id="media-${id}" onclick="lightBoxOpen(id,'${title}')" onkeypress="lightBoxOpen(id,'${title}')" class="media__box">
          <img  id="focus-${id}"  class="focusable-media" src="assets/${photographerFirstName}/${image}" alt="${alt}" />
          <h3 class="media__title">${title}</h3>
          </div>
          <div class="media__pricing"> 	
          <h3>${title}</h3>
          <div id="${id}" class="likes__container" aria-label="likes">
          <p class="num__likes">${likes}</p> 
          <button onclick="incrementLikes(${likes},${id})" role="increment"> <i class="fas fa-heart"></i></button>
          </div>
          </div>
      `;

    mediaTemplate.innerHTML = mediaSection;
    return mediaTemplate;
  }

  // Returns a video card template.
  function getVideoCard() {
    const mediaTemplate = document.createElement("article");
    mediaTemplate.classList.add("media__container");

    const mediaSection = `
          <div id="media-${id}" onclick="lightBoxOpen(id,'${title}')" class="media__box">
          <video tabindex="0" id="focus-${id}" onkeypress="lightBoxOpen(id,'${title}')" src="assets/${photographerFirstName}/${video}" type="video/mp4" alt="${title}" class="focusable-media" />
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
