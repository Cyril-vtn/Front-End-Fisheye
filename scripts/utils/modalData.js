function getModalData(data) {
  const phSection = document.querySelector('.ph__name__modal');

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const idItem = params.get('id');
  const idValue = parseInt(idItem);

  function getPhName() {
    const photographer = data.find(photographer => photographer.id === idValue);
    if (photographer) {
      const phName = `<h2>${photographer.name}</h2>`;
      phSection.innerHTML = phName;
      return phSection;
    }
  }

  return { getPhName };
}