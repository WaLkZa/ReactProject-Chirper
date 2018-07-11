import React, { Component } from 'react'
import chirpsService from '../utils/services/chirpsService'
import { toast } from 'react-toastify'

class CreateChirpForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
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

        let text = this.state.text
        let author = localStorage.getItem('username')

        if (text.length === 0) {
            toast.warn("Chirp text cannot be empty!", {
                position: toast.POSITION.TOP_RIGHT
            })
            
            return
        }

        if (text.length > 150) {
            toast.warn("Chirp text cannot be longer than 150 characters!", {
                position: toast.POSITION.TOP_RIGHT
            })
            
            return
        }

        chirpsService.createChirp(text, author)
            .then(() => {
                toast.info("Chirp published.", {
                    position: toast.POSITION.TOP_RIGHT
                })

            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    render() {
        return (
            <form id="formSubmitChirp" className="chirp-form" onSubmit={this.onSubmitHandler}>
                <textarea name="text" className="chirp-input" onChange={this.onChangeHandler}></textarea>
                <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit" />
            </form>
        )
    }
}

export default CreateChirpForm