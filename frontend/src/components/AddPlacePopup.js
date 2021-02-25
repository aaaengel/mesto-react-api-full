import PopupWithForm from "./PopupWithForm";
import React from "react";
function AddPlacePopup(props){
    const nameRef = React.useRef();
    const linkRef = React.useRef();
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
          name: nameRef.current.value,
          link: linkRef.current.value,
        });
      }
    return(
    <PopupWithForm name="mesto" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                    <div className="form-container">
                        <input ref={nameRef} type='text' className='form__input form__input_mesto popup__form_mesto' name='title' placeholder="Название" required />
                        <span className='form__input-error' id='name-error'></span>
                        <input ref={linkRef} className="form__input form__input_link popup__form_mesto"  id="link-avatar" name="link" placeholder="ссылка" type="url" required />
                        <span className='form__input-error' id='link-avatar-error'></span>
                    </div>
    </PopupWithForm>
    )
}
export default AddPlacePopup;
