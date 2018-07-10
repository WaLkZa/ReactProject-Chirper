import { Component } from 'react'
import usersService from '../utils/services/usersService';

class UnfollowUser extends Component {
    componentDidMount() {
        let username = this.props.match.params.username.substr(1);
        let userId = localStorage.getItem('userId');
        let newSubArr = JSON.parse(localStorage.getItem('subscriptions')).splice(0);
        let indexOfEl = newSubArr.indexOf(username);
        newSubArr.splice(indexOfEl, 1);

        this.setState({username: username})

        usersService.modifyUser(userId, newSubArr)
            .then(() => {
                //notify.showInfo(`Unsubscribed to ${username}`);
                localStorage.setItem('subscriptions', JSON.stringify(newSubArr));
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