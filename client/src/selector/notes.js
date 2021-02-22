
export default(notes, sortBy,)=>{
    if(notes){
         notes.sort((a,b)=>{
            if(sortBy === 'created'){
                return a.date_created > b.date_created ? 1 : -1
            }else if(sortBy === 'modified'){
                return a.last_modified > b.last_modified ? 1: -1
            }else if(sortBy === 'title'){
                return a.title.toLowerCase() > b.title.toLowerCase() ? 1: -1
            }
        });
        return notes
    }
    
    // console.log(notes)
    // console.log(sortBy)
}