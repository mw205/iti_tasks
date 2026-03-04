const doValidation = () => {
  const toValidate = document.querySelector("input[name=toValidate]").value;
  const actualValue = document.querySelector("input[name=validation]").value;
  if (toValidate != actualValue) {
    alert("validation value doesn't match");
    return false;
  } else {
    return true;
  }
};
