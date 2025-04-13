import React, { useState, useEffect } from "react";
import NavMenu from "../common/NavMenu";
import { toast } from 'react-toastify';
import ChirpsList from "../common/ChirpsList";
import chirpsService from "../utils/services/chirpsService";

const MainAdminPage = () => {
    const [state, setState] = useState({
        title: 'All chirps',
        chirps: []
    });

    useEffect(() => {
        chirpsService.loadAllChirps()
            .then(chirps => {
                setState(prevState => ({
                    ...prevState,
                    chirps
                }));
            })
            .catch((reason) => {
                toast.error(reason.responseJSON.description, {
                    position: 'top-right'
                });
            });
    }, []); // Run once on mount

    return (
        <div>
            <NavMenu />
            <div className="content">
                <ChirpsList {...state} />
            </div>
        </div>
    );
};

export default MainAdminPage;