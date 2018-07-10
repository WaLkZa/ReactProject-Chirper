import React, { Component } from 'react';
import chirpsService from '../utils/services/chirpsService';

class CreateChirpForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
        }
    }

    handleChange = (ev) => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()

        let text = this.state.text
        let author = localStorage.getItem('username');

        //TODO

        if (text.length === 0) {

            //alert('Chirp text cannot be empty!');
            return;
        }

        // if (text.length > 150) {

        //     alert('Chirp text cannot be longer than 150 characters!');
        //     return;
        // }

        chirpsService.createChirp(text, author)
            .then(() => {

                //TODO
                console.log('Chirp published.');
                //console.log(this.props.history)

            }).catch(/*notify.handleError*/);
    }

    render() {
        return (
            <form id="formSubmitChirp" className="chirp-form" onClick={this.handleSubmit}>
                <textarea name="text" className="chirp-input" onChange={this.handleChange}></textarea>
                <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit" />
            </form>
        )
    }
}

export default CreateChirpForm