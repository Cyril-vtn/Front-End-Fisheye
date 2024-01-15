// Function to fetch media data
async function getMedia() {
  const media = await getPhotographers();
  return media;
}

// Function to display media and photographer details
async function displayMedia(photographers, media) {
  // Create and display photographer details
  const Details = createPhotographDetail(photographers, media);
  Details.getPhotographDetails();
  Details.getPhotographMedia();

  // Get and display total likes and price
  const Info = createExtraInfo(photographers, media);
  Info.getTotalLikes();
  Info.getPrice();

  // Sort media by likes and alphabetical order
  const filter = await createFilter(media);
  filter.onChangeFilter();

  // Get and display photographer name for modal
  const phDataModal = getModalData(photographers);
  phDataModal.getPhName();
}

// Main function to run the application
async function run() {
  // Fetch media data
  const { photographers, media } = await getMedia();

  // Display media and photographer details
  await displayMedia(photographers, media);
}

// Run the application
run();