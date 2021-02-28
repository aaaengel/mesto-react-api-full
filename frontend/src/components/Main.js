import avIcon from "../images/avatar_icon.svg";
import editButton from "../images/EditButton.svg";
import plus from "../images/Vector2.svg";
import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatarDef from "../images/DefaultAvatar.svg";
function Main(props){
const currentUser = React.useContext(CurrentUserContext);
const defaultName = "Жак-Ив Кусто"
const defaultAbout = "Исследователь"
console.log(currentUser)
return(
            <main>
                <section className="profile">
                    <div className="profile__content">
                        <img className="profile__avatar" src={currentUser ? currentUser.avatar : avatarDef} alt="аватар" onClick={props.onEditAvatar} />
                        <img className="profile__avatar__edit-icon" src = {avIcon} alt={'edit avatar'} />
                        <div className="profile__text">
                            <div className="profile__name-and-edit-button">
                                <h1 className="profile__name">{currentUser ? currentUser.name : defaultName}</h1>
                                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                    <img src={editButton} alt="кнопка редактирования" className="profile__edit-button__image" />
                                </button>
                            </div>
                            <p className="profile__hobby">{currentUser ? currentUser.about : defaultAbout}</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                        <img src={plus} alt="плюсик" className="profile__add-button__image" />
                    </button>
                </section>
                <section className="cards">
                    {props.cards.map((item) => (
                        <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardDelete={props.handleCardDelete} onCardLike={props.handleCardLike} />
                    )
                    )}
                </section>
            </main>
);
}
export default Main;