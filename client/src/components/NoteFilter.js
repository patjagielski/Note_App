import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {sortByTitle, sortByModified, sortByCreated} from '../action/filters';

const NoteFilter = ({filters, sortByTitle, sortByModified, sortByCreated}) =>{

    const handleSortChange = (e) => {
        if(e.target.value === 'title'){
            sortByTitle();
        }else if (e.target.value === 'created'){
            sortByCreated();
        }else{
            sortByModified();
        }
    }
    console.log(filters)
    return(
        <div>
            <select className="select" value={filters} 
                onChange={handleSortChange} >
                <option value='title'>Title</option>
                <option value='created'>Created</option>
                <option value='modified'>Modified</option>
            </select>
        </div>
    )
}
const mapDispatchToProps = (dispatch) =>({
    sortByCreated: () => dispatch(sortByCreated()),
    sortByModified: () => dispatch(sortByModified()),
    sortByTitle: () => dispatch(sortByTitle())
  })
const mapStateToProps = (state) =>({
    filters: state.filterReducer.sortBy
})
export default connect(mapStateToProps, mapDispatchToProps)(NoteFilter);