

class Api {
    
    
    constructor(options, loadingFunc) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.loadingFunc = loadingFunc
    }
    
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(this._getResponseData)
    }

    importUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(this._getResponseData)
    }

    exportUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseData)
    }

    refreshAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._getResponseData)
    }

    postCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
                })
        })
        .then(this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData)
    }
    
    putLike(cardId) {
        return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this._getResponseData)
    }
    
    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData)
    }
}






