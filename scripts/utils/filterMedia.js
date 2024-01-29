// Function to create filter for media
async function createFilter(media) {
  // Select the media container and get the URL parameters
  const mediaContainer = document.querySelector(".photograph__media");
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get("id");
  const idValue = parseInt(idItem);

  // Fetch media data and find the current photographer
  const { photographers } = await getMedia();
  const photographer = photographers.find(
    (photographer) => photographer.id === idValue
  );
  const photographName = photographer.name;

  // Filter media by photographer ID
  const mediaId = media.filter((item) => item.photographerId === idValue);

  // Function to create a media card
  function createMediaCard(res) {
    const filteredMedia = new createMediaBuilder(res, photographName);
    const filteredCard = res.image
      ? filteredMedia.getImageCard()
      : filteredMedia.getVideoCard();
    mediaContainer.appendChild(filteredCard);
  }

  // Function to filter media by date
  function filterByDate() {
    clearMedia();
    const result = mediaId.sort((a, b) => new Date(b.date) - new Date(a.date));
    result.forEach(createMediaCard);
  }

  // Function to filter media by popularity (likes)
  function filterByPopularity() {
    clearMedia();
    const result = mediaId.sort((a, b) => b.likes - a.likes);
    result.forEach(createMediaCard);
  }

  // Function to filter media by title
  function filterByTitle() {
    clearMedia();
    const result = mediaId.sort(function (a, b) {
      let stringA = a.title.toUpperCase();
      let stringB = b.title.toUpperCase();
      return stringA < stringB ? -1 : stringA > stringB ? 1 : 0;
    });
    result.forEach(createMediaCard);
  }

  // Function to handle filter changes
  function onChangeFilter() {
    const filterWrapper = document.querySelector(".custom__options");
    filterWrapper.addEventListener("click", (e) => {
      switch (e.target.id) {
        case "date":
          filterByDate();
          break;
        case "likes":
          filterByPopularity();
          break;
        case "title":
          filterByTitle();
          break;
      }
    });

    // Also handle filter changes on keypress
    filterWrapper.addEventListener("keypress", (e) => {
      switch (e.target.id) {
        case "date":
          filterByDate();
          break;
        case "likes":
          filterByPopularity();
          break;
        case "title":
          filterByTitle();
          break;
      }
    });
  }

  // Function to clear the media container
  function clearMedia() {
    mediaContainer.innerHTML = "";
  }

  // Return the filter functions
  return {
    filterByDate,
    filterByPopularity,
    filterByTitle,
    onChangeFilter,
    clearMedia,
  };
}
