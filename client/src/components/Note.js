import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';



const Note = ({customEdit, customDelete, idnotes, version, title, date_created, last_modified, content }) =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnClick = (e) => {
      e.preventDefault();
      customDelete(idnotes)
    }
    
    const handleEdit = (e)=>{
      e.preventDefault();
      customEdit(idnotes,version, title, content, last_modified)
      
    }

    return(
        <div>
            <ListGroup>
                <ListGroup.Item><Button variant="dark" onClick={handleShow}>
                    Title: {title} Date Created:{date_created} Date Modified: {last_modified} Date Created: {date_created}
                    </Button>
                    <Button onClick={handleEdit} variant="success">Edit</Button>
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

// const mapDispatchToProps = (dispatch) =>({
//   deleteNote: ()=>dispatch(deleteNote())
// })
export default connect(undefined, undefined)(Note);