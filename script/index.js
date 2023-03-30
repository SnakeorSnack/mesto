const editButton = document.querySelector('.profile__edit-button');
const infoEditorPopup = document.querySelector('.popup');
const closePopupButton = infoEditorPopup.querySelector('.popup__close-button');
const infoEditorForm = infoEditorPopup.querySelector('.popup__form');
const inputName = infoEditorPopup.querySelector('.popup__inputfield_change_name');
const inputProfession = infoEditorPopup.querySelector('.popup__inputfield_change_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

editButton.addEventListener('click',openEditor);
function openEditor() {
  infoEditorPopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

closePopupButton.addEventListener('click',closePopup);
function closePopup() {
  infoEditorPopup.classList.remove('popup_opened');
}

infoEditorForm.addEventListener('submit', clickSubmitButton);
function clickSubmitButton(event) {
  event.preventDefault();
  const name = inputName.value;
  const profession = inputProfession.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  closePopup();
}