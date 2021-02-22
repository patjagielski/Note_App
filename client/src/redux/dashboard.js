export default(state={}, action)=>{
    switch(action.type){
        case 'SET_DASHBOARD':
            return{
                dashboardInfo: action.dashboardInfo
            }
        default:
            return state;
    }
}