/* объект настроек для валидации */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__inputfield',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  spanType: '.popup__error_type_',
  inputErrorClass: 'popup__inputfield_invalid',
  errorClass: 'popup__error_visible'
};

/* Включение валидации фунция */
function enableValidation(config) {
  const allForms = document.querySelectorAll(config.formSelector);
  allForms.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    eventListenersAdd(inputList, submitButton, config.inactiveButtonClass, config.spanType, config.inputErrorClass, config.errorClass)
  })
}

/* Навешиваем слушатели на инпут фунция */
function eventListenersAdd(inputList, submitButton, inactiveButtonClass, spanType, inputErrorClass, errorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, spanType, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  })
}
/* Проверка валидации фунция*/
function checkInputValidity(input, spanType, inputErrorClass, errorClass) {
  const errorInputElement = document.querySelector(`${spanType}${input.name}`);
  if (input.validity.valid) {
    hideInputErrorMessage(input, errorInputElement, inputErrorClass, errorClass);
  }
  else {
    showInputErrorMessage(input, errorInputElement, inputErrorClass, errorClass);
  }
}

/* Не прошло валидацию фунция*/
function showInputErrorMessage(input, errorInputElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorInputElement.textContent = input.validationMessage;
  errorInputElement.classList.add(errorClass);
}


/* Прошло валидацию фунция */
function hideInputErrorMessage(input, errorInputElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorInputElement.textContent = '';
  errorInputElement.classList.remove(errorClass);
}

/* Активация\деактивация кнопки submit фунция */
function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (areAllInputsValid(inputList)) {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
  else {
    disableSubmitButton(submitButton, inactiveButtonClass);
  }
}
/* проверка валидности инпутов фунция */
function areAllInputsValid(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid)
}

/* Активация кнопки субмит фунция */
function enableSubmitButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
/* ДеАктивация кнопки субмит фунция */
function disableSubmitButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

/* Ресет ошибок форм фунция */
function resetInputErrorForm(form, validationConfig) {
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorInputElement = document.querySelector(`${validationConfig.spanType}${input.name}`);
    if (!input.validity.valid) {
      hideInputErrorMessage(input, errorInputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    }
  });
}

enableValidation(validationConfig);