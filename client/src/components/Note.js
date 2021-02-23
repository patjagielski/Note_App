import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


const Note = ({customEdit, customDelete, idnotes, version, title, date_created, last_modified, content, customGetVersion }) =>{
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnClick = (e) => {
      e.preventDefault();
      customDelete(idnotes)
    }
    
    const handleEdit = (e)=>{
      e.preventDefault();
      customEdit(idnotes,version, title, content)
      
    }
    const getVersionHistory = (e) => {
      e.preventDefault();
      customGetVersion(idnotes)
    }

    return(
        <div>
            <ListGroup>
                <ListGroup.Item><Button variant="dark" onClick={handleShow}>
                    Title: {title} Date Created:{date_created} Date Modified: {last_modified}
                    </Button>

                    <Button onClick={handleEdit} variant="success">Edit</Button>
                    <Button onClick={getVersionHistory} variant="dark">Version History</Button>
                    <Button onClick={handleOnClick} variant="danger">X</Button>
                    </ListGroup.Item>
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
}


export default connect(undefined, undefined)(Note);