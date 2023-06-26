import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

export function PopupWithForm({isOpen, onClose, name, title, buttonText, children, form, onSubmit}) {
    usePopupClose(isOpen, onClose);

    return (
        <div className={`popup popup_name_${name} ${isOpen ? `popup_opened` : ""}`}>
                <div className="popup__container">
                    <h2 className="popup__title">{title}</h2>

                    <form className="popup__form" name={form} noValidate onSubmit={onSubmit}>
                        {children}
                        <button type="submit" className="popup__save-button">{buttonText}</button>
                    </form>

                    <button type="button" className="popup__close-button" onClick={onClose}/>
                </div>
            </div>
    );
};