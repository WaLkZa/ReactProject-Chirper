import { Component } from 'react'
import usersService from '../utils/services/usersService'
import { toast } from 'react-toastify'

class FollowUser extends Component {
    componentDidMount() {
        let username = this.props.match.params.username.substr(1)
        let userId = localStorage.getItem('userId')
        
        // Create a copy of arr
        let newSubArr = JSON.parse(localStorage.getItem('subscriptions')).splice(0)
        newSubArr.push(username)

        usersService.modifyUser(userId, newSubArr)
            .then(() => {
                toast.info(`Subscribed to ${username}`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                
                localStorage.setItem('subscriptions', JSON.stringify(newSubArr))
                
                this.props.history.push(`/feed/:${username}`)
            }).catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    render() {
        return (
            // <Redirect to={`/feed/:${this.state.username}`} />
            null
        )
    }
}

export default FollowUser