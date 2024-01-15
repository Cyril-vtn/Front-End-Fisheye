function createExtraInfo(photographer, media) {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get('id');
  const idValue = parseInt(idItem);

  function getTotalLikes() {
    const counter = document.querySelector('.counter__bg');
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes__tag');
    counter.appendChild(likesContainer);

    let filteredMedia = media.filter((element) => element.photographerId === idValue);

    let total = filteredMedia.reduce(function (acc, curr) {
      return acc + curr.likes;
    }, 0);

    const totalLikes = `
    <p id="sum" class ="sum__likes">${total} </p> <i class="fas fa-heart"></i>
    `;

    likesContainer.innerHTML = totalLikes;
    return likesContainer;
  }

  function getPrice() {
    const counter = document.querySelector('.counter__bg');
    const price = document.createElement('div');
    price.classList.add('price__tag');
    counter.appendChild(price);

    let priceTag;

    photographer.forEach((elt) => {
      if (elt.id === idValue) {
        priceTag = elt.price;
      }
    });

    const priceInfo = `<p>${priceTag}€ / Jour</p>`;
    price.innerHTML = priceInfo;
  }

  return {
    getTotalLikes,
    getPrice
  };
}