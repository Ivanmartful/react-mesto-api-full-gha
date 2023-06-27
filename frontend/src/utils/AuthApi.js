class AuthApi {
    constructor(basePath) {
        this._basePath = basePath;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    registerUser(email, password) {
        return fetch(`${this._basePath}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._checkError(res));
    }

    loginUser(email, password) {
        return fetch(`${this._basePath}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._checkError(res));
    }

    checkToken(token) {
        return fetch(`${this._basePath}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => this._checkError(res));
    }
}
const authApi = new AuthApi("http://api.domainname.ivan.nomoreparties.sbs");
export default authApi;