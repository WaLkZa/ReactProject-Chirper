import React, { useState, useRef, useEffect } from 'react';
import chirpsService from '../utils/services/chirpsService';
import { toast } from 'react-toastify';

const CreateChirpForm = ({ onChirpCreated }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

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
    }, []);

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64Image = canvas.toDataURL('image/png');
        setImage(base64Image);
    };

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
            await chirpsService.createChirp(author, text, image);
            toast.info("Chirp published.", {
                position: 'top-right'
            });
            setText('');
            setImage(null);
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
                <button
                    className="btn btn-outline-primary mb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cameraCollapse"
                    aria-expanded="false"
                    aria-controls="cameraCollapse"
                >
                    📷 Add photo
                </button>

                <div className="collapse mb-3" id="cameraCollapse">
                    <button type="button" className="btn btn-secondary mb-2" onClick={captureImage}>
                        📸 Shoot
                    </button>
                    <div className="embed-responsive embed-responsive-16by9">
                        <video ref={videoRef} autoPlay className="img-fluid mb-2" />
                    </div>

                    {image && (
                        <>
                            <img
                                src={image}
                                alt="Preview"
                                className='img-fluid mb-2'
                            />
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => setImage(null)}
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
                    value={text}
                    onChange={onChangeHandler}
                    placeholder="What's on your mind?"
                    maxLength={150}
                ></textarea>

                <input id="btnSubmitChirpMy" value="Create" type="submit" className="btn btn-primary float-end" />
            </form>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CreateChirpForm;