import React from "react";
import closeBtn from "../images/CloseIcon.svg";
export default function InfoToolTip({onClose, isOpen, status}){
    return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className={`popup__overlay`}>
        <form className="popup__window tooltip__window">
            <img src={status.iconStatus} className="tooltip__icon" alt="status" />
            <h2 className="tooltip__text">{status.text}</h2>
            <img className="popup__close-button" src={closeBtn} alt="кнопка выхода" onClick={onClose} />
        </form>
        </div>
    </div>
  );
}

