import {FETCH_TERMINALS, TOTAL_TERMINALS,SHOW_TERMINAL, SINGLE_TERMINAL, SINGLE_VENDOR, ISSUES} from '../action/types'
const initialState = {
    vendors: [],
    singleVendor: {},
    issue: {}
   
}
export default function(state = initialState, action){
    console.log('reducer connected')
    switch(action.type){
        // case FETCH_TERMINALS:
        //     return{
        //         ...state,
        //         terminals: action.payload
        //     }
        // case SHOW_TERMINAL:
        //     return{
        //         ...state,
        //         singleTerminal: action.payload
        //     }
        case ISSUES:
            return{
                issue: action.payload
            }
        case SINGLE_VENDOR:
            return{
                ...state,
                singleVendor: action.payload
            }

        default:
            return state;

    }
}