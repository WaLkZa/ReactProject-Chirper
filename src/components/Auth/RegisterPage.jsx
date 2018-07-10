import React, { Component } from 'react';
import authService from '../utils/services/authService';
import { Link } from 'react-router-dom'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(ev) {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    onSubmitHandler(ev) {
        ev.preventDefault()

        authService.register(this.state.username, this.state.password)
            .then((userInfo) => {
                authService.saveSession(userInfo);

                this.props.history.push('/feed');
            })
    }

    render() {
        return (
            <form className="form" id="formRegister" onSubmit={this.onSubmitHandler}>
                <label>Username</label>
                <input name="username" type="text" onChange={this.onChangeHandler} />
                <label>Password</label>
                <input name="password" type="password" onChange={this.onChangeHandler} />
                <label>Repeat Password</label>
                <input name="repeatPass" type="password" onChange={this.onChangeHandler} />
                <input id="btnRegister" value="Register" type="submit" />
                <Link to="/login">Log in</Link>
            </form>
        )
    }
}

export default LoginForm