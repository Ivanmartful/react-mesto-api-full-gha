class Api {
    constructor(basePath) {
        this._basePath = basePath;
    }

    _getheaders() {
        return  {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        };
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._basePath}/cards`, {
            headers: this._getheaders(),
        }).then(this._getJson);
    }

    createCard(item) {
        return fetch(`${this._basePath}/cards`, {
            method: 'POST',
            headers: this._getheaders(),
            body: JSON.stringify(item),
        }).then(this._getJson);
    }

    getCurrentUser() {
        return fetch(`${this._basePath}/users/me`, {
            method: 'GET',
            headers: this._getheaders(),
        }).then(this._getJson);
    }

    deleteCard(id) {
        return fetch(`${this._basePath}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getheaders(),
        }).then(this._getJson);
    }

    editUserInfo({name, about}) {
        return fetch(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getheaders(),
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then(this._getJson);
    }

    like(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getheaders(),
        }).then(this._getJson);
    }

    deleteLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getheaders(),
        }).then(this._getJson);
    }

    updateAvatar({avatar}) {
        return fetch(`${this._basePath}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getheaders(),
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then(this._getJson);
    }
}

const api = new Api('https://api.domainname.ivan.nomoreparties.sbs'); 

export default api;