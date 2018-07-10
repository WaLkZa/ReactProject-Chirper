import React, { Component } from "react"
import Chirp from './Chirp';

class ChirpsList extends Component {
    render() {
        if (this.props.chirps.length) {
            return (
                <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                    {this.props.chirps.map(chirp => {
                        return <Chirp key={chirp._id} props={chirp} />
                    })}
                </div>
            )
        } else {
            return (
                <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                    No chirps in database.
                </div>
            )
        }
    }
}

export default ChirpsList