class FormValidator {
    constructor(container, errors) {
        this.container = container;
        this.errors = errors
    }

    checkInputValidity() {
        for (let i = 0; i < this.container.querySelectorAll('.popup__input').length; i++) {
            const input = this.container.querySelectorAll('.popup__input')[i];
            const error = input.nextElementSibling;
            this.checker.call(this, input, error)
        }
    }


    setSubmitState() {
        
        const inputFirst = this.container.querySelector('.popup__input')
        const inputSecond = inputFirst.nextElementSibling.nextElementSibling;
        const button = document.querySelector('.popup__button');

        if (inputFirst.validity.valid && inputSecond.validity.valid) {
            button.classList.add('popup__button_is-active');
            button.removeAttribute('disabled', true);
        } else {
            button.classList.remove('popup__button_is-active');
            button.setAttribute('disabled', true);
        }
    }

    setEventListeners() {
        this.container.querySelector('.popup__form').addEventListener('input', this.setSubmitState.bind(this));
        this.container.querySelector('.popup__form').addEventListener('input', this.checkInputValidity.bind(this));
    }

    checker(input, error) {

        if (this.checkMissing(input)) {
            error.textContent = this.errors.emptyError;
            return;
        } 
        if (this.checkPattern(input)) {
            error.textContent = this.errors.urlError;
            return;
        } 
        if (this.checkValidity(input)) {
            error.textContent = this.errors.lengthError;
            return;
        } 
        if (!this.checkValidity(input)) {
            error.textContent = '';
            return;
        }
    }
    checkMissing(input) {
        return input.validity.valueMissing
    }
    checkPattern(input) {
        return input.validity.patternMismatch
    }
    checkValidity(input) {
        return !input.validity.valid
    }
}