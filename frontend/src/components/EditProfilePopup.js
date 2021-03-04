import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext"
function EditProfilePopup({isOpen, onClose, onUpdateUser}){
 const [name, setName] = React.useState();
 const [description, setDescription] = React.useState();
 const { currentUser } = React.useContext(CurrentUserContext);
 function handleSubmit(e) {
    e.preventDefault();
    console.log(name)
    console.log(description)
    onUpdateUser({
      name: name,
      about: description,
    });
  } 
 function handleChange(evt) {
    evt.target.name === 'name'
      ? setName(evt.target.value)
      : setDescription(evt.target.value);
 }
 React.useEffect(() => {
  console.log(currentUser)
   setName(currentUser ? currentUser.name : "Жак-ив Кусто");
   setDescription(currentUser ? currentUser.about : 'Исследователь');
 }, [currentUser]); 
 return(
        <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose}>
                    <div className="form__container">
                        <input type='text' className='form__input form__input_name popup__form_edit' value={name || ''} name='name' maxLength="40" minLength="2" required onChange={handleChange} /> 
                        <span className='form__input-error' id='name-error'></span>
                        <input className="form__input form__input_hobby popup__form_edit" value={description || ''} onChange = {handleChange} type="text" id = "hobby" name="hobby" maxLength="200" minLength="2" required />
                        <span className='form__input-error' id='hobby-error'></span>
                    </div>
        </PopupWithForm>
 )
}

export default EditProfilePopup;



