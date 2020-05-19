// import {FETCH_POSTS, NEW_POST, LSAPP} from '../action/types'
const initialState = {
    items: [],
    item: {},
    lsapp: [],
    
}

export default function(state= initialState, action){
    switch(action.type){
        // case FETCH_POSTS : 
        // return{
        //     ...state,
        //     items: action.payload
        // }
        // case LSAPP:
        //     return{
        //         ...state,
        //         lsapp: action.payload
        //     }

        // case NEW_POST:
        //     return{
        //         ...state,
        //         item: action.payload
        //     }

        default : 
        return state;
    }

}