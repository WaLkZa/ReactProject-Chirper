import React, { Component } from 'react'
import authService from '../utils/services/authService'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

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
                authService.saveSession(userInfo)

                toast.success("Registration successful. You are now logged in!", {
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
            <form className="form chirps" id="formRegister" onSubmit={this.onSubmitHandler}>
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