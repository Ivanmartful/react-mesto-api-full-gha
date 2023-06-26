import React from "react";
import { PopupWithForm } from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading
}) {
    const ref = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    React.useEffect(() => {
        ref.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={"Обновить аватар"}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        name={"avatar"}
        form={"avatarForm"}
      >
        <input ref={ref} type="url" className="popup__input popup__input_type_avatar-link" id="avatarlink-input" name="avatar"
          placeholder="Ссылка на аватар" required />
        <span className="popup__input-error avatarlink-input-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;