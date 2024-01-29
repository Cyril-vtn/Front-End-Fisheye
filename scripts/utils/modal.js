// Function to handle opening and closing of the contact form
function handleModal() {
  const modal = document.querySelector(".bground__modal");
  const content = document.querySelector(".content__modal");

  // Display the modal and set relevant attributes
  modal.style.display = "block";
  content.setAttribute("open-modal", true);
  content.removeAttribute("closed-modal");
  modal.setAttribute("open-bg", true);
  modal.removeAttribute("remove-bground");

  // Focus on the first input field in the form
  document.querySelector(".text__control").focus();

  // Add event listener to close the modal when 'Esc' key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Esc" || e.key === "Escape") {
      closeModal();
    }
  });
}

// Get form and input fields
const form = document.getElementById("submit");
const inputFields = document.getElementsByClassName("text__control");

// Validation functions
const isRequired = (value) => value !== "";
const isBetween = (length, min, max) => length >= min && length <= max;
const isEmailValid = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

// Function to check input validity
const checkInput = (input, min, max, isEmail = false) => {
  // Trim the input value
  const value = input.value.trim();
  const name = input.name;

  // Get the associated error element
  const errorElement = document.getElementById(input.name + "-data");

  // Initialize validity flag
  let valid = false;
  // Check if input is required and is of valid length or is a valid email
  if (!isRequired(value)) {
    // If input is not required, set error message and make it visible
    errorElement.setAttribute("data-error", "Ce champ ne peut pas etre vide !");
    errorElement.setAttribute("data-error-visible", true);
  } else if (
    isEmail ? !isEmailValid(value) : !isBetween(value.length, min, max)
  ) {
    if (name === "first" || name === "last") {
      valid = true;
      return;
    }
    // If input is not valid, set error message and make it visible
    errorElement.setAttribute(
      "data-error",
      isEmail
        ? "Veuillez entrer un format correct!"
        : "ce champ doit contenir minimum 2 characteres !"
    );
    errorElement.setAttribute("data-error-visible", true);
  } else {
    // If input is valid, remove error message and hide it
    if (errorElement && errorElement.hasAttribute("data-error")) {
      errorElement.removeAttribute("data-error");
    }
    if (errorElement && errorElement.hasAttribute("data-error-visible")) {
      errorElement.removeAttribute("data-error-visible");
    }
    // Set validity flag to true
    valid = true;
  }

  // Return validity flag
  return valid;
};

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check if all input fields are valid
  let isFormValid = Array.from(form).every((input) =>
    checkInput(input, 2, 25, input.name === "email")
  );

  // If form is valid, hide the form and display a confirmation message
  if (isFormValid) {
    form.style.display = "none";

    const msg = document.getElementById("confirmation__msg");
    msg.textContent = "Votre message est bien reçu ! ";
    msg.style.color = "black";
    msg.alignText = "center";
  }
});

// Event listener for form input to provide instant feedback on errors
form.addEventListener("input", function (e) {
  checkInput(e.target, 2, 25, e.target.name === "email");
});

// Disable submit button while fields are not filled
let btnSubmit = document.getElementById("btn");
let inputs = document.querySelectorAll(".text__control");

const disableBtn = () => {
  btnSubmit.disabled = Array.from(inputs).some((input) => input.value === "");
  btnSubmit.style.background = btnSubmit.disabled ? "gray" : "";
};

inputs.forEach((input) => {
  input.addEventListener("input", disableBtn);
});

disableBtn();

// Function to close the modal
function closeModal() {
  const msg = document.getElementById("confirmation__msg");
  const modal = document.querySelector(".bground__modal");
  const form = document.getElementById("submit");

  // reset form
  msg.style.display = "none";
  form.style.display = "block";
  modal.style.display = "none";
  form.reset();
}
