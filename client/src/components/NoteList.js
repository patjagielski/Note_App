import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Note from './Note';
import {getDashbaord} from '../action/dashboard';

const NoteList = ({getDashbaord}) => {
    const [note, setNote] = useState("");

    useEffect(() => {
        async function fetchData() {
          const result = await getDashbaord(); 
          setNote(result);
      }
      fetchData();
    }, []);
    return(
        <div>
            {note.length > 0 ? (
                note.map((val)=>{
                    return(<div>
                            <Note key={val.idnotes} {...val}/>
                        </div>)
                })
            ):("")}
            
        </div>
    )
}
const mapDispatchToProps = (dispatch) =>({
    getDashbaord: ()=>dispatch(getDashbaord())
  })
export default connect(undefined, mapDispatchToProps)(NoteList);