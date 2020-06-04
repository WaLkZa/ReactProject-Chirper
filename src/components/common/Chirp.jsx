import React from "react"
import { Link } from "react-router-dom"
import dateConvertor from './../utils/dateConvertor'
import authService from "../utils/services/authService";

let Chirp = (props) => {
    return (
        <article className="chirp">
            <div className="titlebar">
                <Link to={`/feed/:${props.props.user.id}`} className="chirp-author">{props.props.user.name}</Link>
                <span className="chirp-time">
                    {props.props.isAuthor || authService.isAdmin() ? <Link to={`/editChirp/:${props.props.id}`}>edit   </Link> : null}

                    {props.props.isAuthor || authService.isAdmin() ? <Link to={`/deleteChirp/:${props.props.id}`}>delete   </Link> : null}
                    
                    {dateConvertor(props.props.dateCreated)}
                </span>
            </div>
            <p>{props.props.content}</p>
        </article>
    )
}

export default Chirp