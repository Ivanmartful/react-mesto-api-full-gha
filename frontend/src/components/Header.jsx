import logo from '../images/logo.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

export function Header({ onSignOut, userEmail }) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
            <div className='header__container'>
                <p className="header__email">{userEmail}</p>
                <Routes>
                    <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                    <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                    <Route exact path="/" element={<Link to="sign-in" className="header__link" onClick={onSignOut}>Выйти</Link>} />
                </Routes>
            </div>
        </header>
    );
}