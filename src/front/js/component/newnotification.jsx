import React, { useContext, useState } from "react";
import "../../styles/notiboxes.css"
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewNotification = ({ data }) => {
    const { store, actions } = useContext(Context)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteLike(data) {
        const backend = process.env.BACKEND_URL;
        const url = '/api/like';
        const opts = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.token}`
            },
            body: JSON.stringify({
                liked_user: data.user_id
            })
        };

        fetch(backend + url, opts)
            .then((resp) => {
                if (resp.ok) {
                    console.log("You removed your like for this user");
                    return resp.json();
                } else {
                    throw new Error('Error');
                }
            })
            .then(data => {
                // Handle the response here if needed
                console.log(data.message); // Success message from the server
            })
            .catch(err => console.error(err));
    }


    return (
        <div className="notis-container container col-10 row">
            <div className="col-10">
                <h5 className="m-1">New Match!</h5>
                <h6 className="m-1">{data.dog_name} & {data.owner_name}</h6>
            </div>
            <div className="col-2 noti-box-icon">
                <i onClick={() => handleShow()} className="noti-icon fa-solid fa-heart-crack"></i>
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
}

export default NewNotification;
/* 
<div className="noti-box-text">
                <h5 className="mb-0 col-8">Matched with</h5>
                <h6>{data.dog_name} & {data.owner_name}</h6>
            </div>
            <div className="break-match-icon col-2">
                <i className="fa-solid fa-heart-crack"></i>
            </div> */