import React from "react";
import usePopupClose from '../hooks/usePopupClose';

export default function InfoTooltip({ isOpen, onClose, name, isSuccess }) {
    usePopupClose(isOpen, onClose);

    return(
        <div className={`popup popup_name_${name} ${isOpen ? `popup_opened` : ""}`}>
                <div className="popup__container">
                    <div className={`popup__success ${isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"}`}></div>
                    <h2 className="popup__title popup__title_type_center">
                        {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}
                    </h2>
                    <button type="button" className="popup__close-button" onClick={onClose}/>
                </div>
            </div>
    );
}