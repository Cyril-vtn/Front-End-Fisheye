function dropDown() {
  const selectWrapper = document.querySelector('.select__wrapper');
  const select = selectWrapper.querySelector('.select');
  const arrowUp = document.querySelector('#arrow-up');
  const arrowDown = document.querySelector('#arrow-down');

  function toggleSelect() {
    select.classList.toggle('open');
    arrowUp.classList.toggle('hidden');
    arrowDown.classList.toggle('hidden');
  }

  selectWrapper.addEventListener('click', toggleSelect);
  selectWrapper.addEventListener('keypress', toggleSelect);

  function selectOption(option) {
    console.log(option)
    const previouSelectedOption = document.querySelector('.hidden.custom__option');
    console.log(previouSelectedOption)

    if (previouSelectedOption) {
      previouSelectedOption.classList.remove('hidden');
    }

    option.classList.add('hidden');
    option.closest('.select').querySelector('.select__trigger span').textContent = option.textContent;

  }

  const options = document.querySelectorAll('.custom__option');
  options.forEach(option => {
    option.addEventListener('click', () => selectOption(option));
    option.addEventListener('keypress', () => selectOption(option));
  });

  window.addEventListener('click', function (e) {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });
}

dropDown();