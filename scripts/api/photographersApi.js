// This function fetches the photographers data from a JSON file.
async function getPhotographers() {
  try {
    // Fetch the JSON file.
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();

    // Extract the photographers array from the parsed data.
    const photographers = data.photographers;
    const media = data.media;

    return ({
      photographers: [...photographers],
      media: [...media],
    })
  } catch (error) {
    console.error('Error:', error);
    return ({
      photographers: []
    });
  }
}