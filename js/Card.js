

class Card {
    constructor(popup, switcher, popupContent, me, api) {
        this.popup = popup;
        this.switcher = switcher;
        this.popupContent = popupContent;
        this.me = me;
        this.api = api;
    }
    like(event) {
        if (!event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.putLike(event.target.closest('.place-card').id)
            .then(() => {
                event.target.classList.add('place-card__like-icon_liked')
                event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) + 1
            })
            .catch((err) => {
                alert("Ошибка при постановке лайка");
                console.log(err);
            })
            return
        }
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.removeLike(event.target.closest('.place-card').id)
            .then(() => {
                event.target.classList.remove('place-card__like-icon_liked')
                event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) - 1
            })
            .catch((err) => {
                alert("Ошибка при отмене лайка");
                console.log(err);
            })
            return
        }
            


    }
    remove(event) {
        if(window.confirm('Вы действительно хотите удалить эту карточку?')) {
            this.api.deleteCard(event.target.closest('.place-card').id)
            .then(() => {    
                event.target.parentElement.parentElement.remove();
            })
            .catch((err) => {
                alert("Ошибка при удалении карточки");
                console.log(err);
            })
        }
        
    }
    openImage(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.popup.innerHTML = this.popupContent.openImage;
            this.popup.querySelector('.popup__image').setAttribute('src', event.target.style.backgroundImage.slice(5, -2));
            this.switcher.open();
        }
    }
    create(data) {
        const card = document.createElement('div');
        card.classList.add('place-card');
        card.setAttribute('id', data.id);
        card.innerHTML = `<div class="place-card__image"  style="background-image: url(${data.link})"> 
                            <button class="place-card__delete-icon" ></button>
                          </div>
                          <div class="place-card__description">
                            <h3 class="place-card__name">${data.name}</h3>
                          <div class="place-card__like-container"> 
                            <button class="place-card__like-icon"></button>
                            <p class="place-card__like-counter">${data.likes.length}</p>
                          </div>
                          </div>`;

        for (let i = 0; i < data.likes.length; i++) {

            if (data.likes[i].name === this.me.textContent) {
              card.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
            }
        }    

        if (data.owner.name === this.me.textContent) {
            card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
            card.querySelector('.place-card__delete-icon').setAttribute('style', 'display: block');
        }
        
        card.querySelector('.place-card__image').addEventListener('click', this.openImage.bind(this));
        card.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
            
        return card
    }
}



