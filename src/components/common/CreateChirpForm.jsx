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
            setText('');
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
        <div className="card-body">
            <form id="formSubmitChirpMy" onSubmit={onSubmitHandler}>
                <textarea name="text" className="form-control mb-2 chirp-input" rows="3" value={text}  onChange={onChangeHandler} placeholder="What's on your mind?" maxLength={150}></textarea>
                <input id="btnSubmitChirpMy" value="Create" type="submit" className="btn btn-primary float-end" />
            </form>
        </div>
    );
};

export default CreateChirpForm;