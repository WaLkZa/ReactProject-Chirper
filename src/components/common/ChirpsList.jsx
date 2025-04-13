import React from "react";
import Chirp from './Chirp';

const ChirpsList = (props) => {
    if (props.chirps.length) {
        return (
            <div id="chirps" className="chirps">
                <h2 className="titlebar">{props.title}</h2>
                {props.chirps.map(chirp => {
                    return <Chirp key={chirp.id} props={chirp} />
                })}
            </div>
        );
    } else {
        return (
            <div id="chirps" className="chirps">
                <h2 className="titlebar">{props.title}</h2>
                No chirps in database.
            </div>
        );
    }
};

export default ChirpsList;