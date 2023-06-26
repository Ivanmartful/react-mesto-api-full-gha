import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({
    onUpdateProfile,
    closeAllPopups,
    isOpen,
    onClose,
    isLoading
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const { name, about } = currentUser;
    const [profileName, setProfileName] = React.useState("");
    const [profileAbout, setProfileAbout] = React.useState("");

    function handleNameChange(evt) {
        setProfileName(evt.target.value);
    }

    function handleAboutChange(evt) {
        setProfileAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateProfile({
            name: profileName,
            about: profileAbout
        })
    }

    React.useEffect(() => {
        if (isOpen) {
            setProfileName(name);
            setProfileAbout(about);
        }
    }, [isOpen, currentUser]);



    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={"Редактировать профиль"}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            name={"profile"}
            form={"profileForm"}
        >
            <input type="text" className="popup__input popup__input_type_names" id="name-input" name="name"
                placeholder="Имя" minLength="2" maxLength="40" required value={profileName} onChange={handleNameChange} />
            <span className="popup__input-error name-input-error"></span>
            <input type="text" className="popup__input popup__input_type_description" id="description-input"
                name="about" placeholder="Описание" minLength="2" maxLength="200" required value={profileAbout} onChange={handleAboutChange} />
            <span className="popup__input-error description-input-error"></span>
        </PopupWithForm>
    )

}

export default EditProfilePopup;