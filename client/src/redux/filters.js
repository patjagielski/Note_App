const filterDefault = {
    sortBy: 'title'
}

export default (state=filterDefault, action) => {
    switch(action.type){
        case 'SORT_BY_TITLE':
            return{
                sortBy: 'title'
            }
        case 'SORT_BY_CREATED':
            return{
                sortBy: 'created'
            }
        case 'SORT_BY_MODIFIED':
            return{
                sortBy: 'modified'
            }
        default:
            return state;
    }
}