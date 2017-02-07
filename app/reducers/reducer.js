//将所有reducers 合并

import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialState = {
    isLoadingMore:false,
}

function reducer(state = initialState, action) {
    let newState = state;
    switch (action.type){
        //加载更多
        case types.CHANGE_PRODUCT_LIST_LOADINGMORE:
            newState=Object.assign({},state,{
                isLoadingMore:action.value
            });
            return newState;
        default:
            return state;
    }
}


const rootReducer = combineReducers({ reducer });

export default rootReducer;