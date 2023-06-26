import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';

export default function Register({ isLoggedIn, onRegister, isLoading }) {
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
        onRegister(email, password);
    }

    if (isLoggedIn) {
        return <NavLink to='/'/>;
    }

    return (
        <form onSubmit={handleSubmit} className="auth__form" name="register" noValidate>
            <h2 className="auth__title">Регистрация</h2>
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
            <button type="submit" className="auth__button">{isLoading ? 'Подождите' : 'Зарегистрироваться'}</button>
            <div>
                <Link to="/sign-in" className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </form>
    );
}