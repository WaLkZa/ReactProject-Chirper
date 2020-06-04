import React, { Component } from 'react'
import chirpsService from '../utils/services/chirpsService'
import { toast } from 'react-toastify'
import NavMenu from './NavMenu'


class EditChirp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            author: '',
            text: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    componentDidMount() {
        let chirpId = this.props.match.params.id.substr(1)

        chirpsService.loadChirpById(chirpId)
            .then((data) => {
                this.setState({
                    id: chirpId,
                    author: data.chirp.user.name,
                    text: data.chirp.content
                })
            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    onChangeHandler(ev) {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    onSubmitHandler(ev) {
        ev.preventDefault()

        let text = this.state.text
        let author = this.state.author

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

        chirpsService.editChirp(this.state.id, text)
            .then(() => {
                toast.info("Chirp edited", {
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
            <div>
                <NavMenu />
                <div className="content">
                    <div className="chirper">

                        <h2 className="titlebar">Author: {this.state.author}</h2>

                        <form id="formSubmitChirp" className="chirp-form" onSubmit={this.onSubmitHandler}>
                            <textarea name="text" className="chirp-input" value={this.state.text} onChange={this.onChangeHandler}></textarea>
                            <input className="chirp-submit" id="btnSubmitChirp" value="Edit" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditChirp