import React from "react";
import { Link } from "react-router-dom";
import dateConvertor from './../utils/dateConvertor';
import authService from "../utils/services/authService";


// po stariq nachin taka se dostupva vnimawai !!! props.props.user.id
const Chirp = ({ props: { user, id, isAuthor, dateCreated, content } }) => {
    const canModify = isAuthor || authService.isAdmin();

    return (
        <article className="chirp">
            <div className="titlebar">
                <Link to={`/feed/${user.id}`} className="chirp-author">{user.name}</Link>
                <span className="chirp-time">
                    {canModify && (
                        <>
                            <Link to={`/editChirp/${id}`}>edit</Link>
                            {' '}
                            <Link to={`/deleteChirp/${id}`}>delete</Link>
                            {' '}
                        </>
                    )}
                    {dateConvertor(dateCreated)}
                </span>
            </div>
            <p>{content}</p>
        </article>
    );
};

export default Chirp;