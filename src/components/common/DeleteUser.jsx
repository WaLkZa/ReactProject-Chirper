import { Component } from 'react'
import { toast } from 'react-toastify'
import usersService from '../utils/services/usersService';

class DeleteUser extends Component {
    componentDidMount() {
        let userId = this.props.match.params.id.substr(1)

        usersService.deleteUser(userId)
            .then(() => {
                toast.info("User deleted.", {
                    position: toast.POSITION.TOP_RIGHT
                })

                this.props.history.push(`/discover`)
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

export default DeleteUser