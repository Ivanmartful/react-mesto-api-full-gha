import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

export function ImagePopup(props) {
    usePopupClose(props.isOpen, props.onClose);

    return (
        <div className={`popup popup_view_card ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__card">
                <h2 className="popup__card-title">{props.card ? props.card.name : ""}</h2>
                <img src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} className="popup__image" />
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}