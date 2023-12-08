// This function fetches the photographers data from a JSON file.
async function getPhotographers() {
    try {
        // Fetch the JSON file.
        const response = await fetch("./data/photographers.json");
        const data = await response.json();

        // Extract the photographers array from the parsed data.
        const photographers = data.photographers;

        return ({
            photographers: [...photographers]
        })
    } catch (error) {
        console.error('Error:', error);
        return ({
            photographers: []
        });
    }
}
// This function displays the photographers data on the webpage.
async function displayData(photographers) {
    // Select the section where the photographers data will be displayed.
    const photographersSection = document.querySelector(".photograph__list__section");

    // For each photographer, create a card and append it to the section.
    photographers.forEach((photographer) => {
        // Create a template for the photographer.
        const photographerModel = photographerTemplate(photographer);
        // Create a DOM element for the photographer's card.
        const userCardDOM = photographerModel.getUserCardDOM();
        // Append the photographer's card to the section.
        photographersSection.appendChild(userCardDOM);
    });
}

// This function initializes the webpage.
async function init() {
    // Fetch the photographers data.
    const { photographers } = await getPhotographers();
    // Display the photographers data on the webpage.
    displayData(photographers);
}

// Call the initialization function.
init();