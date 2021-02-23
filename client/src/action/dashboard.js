import Axios from 'axios';
import moment from 'moment';

export const setDashboard = (dashboardInfo) => ({
    type: 'SET_DASHBOARD',
    dashboardInfo
})

export const removeNote = (idnotes) => ({
    type: 'REMOVE_NOTE',
    idnotes
})


export const getDashbaord = () =>{
    return (dispatch, getState) => {
        return Axios.get("http://localhost:5000/getNotes")
            .then((res)=>{
                dispatch(setDashboard(res.data));
                return res.data;
            })
        }
}

export const createNewNote = (date) => {
    const result = Axios.post("http://localhost:5000/addNotes",{ date_created:date})
                .then((res)=>{
                    return res
                })
        return result ? ("Note has been added"):("error note not added")
}

export const deleteNote = (idnotes) =>{
    return(dispatch, getState)=>{
        return Axios.post("http://localhost:5000/removeNote",{
                        idnotes
                    }).then((res)=>{
                        dispatch(removeNote(idnotes))
                        console.log("note deleted")
                        return res
                    })
    }
}

export const editNote = (idnotes,version, title, content) => {
    return(dispatch, getState)=>{
        return Axios.patch("http://localhost:5000/editNote",{
            idnotes,
            version, 
            title, 
            content
        }).then((res)=>{
            console.log("edited!")
        })
    }
}

export const versionHistory = (idnotes) => {
    return(dispatch, getState)=>{
        console.log(idnotes);
        return Axios.get(`http://localhost:5000/versionHistory?id=${idnotes}`)
        .then((res)=>{
            return res.data;
        })
    }
}