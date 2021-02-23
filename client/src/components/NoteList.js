import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Note from './Note';
import {getDashbaord, createNewNote, deleteNote, editNote, versionHistory} from '../action/dashboard';
import selectNotes from '../selector/notes';



const NoteList = ({getDashbaord, createNewNote, deleteNote, editNote,versionHistory}) => {
    const [note, setNote] = useState("");
    const [noteVersion, setVersion] = useState(0);
    const [noteTitle, setTitle] = useState();
    const [noteContent, setContent] = useState();
    const [noteId, setId] = useState();
    const [show, setShow] = useState(false);
    const [showVersion, setShowVersion] = useState(false);
    const [versionData, setVersionData] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseVersion = () => setShowVersion(false);
    const handleShowVersion = () => setShowVersion(true);

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

    const customEdit = async (idnotes,version, title, content) =>{
       const res = await versionHistory(idnotes);
        console.log(res);
        setId(idnotes);
        setVersion(version+1);
        setTitle(title);
        setContent(content);
        handleShow();
    }

    const getVersionHistory = async (idnotes)=>{
      const res = await versionHistory(idnotes);
      setVersionData(res);
      console.log(res);
      handleShowVersion();
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
                            <Note customGetVersion={getVersionHistory} customEdit={customEdit} customDelete={customDelete} key={val.idnotes} {...val}/>
                        </div>)
                })
            ):(false)}
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
          <Modal show={showVersion} onHide={handleCloseVersion}>
            <Modal.Header  closeButton>
              Version History
            </Modal.Header>
            <Modal.Body>
            <Table>
            <thead>
                <tr>
                  <th>Note Id</th>
                  <th>Version</th>
                  <th>Action</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Last Modified</th>
                </tr>
            </thead>
            <tbody>
            {versionData.length>0 ?(
              versionData.map((val)=>{
                return(<tr>
                  <td>{val.idnotes}</td> 
                  <td>{val.version}</td> 
                  <td>{val.action_type}</td> 
                  <td>{val.title}</td>
                  <td>{val.content}</td> 
                  <td>{val.last_modified}</td>
                </tr>)
              })
            ):("")}
            </tbody>
            </Table>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
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
    editNote:(idnotes,version, title, content)=>dispatch(editNote(idnotes,version, title, content)),
    versionHistory: (idnotes) => dispatch(versionHistory(idnotes))
  })
  const mapStateToProps  = async (state) => await({
    notes: selectNotes(state.dashboardReducer.dashboardInfo, state.filterReducer.sortBy),
  })
export default connect(mapStateToProps, mapDispatchToProps)(NoteList);