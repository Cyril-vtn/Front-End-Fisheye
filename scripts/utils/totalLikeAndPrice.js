function createExtraInfo(photographer, media) {
  // Parsing the URL to get the id parameter.
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get("id");
  const idValue = parseInt(idItem);

  // Function to calculate and display the total likes for the photographer's media.
  function getTotalLikes() {
    // Selecting the counter section from the DOM and creating a container for the likes.
    const counter = document.querySelector(".counter__bg");
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes__tag");
    counter.appendChild(likesContainer);

    // Filtering the media to only include items from the current photographer.
    let filteredMedia = media.filter(
      (element) => element.photographerId === idValue
    );

    // Calculating the total likes.
    let total = filteredMedia.reduce(function (acc, curr) {
      return acc + curr.likes;
    }, 0);

    // Constructing the HTML for the total likes.
    const totalLikes = `
    <p id="sum" class ="sum__likes">${total} </p> <i class="fas fa-heart"></i>
    `;

    // Inserting the constructed HTML into the likes container.
    likesContainer.innerHTML = totalLikes;
    return likesContainer;
  }

  // Function to display the photographer's price.
  function getPrice() {
    // Selecting the counter section from the DOM and creating a container for the price.
    const counter = document.querySelector(".counter__bg");
    const price = document.createElement("div");
    price.classList.add("price__tag");
    counter.appendChild(price);

    let priceTag;

    // Finding the photographer's price.
    photographer.forEach((elt) => {
      if (elt.id === idValue) {
        priceTag = elt.price;
      }
    });

    // Constructing the HTML for the price.
    const priceInfo = `<p>${priceTag}€ / Jour</p>`;
    // Inserting the constructed HTML into the price container.
    price.innerHTML = priceInfo;
  }

  // Returning the functions to get the total likes and price.
  return {
    getTotalLikes,
    getPrice,
  };
}
