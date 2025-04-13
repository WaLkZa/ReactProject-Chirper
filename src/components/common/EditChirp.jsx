import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import chirpsService from '../utils/services/chirpsService';
import { toast } from 'react-toastify';
import NavMenu from './NavMenu';

const EditChirp = () => {
    const { id } = useParams();
    const [chirpData, setChirpData] = useState({
        id: 0,
        author: '',
        text: ''
    });

    useEffect(() => {
        chirpsService.loadChirpById(id)
            .then((data) => {
                setChirpData({
                    id,
                    author: data.chirp.user.name,
                    text: data.chirp.content
                });
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, [id]);

    const onChangeHandler = (ev) => {
        const { name, value } = ev.target;
        setChirpData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const { text, author } = chirpData;

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

        chirpsService.editChirp(chirpData.id, text)
            .then(() => {
                toast.info("Chirp edited", {
                    position: 'top-right'
                });
            })
            .catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: 'top-right'
                });
            });
    };

    return (
        <div>
            <NavMenu />
            <div className="content">
                <div className="chirper">
                    <h2 className="titlebar">Author: {chirpData.author}</h2>

                    <form id="formSubmitChirp" className="chirp-form" onSubmit={onSubmitHandler}>
                        <textarea
                            name="text"
                            className="chirp-input"
                            value={chirpData.text}
                            onChange={onChangeHandler}
                        />
                        <input
                            className="chirp-submit"
                            id="btnSubmitChirp"
                            value="Edit"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditChirp;