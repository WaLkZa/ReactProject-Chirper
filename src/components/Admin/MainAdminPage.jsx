import React, { Component } from "react"
import NavMenu from "../common/NavMenu"
import { toast } from 'react-toastify'
import ChirpsList from "../common/ChirpsList";
import chirpsService from "../utils/services/chirpsService";

class MainAdminPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'All chirps',
            chirps: []
        }
    }

    componentDidMount() {
        chirpsService.loadAllChirps()
            .then(chirps => {
                this.setState({ chirps: chirps })
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
                    <ChirpsList {...this.state} />
                </div>
            </div>

        )
    }
}

export default MainAdminPage