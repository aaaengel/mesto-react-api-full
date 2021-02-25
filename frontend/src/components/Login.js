import React from 'react';
import { Link, withRouter} from 'react-router-dom';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target; 
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    this.props.handleLogin({email:this.state.email, password: this.state.password})
  }
  
  render(){
    return(
      <div className="login">
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={this.handleSubmit} className="form-auth">
        <input required id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-auth__input" placeholder="Email" />
        <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-auth__input" placeholder="Пароль" />
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>
        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="login__signup-link">Зарегистрироваться</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);