

class Popup {
    constructor(popup, validator) {
        this.popup = popup;
        this.validator = validator;
    }
    open() {
        this.popup.classList.add('popup_is-opened');
        this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));

        if (this.popup.firstElementChild.classList.contains('popup__content')) {
            this.validator.setSubmitState();
            this.validator.checkInputValidity();
        }

    }
    close() {
        this.popup.classList.remove('popup_is-opened')
    }
} 