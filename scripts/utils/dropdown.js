// This function handles the dropdown functionality
function dropDown() {
  // Get DOM elements
  const selectWrapper = document.querySelector(".select__wrapper");
  const select = selectWrapper.querySelector(".select");
  const arrowUp = document.querySelector("#arrow-up");
  const arrowDown = document.querySelector("#arrow-down");

  // This function toggles the dropdown open or closed
  function toggleSelect() {
    select.classList.toggle("open");
    arrowUp.classList.toggle("hidden");
    arrowDown.classList.toggle("hidden");
  }

  // Add event listeners to the select wrapper to open/close the dropdown when clicked or keypressed
  selectWrapper.addEventListener("click", toggleSelect);
  selectWrapper.addEventListener("keypress", toggleSelect);

  // This function handles the selection of an option in the dropdown
  function selectOption(option) {
    // Get the previously selected option
    const previouSelectedOption = document.querySelector(
      ".hidden.custom__option"
    );

    // If there was a previously selected option, remove the 'hidden' class from it
    if (previouSelectedOption) {
      previouSelectedOption.classList.remove("hidden");
    }

    // Add the 'hidden' class to the newly selected option and update the text of the select trigger to match the selected option
    option.classList.add("hidden");
    option
      .closest(".select")
      .querySelector(".select__trigger span").textContent = option.textContent;
  }

  // Get all the options in the dropdown
  const options = document.querySelectorAll(".custom__option");

  // Add event listeners to each option to handle selection when clicked or keypressed
  options.forEach((option) => {
    option.addEventListener("click", () => selectOption(option));
    option.addEventListener("keypress", () => selectOption(option));
  });

  // Add an event listener to the window to close the dropdown when clicking outside of it
  window.addEventListener("click", function (e) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
}

// Call the dropdown function to initialize the dropdown functionality
dropDown();
