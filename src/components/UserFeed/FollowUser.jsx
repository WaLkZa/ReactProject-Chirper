import { Component } from 'react'
import usersService from '../utils/services/usersService';

class FollowUser extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = { username: '' }
    // }

    componentDidMount() {
        let username = this.props.match.params.username.substr(1);
        let userId = localStorage.getItem('userId');
        
        // Create a copy of arr
        let newSubArr = JSON.parse(localStorage.getItem('subscriptions')).splice(0);
        newSubArr.push(username);

        // this.setState({ username: username })

        usersService.modifyUser(userId, newSubArr)
            .then(() => {
                //notify.showInfo(`Subscribed to ${username}`);
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

export default FollowUser