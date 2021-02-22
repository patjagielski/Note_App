export default(state={}, action)=>{
    switch(action.type){
        case 'SET_DASHBOARD':
            return{
                dashboardInfo: action.dashboardInfo
            }
        case 'REMOVE_NOTE':
            return state.dashboardInfo.filter((val)=> val !== action.idnotes)
        default:
            return state;
    }
}