/* eslint-disable react-hooks/exhaustive-deps */

import avIcon from "../images/avatar_icon.svg";
import editButton from "../images/EditButton.svg";
import plus from "../images/Vector2.svg";
import React from "react";
import Card from "./Card.js";
import api from "../utils/api"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props){
const {currentUser, setCurrentUser, cards, addCards} = React.useContext(CurrentUserContext);
console.log(currentUser)
React.useEffect(() => {
    api
      .getAny("users/me")
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
        })
      .catch((err) =>
        console.log(`Ошибка при загрузке информации о пользователе: ${err}`)
      );
      api.getAny("cards")
    .then((res) => {
        addCards(res.data.map(item => ({
          _id: item._id,
          likes: item.likes,
          name: item.name,
          link: item.link,
          owner: item.owner
        }
        )));
      }).catch(err => console.log(err))
  }, []);
return(
            <main>
                <section className="profile">
                    <div className="profile__content">
                        <img className="profile__avatar" src={ currentUser.avatar } alt="аватар" onClick={props.onEditAvatar} />
                        <img className="profile__avatar__edit-icon" src = {avIcon} alt={'edit avatar'} />
                        <div className="profile__text">
                            <div className="profile__name-and-edit-button">
                                <h1 className="profile__name">{ currentUser.name }</h1>
                                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                    <img src={editButton} alt="кнопка редактирования" className="profile__edit-button__image" />
                                </button>
                            </div>
                            <p className="profile__hobby">{ currentUser.about }</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                        <img src={plus} alt="плюсик" className="profile__add-button__image" />
                    </button>
                </section>
                <section className="cards">
                    {cards.map((item) => (
                        <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardDelete={props.handleCardDelete} onCardLike={props.handleCardLike} />
                    )
                    )}
                </section>
            </main>
);
}
export default Main;