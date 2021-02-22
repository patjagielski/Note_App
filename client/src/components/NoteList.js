import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Note from './Note';
import {getDashbaord, createNewNote, deleteNote, editNote} from '../action/dashboard';
import selectNotes from '../selector/notes';



const NoteList = ({getDashbaord, createNewNote, deleteNote, editNote, notes}) => {
    const [note, setNote] = useState("");
    const [noteVersion, setVersion] = useState(0);
    const [noteTitle, setTitle] = useState();
    const [noteContent, setContent] = useState();
    const [noteId, setId] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function fetchData() {
          const result = await getDashbaord(); 
          setNote(result);
      }
      fetchData();
    }, [note]);
    
    const handleOnClick= async()=>{
      const date =moment().format('YYYY-MM-DD, HH:mm:ss');
      console.log(date)
      await createNewNote(date);
    }
    const customDelete = async (idnotes) =>{
        await deleteNote(idnotes);
    }

    const customEdit = (idnotes,version, title, content) =>{
        setId(idnotes);
        setVersion(version+1);
        setTitle(title);
        setContent(content);
        handleShow();
    }

    const handleSave = async () =>{
        await editNote(noteId, noteVersion, noteTitle, noteContent,)
        handleClose();
        await getDashbaord();
    }
      // console.log(notes);
    return(
        <div>
            <div>
                <Button onClick={(e)=>{
                    handleOnClick(e);
                }}>Create New Note</Button>
            </div>
            {note.length > 0 ? (
              note.map((val)=>{
                    return(<div>
                            <Note customEdit={customEdit} customDelete={customDelete} key={val.idnotes} {...val}/>
                        </div>)
                })
            ):("")}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header  closeButton>
              <input onChange={(e)=>{setTitle(e.target.value)}} placeholder={noteTitle}></input>
            </Modal.Header>
            <input  onChange={(e)=>{setContent(e.target.value)}} placeholder={noteContent}></input>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleSave} variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
}
const mapDispatchToProps = (dispatch) =>({
    getDashbaord: ()=>dispatch(getDashbaord()),
    createNewNote: (date)=>dispatch(createNewNote(date)),
    deleteNote: (idnotes)=>dispatch(deleteNote(idnotes)),
    editNote:(idnotes,version, title, content)=>dispatch(editNote(idnotes,version, title, content))
  })
  const mapStateToProps  = async (state) => await({
    notes: selectNotes(state.dashboardReducer.dashboardInfo, state.filterReducer.sortBy),
  })
export default connect(mapStateToProps, mapDispatchToProps)(NoteList);