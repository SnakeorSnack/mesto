const editButton = document.querySelector('.profile__edit-button');
const infoEditorPopup = document.querySelector('.popup_type_edit');
const closePopupButtons =  document.querySelectorAll('.popup__close-button');
const infoEditorForm = infoEditorPopup.querySelector('.popup__form');
const inputName = infoEditorPopup.querySelector('.popup__inputfield_change_name');
const inputProfession = infoEditorPopup.querySelector('.popup__inputfield_change_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const gridListElement = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('.card-template').content;
const addButton = document.querySelector('.profile__add-button');
const addImagePopup = document.querySelector('.popup_type_add-image');
const popupImage = document.querySelector('.popup_type_open-image');
const openedImage = popupImage.querySelector('.popup__image');
const openedImageFigcaption = popupImage.querySelector('.popup__figcaption');

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

/* Функция открытия попапа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/* Функция открытия попапа редактирования профиля */

editButton.addEventListener('click',openEditProfilePopup);
function openEditProfilePopup() {
  openPopup(infoEditorPopup);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

/* Функция закрытия попапа */

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
closePopupButtons.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup)
  })
})

/* Функция сохранения изменений Имени и Профессии */

infoEditorForm.addEventListener('submit',  handleProfileFormSubmit);
function  handleProfileFormSubmit(event) {
  event.preventDefault();
  const name = inputName.value;
  const profession = inputProfession.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  closePopup(infoEditorPopup);
}

/* Функция удаления карточки */

function deleteCard(evt) {
  const photoCard = evt.target.closest('.photo-grid__element');
  photoCard.remove();
}

/* Функция лайка карточки */
function toggleLikeButton(likeToToggle){
  likeToToggle.classList.toggle('photo-grid__like-button_active');
}

/* Функция добавления карточек «из коробки» */

function renderCard(card) {
  const templateElement = cardTemplate.cloneNode(true);
  templateElement.querySelector('.photo-grid__picture-name').textContent = card.name;
  templateElement.querySelector('.photo-grid__picture').src = card.link;
  templateElement.querySelector('.photo-grid__picture').alt = card.name;
  templateElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteCard);
  const likeButton = templateElement.querySelector('.photo-grid__like-button');
  likeButton.addEventListener('click',() => toggleLikeButton(likeButton));
  templateElement.querySelector('.photo-grid__picture').addEventListener('click', () => {
    openedImage.src = card.link;
    openedImage.alt = card.name;
    openedImageFigcaption.textContent = card.name;
    openPopup(popupImage)
  });
  return templateElement
};

/* Функция открытия картинки */


initialCards.forEach(function openImage(item) {
  const cardo = renderCard(item);
  gridListElement.append(cardo);
});

/* Функция открытия попапа добавления нового места */

addButton.addEventListener('click',openAddImagePopup);
function openAddImagePopup() {
  openPopup(addImagePopup);
}

/* Функция добавления карточки */
const inputTitle = addImagePopup.querySelector('.popup__inputfield_add_title');
const inputLink = addImagePopup.querySelector('.popup__inputfield_add_link');
const addCardForm = addImagePopup.querySelector('.popup__form_type_add-image');

addCardForm.addEventListener('submit', addCard)
function addCard(evt) {
  evt.preventDefault();
  const newCard = {name: inputTitle.value, link: inputLink.value}
  inputTitle.value = '';
  inputLink.value = '';
  gridListElement.prepend(renderCard(newCard));
  closePopup(addImagePopup);
}
