import React from "react";
import { Link, withRouter} from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
      }
      handleSubmit(e){
        e.preventDefault()
        this.props.handleRegister({password: this.state.password, email: this.state.email})
      }
      render(){
        return (
          <div className="register">
            <p className="register__welcome">
                Регистрация
            </p>
            <form onSubmit={this.handleSubmit} className="form-auth">
              <input  name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-auth__input" placeholder="Email" />
              <input  name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-auth__input" placeholder="Пароль"/>
              <div className="register__button-container">
                <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
              </div>
            </form>
            <div className="register__signin">
              <p>Уже зарегистрированы?</p>
              <Link to="sign-in" className="register__login-link">Войти</Link>
            </div>
            </div>
      );
}
}
export default withRouter(Register);