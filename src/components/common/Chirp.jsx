import React from "react"
import { Link } from "react-router-dom"
import dateConvertor from './../utils/dateConvertor'
import authService from "../utils/services/authService";

let Chirp = (props) => {
    return (
        <article className="chirp">
            <div className="titlebar">
                <Link to={`/feed/:${props.props.author}`} className="chirp-author">{props.props.author}</Link>
                <span className="chirp-time">
                    {props.props.isAuthor || authService.isAdmin() ? <Link to={`/deleteChirp/:${props.props._id}`}>delete</Link> : null}
                    {dateConvertor(props.props._kmd.lmt)}
                </span>
            </div>
            <p>{props.props.text}</p>
        </article>
    )
}

export default Chirp