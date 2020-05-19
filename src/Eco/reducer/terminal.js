import {FETCH_TERMINALS, TOTAL_TERMINALS,SHOW_TERMINAL, SINGLE_TERMINAL, SINGLE_INCIDENT, INCIDENT} from '../action/types'
const initialState = {
    terminals: [],
    singleTerminal: {},
    totalTerminals: [],
    single: {},
    incident: {}
}


export default function(state = initialState, action){
    switch(action.type){
        case INCIDENT:
            console.log('reducer connected')
            return{
                ...state,
                incident: action.payload
            }
        case SHOW_TERMINAL:
            return{
                ...state,
                singleTerminal: action.payload
            }
        case SINGLE_INCIDENT:
            // alert('got it from action')
            return{
                single: action.payload
            }
        // case SINGLE_TERMINAL:
        //     return{
        //         ...state,
        //         single: action.payload
        //     }

        default:
            return state;

    }
}