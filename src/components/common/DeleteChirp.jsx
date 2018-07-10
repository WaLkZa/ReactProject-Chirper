import { Component } from 'react'
import chirpsService from '../utils/services/chirpsService';

class DeleteChirp extends Component {
    componentDidMount() {
        let chirpId = this.props.match.params.id.substr(1)

        chirpsService.deleteChirp(chirpId)
            .then(() => {
                //notify.showInfo('Chirp deleted.');
                this.props.history.push(`/profile`)
            })//.catch(notify.handleError);
    }

    render() {
        return null
    }
}

export default DeleteChirp