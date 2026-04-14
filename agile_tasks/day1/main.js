/**
 * @typedef {{ isValid: boolean, error?: string }} ValidationResult
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[a-zA-Z]+$/;
const PHONE_PATTERN = /^\+?\d{7,15}$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * @param {unknown} value
 * @param {string} fieldName
 * @returns {ValidationResult}
 */
function isFilled(value, fieldName) {
  if (typeof value !== "string") {
    return { isValid: false, error: `${fieldName} must be text.` };
  }

  if (value.trim() === "") {
    return { isValid: false, error: `${fieldName} is required.` };
  }

  return { isValid: true };
}
/**
 * @param {string}name
 * @returns {ValidationResult}
 */

function isNameValid(name) {
  if (!name.match(NAME_PATTERN)) {
    return {
      isValid: false,
      error: "Name is invalid, it should contains characters only",
    };
  }
  return { isValid: true };
}

/**
 * @param {string} email
 * @returns {ValidationResult}
 */
function isEmailValid(email) {
  const required = isFilled(email, "Email address");
  if (!required.isValid) {
    return required;
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { isValid: false, error: "Enter a valid email address." };
  }

  return { isValid: true };
}

/**
 * @param {string} password
 * @returns {ValidationResult}
 */
function isPasswordStrong(password) {
  const required = isFilled(password, "Password");
  if (!required.isValid) {
    return required;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    };
  }

  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return {
      isValid: false,
      error:
        "Password must contain uppercase, lowercase letters, and a number.",
    };
  }

  return { isValid: true };
}

/**
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {ValidationResult}
 */
function doPasswordsMatch(password, confirmPassword) {
  const required = isFilled(confirmPassword, "Confirm Password");
  if (!required.isValid) {
    return required;
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords must match." };
  }

  return { isValid: true };
}

/**
 * @param {string} phone
 * @returns {ValidationResult}
 */
function isPhoneNumberValid(phone) {
  if (phone.trim() === "") {
    return { isValid: true };
  }

  if (!PHONE_PATTERN.test(phone)) {
    return {
      isValid: false,
      error: "Phone number must contain digits and may start with +.",
    };
  }

  return { isValid: true };
}

/**
 * @param {string} gender
 * @returns {ValidationResult}
 */
function isGenderSelected(gender) {
  if (typeof gender !== "string") {
    return { isValid: false, error: "Gender selection is invalid." };
  }

  if (gender.trim() === "") {
    return { isValid: false, error: "Please choose a gender option." };
  }

  return { isValid: true };
}

/**
 * @param {string} dateString
 * @returns {ValidationResult}
 */
function isDateOfBirthValid(dateString) {
  if (dateString.trim() === "") {
    return { isValid: true };
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return { isValid: false, error: "Date of birth must be a valid date." };
  }

  if (date > new Date()) {
    return { isValid: false, error: "Date of birth cannot be in the future." };
  }

  return { isValid: true };
}

/**
 * @param {Record<string, string>} values
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateRegistrationForm(values) {
  const validators = [
    isFilled.bind(null, values.fullName, "Full Name"),
    isNameValid.bind(null, values.fullName),
    isEmailValid.bind(null, values.email),
    isPasswordStrong.bind(null, values.password),
    doPasswordsMatch.bind(null, values.password, values.confirmPassword),
    isPhoneNumberValid.bind(null, values.phone),
    isGenderSelected.bind(null, values.gender),
    isDateOfBirthValid.bind(null, values.dob),
  ];

  const results = validators.map((validator) => validator());
  const errors = results
    .filter((result) => !result.isValid)
    .map((result) => result.error || "Invalid field.");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * @returns {Record<string, string>}
 */
function getFormValues() {
  return {
    fullName: document.getElementById("full-name")?.value ?? "",
    email: document.getElementById("email")?.value ?? "",
    password: document.getElementById("password")?.value ?? "",
    confirmPassword: document.getElementById("confirm-password")?.value ?? "",
    phone: document.getElementById("phone")?.value ?? "",
    gender: document.getElementById("gender")?.value ?? "",
    dob: document.getElementById("dob")?.value ?? "",
  };
}

function displayValidationErrors(errors) {
  const message = errors.length > 0 ? errors.join("\n") : "No errors.";
  alert(message);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) {
    return;
  }

  form.noValidate = true;
  form.addEventListener("submit", (event) => {
    const { isValid, errors } = validateRegistrationForm(getFormValues());

    if (!isValid) {
      event.preventDefault();
      displayValidationErrors(errors);
    }
  });
});
