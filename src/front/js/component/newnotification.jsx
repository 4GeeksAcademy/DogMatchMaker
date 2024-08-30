import React, { useContext, useEffect, useState } from "react";
import "../../styles/notiboxes.css";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewNotification = ({ data, getMatches, matchInfo, setMatchInfo }) => {
    const { store } = useContext(Context);
    const [show, setShow] = useState(false);

    // Function to handle fetching matches
    const fetchMatches = async () => {
        setMatchInfo(null);
        try {
            await getMatches();
        } catch (error) {
            console.error('Failed to fetch matches', error);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, [matchInfo]); // Re-run fetchMatches when matchInfo changes

    const handleClose = () => {
        setShow(false);
        deleteLike(data);
    };

    const handleShow = () => setShow(true);

    const deleteLike = async (data) => {
        const backend = process.env.BACKEND_URL;
        const url = 'api/like';
        const opts = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.token}`
            },
            body: JSON.stringify({
                current_user_id: store.user,
                liked_user: data.user_id,
            })
        };

        try {
            const resp = await fetch(backend + url, opts);
            if (resp.ok) {
                console.log("You removed your like for this user");
                const result = await resp.json();
                console.log("Unmatched");
                console.log(result.message); // Success message from the server

                // Fetch the updated list of matches after removing the like
                await fetchMatches();
            } else {
                throw new Error('Error');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notis-container container col-10 row">
            <div className="col-10">
                <h5 className="m-1">New Match!</h5>
                <h6 className="m-1">{data.dog_name} & {data.owner_name}</h6>
            </div>
            <div className="col-2 noti-box-icon">
                <i onClick={handleShow} className="noti-icon fa-solid fa-heart-crack"></i>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Unmatch? <i className="fa-solid fa-heart-crack" style={{ color: 'red' }}></i></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '20px' }}>Are you sure you want to unmatch with {data.dog_name} & {data.owner_name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nevermind
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yes...
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewNotification;
