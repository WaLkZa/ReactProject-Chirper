import React from "react";
import Chirp from './Chirp';

const ChirpsList = (props) => {
    if (props.chirps.length) {
        return (
            <div id="myChirps" className="card">
                <div className="card-header">
                    <h5 className="mb-0">{props.title}</h5>
                </div>

                {props.chirps.map(chirp => {
                    return <Chirp key={chirp.id} props={chirp} />
                })}
            </div>
        );
    } else {
        return (
            <div id="chirps" className="card">
                <div className="card-header">
                    <h5 className="mb-0">{props.title}</h5>
                </div>
                No chirps in database.
            </div>
        );
    }
};

export default ChirpsList;