import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import chirpsService from '../utils/services/chirpsService';
import { toast } from 'react-toastify';
import NavMenu from './NavMenu';

const EditChirp = () => {
    const { id } = useParams();
    const [chirpData, setChirpData] = useState({
        id: 0,
        author: '',
        text: '',
        image: null
    });
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error('Camera access error:', err));

        chirpsService.loadChirpById(id)
            .then((data) => {
                setChirpData({
                    id,
                    author: data.chirp.user.name,
                    text: data.chirp.content,
                    image: data.chirp.image || null
                });
            })
            .catch((reason) => {
                toast.error(reason, {
                    position: 'top-right'
                });
            });
    }, [id]);

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64Image = canvas.toDataURL('image/png');
        setChirpData(prev => ({...prev, image: base64Image}));
    };

    const onChangeHandler = (ev) => {
        const { name, value } = ev.target;
        setChirpData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const { text, image } = chirpData;

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

        chirpsService.editChirp(chirpData.id, text, image)
            .then(() => {
                toast.info("Chirp edited", {
                    position: 'top-right'
                });
            })
            .catch((reason) => {
                toast.error(reason.responseJSON?.description || 'Failed to edit chirp', {
                    position: 'top-right'
                });
            });
    };

    return (
        <div>
            <NavMenu />
            <div className="container">
                <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className="mb-0">Author: {chirpData.author}</h5>
                    </div>

                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            <button
                                className="btn btn-outline-primary mb-2"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#cameraCollapse"
                                aria-expanded="false"
                                aria-controls="cameraCollapse"
                            >
                                📷 {chirpData.image ? 'Edit photo' : 'Add photo'}
                            </button>

                            <div className="collapse mb-3" id="cameraCollapse">
                                <button type="button" className="btn btn-secondary mb-2" onClick={captureImage}>
                                    📸 Shoot
                                </button>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <video ref={videoRef} autoPlay className="img-fluid mb-2" />
                                </div>

                                {(chirpData.image) && (
                                    <>
                                        <img
                                            src={chirpData.image}
                                            alt="Preview"
                                            className='img-fluid mb-2'
                                        />
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => setChirpData(prev => ({...prev, image: null}))}
                                            >
                                                🗑 Delete photo
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <textarea
                                name="text"
                                className="form-control mb-2 chirp-input"
                                rows="3"
                                value={chirpData.text}
                                onChange={onChangeHandler}
                                maxLength={150}
                            />
                            
                            <input
                                id="btnSubmitChirpMy"
                                value="Edit"
                                type="submit"
                                className="btn btn-primary float-end"
                            />
                        </form>

                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditChirp;