import "./style.css";
import './images/close.svg';
import './images/logo.svg';
import Api from './js/Api.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';
import UserInfo from './js/UserInfo.js';


const popupContent = {
    addForm: `<div class="popup__content">
                    <img src="./images/close.svg" alt="" class="popup__close">
                    <h3 class="popup__title">Новое место</h3>
                    <form class="popup__form" name="form">
                        <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название" required minlength="2" maxlength="30">
                        <p class='popup__error popup__error_first'></p>
                        <input type="text" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" required pattern='https://.*'>
                        <p class='popup__error'></p>
                        <button type class="button popup__button">+</button>
                    </form>
                </div>`,
    editForm: `<div class="popup__content">
                    <img src="./images/close.svg" alt="" class="popup__close">
                    <h3 class="popup__title">Редактировать профиль</h3>
                    <form class="popup__form" name="form">
                        <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Имя" required minlength="2" maxlength="30">
                        <p class='popup__error popup__error_first'></p>
                        <input type="text" name="job" class="popup__input popup__input_type_link-url" placeholder="О себе" required minlength="2" maxlength="30">
                        <p class='popup__error'></p>
                        <button type class="button popup__button popup__button_edit">Сохранить</button>
                    </form>
                </div>
                </div> -->`,
    openImage: `<div class="popup__image-container">
                    <img src='' alt='' class='popup__image'>
                    <img src="./images/close.svg" alt="" class="popup__close">
                </div>`,
    editPhoto: `<div class="popup__content">
                  <img src="./images/close.svg" alt="" class="popup__close">
                  <h3 class="popup__title">Обновить аватар</h3>
                  <form class="popup__form" name="form">
                      <input type="text" name="link" class="popup__input popup__input_type_name" placeholder="Ссылка на аватар" required pattern='https://.*'>
                      <p class='popup__error'></p>
                      <button type class="button popup__button popup__button_edit">Сохранить</button>
                  </form>
                </div>`
  }
  
  const errors = {
    lengthError: 'Должно быть от 2 до 30 символов',
    urlError: 'Здесь должна быть ссылка',
    emptyError: 'Это обязательное поле'
  }
  
  let envVar = 's'
  if (process.env.NODE_ENV === 'development') {
    envVar = ''
  }

  
  const apiOptions = {
    baseUrl: `http${envVar}://praktikum.tk/cohort8`,
    headers: {
      authorization: '682b14b7-c7e2-4dc0-a094-2b5f70584193',
      'Content-Type': 'application/json'
    }
  }
  
  
  const addButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit');
  const list = document.querySelector('.places-list');
  const popup = document.querySelector('.popup');
  const profile = document.querySelector('.profile');
  const portrait = document.querySelector('.user-info__photo');
  
  const api = new Api(apiOptions, renderLoading);
  const validator = new FormValidator(popup, errors);
  const popupSwitch = new Popup(popup, validator);
  const card = new Card(popup, popupSwitch, popupContent, profile.querySelector('.user-info__name'), api);
  const cardList = new CardList(list, card);
  const userInfo = new UserInfo();
  
  function renderLoading(isLoading) {
    const backup = popup.querySelector('.button').textContent
    if (isLoading) {
      popup.querySelector('.button').textContent = 'Загрузка...'
    } else {
      popup.querySelector('.button').textContent = backup
    }
  }
  
  function addButtonListener() {
    popup.innerHTML = popupContent.addForm;
    popupSwitch.open();
    validator.setEventListeners();
    document.querySelector('.popup__button').addEventListener('click', addFunc);
  }
  
  function editButtonListener() {
    popup.innerHTML = popupContent.editForm;
    userInfo.setUserInfo(profile, popup);
    popupSwitch.open();
    validator.setEventListeners();
    document.querySelector('.popup__button').addEventListener('click', editFunc);
  }
  
  function avatarButtonListener() {
    popup.innerHTML = popupContent.editPhoto;
    popupSwitch.open();
    validator.setEventListeners();
    document.querySelector('.popup__button').addEventListener('click', avatarFunc);
  }
  
  
  
  function addFunc(event) {
      event.preventDefault();
      renderLoading(true)
      cardList.addCard(api);
      popupSwitch.close();
    }
  
  function editFunc(event) {
      event.preventDefault();
      renderLoading(true)
      api.exportUserInfo({
        name: document.forms.form.name.value, 
        about: document.forms.form.job.value
      })
      .then(() => {
          userInfo.updateUserInfo(profile, popup);
          popupSwitch.close();
      }) 
      .catch((err) => {
          alert("Ошибка при обновлении профиля");
          console.log(err);
      })
      .finally(api.loadingFunc(false))
    }
  
  function avatarFunc(event) {
      event.preventDefault();
      renderLoading(true)
      api.refreshAvatar(document.forms.form.link.value)
      .then(() => {
        portrait.style.backgroundImage = `url(${document.forms.form.link.value})`;
        popupSwitch.close();
      }) 
      .catch((err) => {
          alert("Ошибка при обновлении аватара");
          console.log(err);
      })
      .finally(this.loadingFunc(false));
  }
  
  
  
  api.importUserInfo()
      .then((res) => {
        profile.querySelector('.user-info__name').textContent = res.name;
        profile.querySelector('.user-info__job').textContent = res.about;
        profile.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${res.avatar})`);
      })
      .catch((err) => {
        alert("Ошибка при загрузке профиля")
        console.log(err)
      });
      
  api.getInitialCards()
      .then((res) => {
        for (const item of res) {
        const data = {
            name: item.name,
            link: item.link,
            likes: item.likes,
            id: item._id,
            owner: item.owner
        }
        list.appendChild(card.create(data));
        }
      })
      .catch((err) => {
        alert("Ошибка при загрузке карточек");
        console.log(err);
      });
  
  
  
  
  addButton.addEventListener('click', addButtonListener);
  editButton.addEventListener('click', editButtonListener);
  portrait.addEventListener('click', avatarButtonListener);