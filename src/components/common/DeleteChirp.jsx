import { Component } from 'react'
import chirpsService from '../utils/services/chirpsService'
import { toast } from 'react-toastify'
import authService from '../utils/services/authService';


class DeleteChirp extends Component {
    componentDidMount() {
        let chirpId = this.props.match.params.id.substr(1)

        chirpsService.deleteChirp(chirpId)
            .then(() => {
                toast.info("Chirp deleted.", {
                    position: toast.POSITION.TOP_RIGHT
                })
                
                if (!authService.isAdmin()) {
                    this.props.history.push(`/profile`)
                }
            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    render() {
        return null
    }
}

export default DeleteChirp