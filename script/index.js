const editButton = document.querySelector('.profile__edit-button');
const infoEditorPopup = document.querySelector('.popup');
const closePopupButton = infoEditorPopup.querySelector('.popup__close-button');
const infoEditorForm = infoEditorPopup.querySelector('.popup__form');
const inputName = infoEditorPopup.querySelector('.popup__inputfield_change_name');
const inputProfession = infoEditorPopup.querySelector('.popup__inputfield_change_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const gridListElement = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('.card-template').content;
const addButton = document.querySelector('.profile__add-button');
const addImagePopup = document.querySelector('.popup_type_add-image');
const closeAddImagePopup = addImagePopup.querySelector('.popup__close-button_type_add-image');

/* Массив карточек «из коробки» */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Функция открытия попапа редактирования профиля */

editButton.addEventListener('click',openEditor);
function openEditor() {
  infoEditorPopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}
/* Функция закрытия попапа */

closePopupButton.addEventListener('click',closePopup);
closeAddImagePopup.addEventListener('click',closePopup);
function closePopup() {
  infoEditorPopup.classList.remove('popup_opened');
  addImagePopup.classList.remove('popup_opened');
}

/* Функция сохранения изменений Имени и Профессии */

infoEditorForm.addEventListener('submit', clickSubmitButton);
function clickSubmitButton(event) {
  event.preventDefault();
  const name = inputName.value;
  const profession = inputProfession.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  closePopup();
}

/* Функция добавления карточек «из коробки» */

initialCards.forEach((item) => {
  const templateElement = cardTemplate.cloneNode(true);
  templateElement.querySelector('.photo-grid__picture-name').innerText = item.name;
  templateElement.querySelector('.photo-grid__picture').src = item.link;
  gridListElement.append(templateElement);
});

/* Функция открытия попапа добавления картинки */

addButton.addEventListener('click',addImage);
function addImage() {
  addImagePopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}


