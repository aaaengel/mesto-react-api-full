import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup(props){
    const inputRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({link: inputRef.current.value});
       
      } 
    return(
        <PopupWithForm name="avatar" title="Новый аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                <div className="form-container">
                    <input ref={inputRef} className="form__input form__input_link popup__form_avatar"  id="link" name="link_avatar" placeholder="ссылка" type="url" required />
                    <span className='form__input-error' id='link-error'></span>
                </div>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;
