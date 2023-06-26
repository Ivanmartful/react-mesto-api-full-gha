import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function Card(card) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);

    const cardLikeButtonClassName = ( 
        `element__button ${isLiked && 'element__button_active'}` 
      );;

    function handleCLick(){
        card.onCardClick(card);
    }

    function handleCardLike() {
        card.onCardLike(card);
    }

    function handleCardDelete() {
        card.onCardDelete(card);
    }

    return (
        <li className="element">
            {isOwn && <button type="button" className="element__delete-button" onClick={handleCardDelete}></button>}
            <img src={card.link} alt={card.name} className="element__image" onClick={handleCLick}/>
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <p className="element__like-number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}