import closeBtn from "../images/CloseIcon.svg";
import React from 'react';
function ImagePopup({card, onClose}){
  return(
            <div className={`popup popup_image ${card ? "popup_opened" : ""}`}>
            <div className="popup__overlay popup__overlay-image">
            <div className="popup__content">
              <img className="popup__image_image" src={card.link} alt="картинка места"  />
              <p className="popup__caption_image"></p>
              <img className="popup__close-button popup__close-button_image" src={closeBtn} alt="кнопка выхода" onClick={onClose} />
            </div>
            </div>
          </div>
        )
    
}
export default ImagePopup;