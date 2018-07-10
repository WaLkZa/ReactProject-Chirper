import { Component } from 'react'
import usersService from '../utils/services/usersService';

class UnfollowUser extends Component {
    componentDidMount() {
        let username = this.props.match.params.username.substr(1);
        let userId = sessionStorage.getItem('userId');
        let newSubArr = JSON.parse(sessionStorage.getItem('subscriptions')).splice(0);
        let indexOfEl = newSubArr.indexOf(username);
        newSubArr.splice(indexOfEl, 1);

        this.setState({username: username})

        usersService.modifyUser(userId, newSubArr)
            .then(() => {
                //notify.showInfo(`Unsubscribed to ${username}`);
                sessionStorage.setItem('subscriptions', JSON.stringify(newSubArr));
                this.props.history.push(`/feed/:${username}`)
            })//.catch(notify.handleError);
    }

    render() {
        return (
            // <Redirect to={`/feed/:${this.state.username}`} />
            null
        )
    }
}

export default UnfollowUser