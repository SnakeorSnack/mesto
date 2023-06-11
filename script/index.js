const popup = document.querySelector('.popup');
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
const submitButtonTypeAdd = document.querySelector('.popup__submit-button_type_add');

/* Функция открытия попапа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlay, true);
}

/* Функция закрытия попапа */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlay, true);
}
closePopupButtons.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', (evt) => {
    closePopup(popup)
  })
})

/* Функция закрытия попапа при нажатии Esc*/
function closeByEscape(evt) {
  if(evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
}

/* Функция закрытия попапа при нажатии overlay*/
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget){
    closePopup(evt.currentTarget);
  }
}

/* Функция открытия попапа редактирования профиля */
editButton.addEventListener('click',openEditProfilePopup);
function openEditProfilePopup() {
  openPopup(infoEditorPopup);
  resetInputErrorForm(infoEditorForm, validationConfig);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

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

function createCard(card) {
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
  const cardo = createCard(item);
  gridListElement.append(cardo);
});

/* Функция открытия попапа добавления нового места */

addButton.addEventListener('click',openAddImagePopup);
function openAddImagePopup() {
  openPopup(addImagePopup);
  resetInputErrorForm(addImagePopup,validationConfig);
  disableSubmitButton(submitButtonTypeAdd,validationConfig.inactiveButtonClass);
  addCardForm.reset();
}

/* Функция добавления карточки */
const inputTitle = addImagePopup.querySelector('.popup__inputfield_add_title');
const inputLink = addImagePopup.querySelector('.popup__inputfield_add_link');
const addCardForm = addImagePopup.querySelector('.popup__form_type_add-image');

addCardForm.addEventListener('submit', addCard)
function addCard(evt) {
  evt.preventDefault();
  const newCard = {name: inputTitle.value, link: inputLink.value}
  gridListElement.prepend(createCard(newCard));
  closePopup(addImagePopup);
}
