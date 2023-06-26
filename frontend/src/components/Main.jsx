import React from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

export function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__title">{currentUser ? currentUser.name : "Обновление..."}</h1>
                        <p className="profile__subtitle">{currentUser ? currentUser.about : "Обновление..."}</p>
                    </div>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements" aria-label="фотокарточки">
                {props.cards.map((card) => (
                    <Card 
                        key={card._id} 
                        {...card} 
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} 
                        />
                ))}
            </section>
        </main>
    );
}