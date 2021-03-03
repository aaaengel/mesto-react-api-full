import React from "react";
import {Route, Link} from "react-router-dom";
import logo from "../images/logo.svg";
function Header({userData, onSignOut}) {
    console.log(userData)
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Место" />
            <Route exact path="/sign-up">
                <button className="header__button">
                    <Link to="/sign-in" className="header__button_text">Войти</Link>
                </button>
            </Route>
            <Route exact path="/sign-in">
                <button className="header__button">
                    <Link to="/sign-up" className="header__button_text">Регистрация</Link>
                </button>
            </Route>
            <Route exact path="/">
                <button className="header__button">
                    <p className="header__button_text">{userData.email}</p>
                    <Link to="/sign-up" onClick={onSignOut} className="header__button_text">Выход</Link>
                </button>
            </Route>
        </header>
    );
    }
  export default Header;