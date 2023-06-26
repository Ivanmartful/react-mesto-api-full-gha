import React from "react";
import { PopupWithForm } from "./PopupWithForm";

function AddPlacePopup({
    onSubmit,
    isOpen,
    onClose,
    isLoading
}) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: name,
            link: link
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={"Новое место"}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            name={"card"}
            form={"editForm"}
        >
            <input type="text" className="popup__input popup__input_type_card-name" id="names-input" name="name"
                placeholder="Название" minLength="2" maxLength="40" required value={name} onChange={handleNameChange}/>
            <span className="popup__input-error names-input-error"></span>
            <input type="url" className="popup__input popup__input_type_card-link" id="imglink-input" name="link"
                placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange}/>
            <span className="popup__input-error imglink-input-error"></span>
        </PopupWithForm>
    );
}
 export default AddPlacePopup;