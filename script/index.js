const editButton = document.querySelector(".profile__edit-button");
const infoEditorPopup = document.querySelector('.popup');
const closePopupButton = infoEditorPopup.querySelector('.popup__close-button');
const infoEditorForm = infoEditorPopup.querySelector('.popup__form');
const infoEditorSubmit = infoEditorPopup.querySelector('.popup__submit-button');
const inputName = infoEditorPopup.querySelector('.popup__inputfield_name');
const inputProfession = infoEditorPopup.querySelector('.popup__inputfield_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

editButton.addEventListener('click',openEditor);
function openEditor() {
  infoEditorPopup.classList.add('popup_open');
  inputName.value = profileName.innerHTML;
  inputProfession.value = profileProfession.innerHTML
}

closePopupButton.addEventListener('click',closePopup);
function closePopup() {
  infoEditorPopup.classList.remove('popup_open');
}

infoEditorForm.addEventListener('submit', clickSubmitButton);
function clickSubmitButton(event) {
  event.preventDefault();
  const name = inputName.value;
  const profession = inputProfession.value;
  profileName.innerHTML = name;
  profileProfession.innerHTML = profession;
  infoEditorPopup.classList.remove('popup_open');
}