import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

export default function Login({ isLoggedIn, onLogin, isLoading }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(email, password);
    }

    if (isLoggedIn) {
        return <NavLink to="/"/>;
    }

    return (
        <form onSubmit={handleSubmit} className="auth__form" name="login" noValidate>
            <h2 className="auth__title">Вход</h2>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Ваш email"
                value={email}
                className="auth__input"
                onChange={handleEmailChange}
                autoComplete="off"
            />
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                className="auth__input"
                onChange={handlePasswordChange}
                autoComplete="off"
            />
            <button type="submit" className="auth__button">{isLoading ? 'Подождите' : 'Войти'}</button>
        </form>
    );
}