/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Route, Switch, withRouter, useHistory} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from './Register';
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip"
import * as auth from '../utils/auth.js';
import success from "../images/Union.svg"
import error from "../images/UnionError.svg"
import loading from "../images/loading.png"
function App() {
    const [currentUser, setCurrentUser] = React.useState({})  
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [loggedIn, setState] = React.useState(false);
    const [cards, addCards] = React.useState([]);
    const [toolTipStat, setToolTipStat] = React.useState({
      iconStatus: loading,
      text: 'Загрузка...',
    });
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({})
    const user = {
      currentUser,
      setCurrentUser,
      cards, 
      addCards,
    }
    const history = useHistory();
      function handleUpdateUser(userData){
        api.patch("users/me", userData)
        .then((newUser) => setCurrentUser(newUser))
      .catch((err) => `Ошибка при обновлении информации о пользователе: ${err}`)
      closeAllPopups();
      }
    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(true)
     }
     function handleEditProfileClick(){
        setIsEditProfilePopupOpen(true) 
     }
     function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true)
     }
     function closeAllPopups(){
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsInfoToolTipPopupOpen(false);
     }
     function handleCardClick(card){
        setSelectedCard(card);
     }
     function handleUpdateAvatar(userData){
      api.patchAvatar("users/me/avatar", userData).then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => `Ошибка при обновлении Аватара: ${err}`)
      closeAllPopups();
     }
     function handleTokenCheck(){
      if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
      if (res){
          setState({
            loggedIn: true,
            }) 
            setUserData({
              id: res._id,
              email: res.email,
            });
            history.push("/");
          }})
          .catch((err) =>{
            console.log(`Ошибка при проверке токена: ${err}`)
         }) 
        }
    }
    React.useEffect(() =>{
      handleTokenCheck();
      }, [])
     
  function handleSignOut () {
        localStorage.removeItem('jwt');
        setCurrentUser({isLoggedIn:false});
    }

function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((item) => {
        const newCard = {
            _id: item._id,
            likes: item.likes,
            name: item.name,
            link: item.link,
            owner: item.owner
        }
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        addCards(newCards);
    })
    .catch(err => console.log(err))
} 
function handleCardDelete(card){
    api.delete(`cards/${card._id}`)
    .then(() => {
        const newCards = cards.filter(item => item._id !== card._id);
        addCards(newCards)
    }).catch(err => console.log(err))
}

function handleAddPlaceSubmit(userData){
        api.post("cards", userData)
        .then(newCard =>addCards([newCard, ...cards]))
        .catch(err => console.log(err))
        closeAllPopups();
}
function notify(){
  setToolTipStat({ iconStatus: success, text: 'Регистрация прошла успешно!' });
}
function registerError(){
  setToolTipStat({ iconStatus: error, text: "Что-то пошло не так! Попробуйте ещё раз"});
}
function handleRegister({email, password}){
  auth.register(password, email)
    .then((res) =>{
        if(res){
        history.push('/sign-in');
        notify()
        }
      }).catch((err) =>{
        console.log(err)
        registerError()
      }).finally(() => setIsInfoToolTipPopupOpen(true))
}
function handleLogin({email, password}){
  auth.authorize(email, password)
    .then((data) => {
      if(data.token){
        setState({
          loggedIn: true
        })
          history.push("/")
        }
    })
    .catch(err => console.log(err));
}
    return (
      
      
      <CurrentUserContext.Provider value={user}>
        <div className="page">
          <Header userData={userData} onSignOut={handleSignOut} />
          <InfoToolTip onClose={closeAllPopups} status={toolTipStat} isOpen={isInfoToolTipPopupOpen} />
          <Switch>
            <Route path="/sign-up">
                <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
                 <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/">
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <PopupWithForm name="confirm" title="Вы уверены?" />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <ProtectedRoute loggedIn={loggedIn} component={Main} cards={cards} addCards={addCards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}  onCardClick={handleCardClick}/>
            </Route>
          </Switch>
          
          <Footer />
        </div>
      </CurrentUserContext.Provider>
   
   );
}

export default withRouter(App);
