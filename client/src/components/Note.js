import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';



const Note = ({idnotes, version, title, date_created, last_modified, content}) =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
        <div>
            <ListGroup>
                <ListGroup.Item><Button variant="dark" onClick={handleShow}>
                    Title: {title} Date Created:{date_created} Date Modified: {last_modified}
                    </Button></ListGroup.Item>
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
//   getDashbaord: ()=>dispatch(getDashbaord())
// })
export default connect(undefined, undefined)(Note);