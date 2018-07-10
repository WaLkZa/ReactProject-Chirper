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

        authService.login(this.state.username, this.state.password)
            .then((userInfo) => {
                authService.saveSession(userInfo);

                //TODO
                //.showInfo('Login successful.');

                this.props.history.push('/feed');
            })
    }

    render() {
        return (
            <form id="formLogin" className="form" onSubmit={this.onSubmitHandler}>
                <label>Username</label>
                <input name="username" onChange={this.onChangeHandler} type="text" />
                <label>Password</label>
                <input name="password" onChange={this.onChangeHandler} type="password" />
                <input id="btnLogin" value="Sign In" type="submit" />
                <Link to="/register">Register</Link>
            </form>
        )
    }
}

export default LoginForm