

export default class CardList {
    
    
    constructor(container, creator) {
        this.container = container;
        this.creator = creator;
    }
    
    
    addCard(api) {

        const data = {
            name: document.forms.form.elements.name.value,
            link: document.forms.form.elements.link.value,
        }

        api.postCard(data)
        .then((res) => {
            data.id = res._id
            data.owner = res.owner
            data.likes = res.likes
            this.container.appendChild(this.creator.create(data));
        })
        .catch((err) => {
            alert("Ошибка при загрузке карточки");
            console.log(err);
        })
        .finally(api.loadingFunc(false))
    }
}