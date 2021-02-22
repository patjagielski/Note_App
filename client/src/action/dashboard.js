import Axios from 'axios';

export const setDashboard = (dashbaordInfo) => ({
    type: 'SET_DASHBOARD',
    dashbaordInfo
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