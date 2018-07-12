import React, { Component } from 'react'
import authService from '../utils/services/authService'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import chirpsService from '../utils/services/chirpsService';

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
                authService.saveSession(userInfo)

                toast.success("Login successful.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })

                this.props.history.push('/feed')
            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    render() {
        return (
            <div>
                <form id="formLogin" className="form" onSubmit={this.onSubmitHandler}>
                    <label>Username</label>
                    <input name="username" onChange={this.onChangeHandler} type="text" />
                    <label>Password</label>
                    <input name="password" onChange={this.onChangeHandler} type="password" />
                    <input id="btnLogin" value="Sign In" type="submit" />
                    <Link to="/register">Register</Link>
                </form>
            </div>
        )
    }
}

export default LoginForm