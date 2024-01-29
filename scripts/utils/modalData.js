// Function to get modal data based on the URL parameters.
function getModalData(data) {
  // Selecting the photographer name section from the DOM.
  const phSection = document.querySelector(".ph__name__modal");

  // Parsing the URL to get the id parameter.
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get("id");
  const idValue = parseInt(idItem);

  // Function to get the photographer's name and display it in the modal.
  function getPhName() {
    // Finding the photographer with the matching id.
    const photographer = data.find(
      (photographer) => photographer.id === idValue
    );
    if (photographer) {
      // Constructing the HTML for the photographer's name.
      const phName = `<h2>${photographer.name}</h2>`;
      // Inserting the constructed HTML into the photographer name section.
      phSection.innerHTML = phName;
      return phSection;
    }
  }

  // Returning the function to get the photographer's name.
  return { getPhName };
}
