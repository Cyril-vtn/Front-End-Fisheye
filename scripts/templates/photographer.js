// This function is used to create a template for a photographer.
// It takes in a data object as a parameter which contains information about the photographer.

function photographerTemplate(data) {

    // Destructuring the data object to get the necessary fields.
    const { name, portrait, id, city, country, price, tagline } = data;

    // Constructing the path to the photographer's portrait.
    const picture = `assets/Photographers ID Photos/${portrait}`;

    // This function is used to create a DOM element for the photographer's card.
    function getUserCardDOM() {
        const photographCard = document.createElement('article');
        photographCard.classList.add('ph__card');

        const photographer = `
            <a  href="photograph.html?id=${id}" aria-label="Profil de ${name}">
                <div class="ph__container__img">
                    <img src="${picture}" alt=${name}/>
                </div>
                <h1 class="ph__name">${name}</h1>
            </a>
            <div class="ph__location">
                <h3>${city}, ${country}</h3>
            </div>
            <p class="ph__tagline">${tagline}</p>
            <p class="ph__price">${price}€ /jour</p>
        `;

        // Setting the innerHTML of the created element to the photographer's card HTML.
        photographCard.innerHTML = photographer;
        // Returning the created element.
        return photographCard;
    }
    // Returning an object with the getUserCardDOM function.
    return { getUserCardDOM }
}