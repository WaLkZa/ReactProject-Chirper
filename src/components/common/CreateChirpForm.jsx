import React, { useState } from 'react';
import chirpsService from '../utils/services/chirpsService';
import { toast } from 'react-toastify';

const CreateChirpForm = ({ onChirpCreated }) => {
    const [text, setText] = useState('');

    const onChangeHandler = (ev) => {
        setText(ev.target.value);
    };

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();

        const author = localStorage.getItem('userId');

        if (text.length === 0) {
            toast.warn("Chirp text cannot be empty!", {
                position: 'top-right'
            });
            return;
        }

        if (text.length > 150) {
            toast.warn("Chirp text cannot be longer than 150 characters!", {
                position: 'top-right'
            });
            return;
        }

        try {
            await chirpsService.createChirp(author, text);
            toast.info("Chirp published.", {
                position: 'top-right'
            });
            setText(''); // Clear the form after successful submission
            if (onChirpCreated) {
                onChirpCreated();
            }
        } catch (error) {
            toast.error(error?.response?.data?.description || 'Failed to publish chirp', {
                position: 'top-right'
            });
        }
    };

    return (
        <form id="formSubmitChirp" className="chirp-form" onSubmit={onSubmitHandler}>
            <textarea 
                name="text" 
                className="chirp-input"
                value={text}
                onChange={onChangeHandler}
                placeholder="What's on your mind?"
                maxLength={150}
            />
            {/* <textarea name="text" className="chirp-input" onChange={onChangeHandler}></textarea> */}
            <input className="chirp-submit" id="btnSubmitChirp" value="Create" type="submit" />
        </form>
    );
};

export default CreateChirpForm;