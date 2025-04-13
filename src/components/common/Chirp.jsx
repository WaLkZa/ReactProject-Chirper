import React from "react";
import { Link } from "react-router-dom";
import dateConvertor from './../utils/dateConvertor';
import authService from "../utils/services/authService";


// po stariq nachin taka se dostupva vnimawai !!! props.props.user.id
const Chirp = ({ props: { user, id, isAuthor, dateCreated, content } }) => {
    const canModify = isAuthor || authService.isAdmin();

    return (
        <div className="card-body border-bottom">
            <article className="mb-3">
                <div className="d-flex justify-content-between">
                    <Link to={`/feed/${user.id}`} className="chirp-author">{user.name}</Link>
                    <span className="chirp-time">
                        {canModify && (
                            <>
                                <Link to={`/editChirp/${id}`}><i class="bi bi-pencil-fill"></i></Link>
                                {' '}
                                <Link to={`/deleteChirp/${id}`}><i class="bi bi-trash3-fill"></i></Link>
                                {' '}
                            </>
                        )}
                        {dateConvertor(dateCreated)}
                    </span>
                </div>
                <p className="mb-0">{content}</p>
            </article>
        </div>
    );
};

export default Chirp;