import closeBtn from "../images/CloseIcon.svg";
import React from 'react';
function PopupWithForm(props){
return(
<div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__overlay popup__overlay-${props.name}`}>
            <form className={`popup__window popup__window-${props.name}`} onSubmit={props.onSubmit}>
                <fieldset className="form__set">
                    <h2 className="popup__text">{props.title}</h2>
                    {props.children}
                    <button type="submit" className={`popup__save-button popup__save-button__${props}`}>Сохранить</button>
                    <img className="popup__close-button" src={closeBtn} alt="кнопка выхода" onClick={props.onClose} />
                </fieldset>
            </form>
            </div>
        </div>
    )
}
export default PopupWithForm;