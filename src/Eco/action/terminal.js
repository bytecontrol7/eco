import {FETCH_TERMINALS, SINGLE_TERMINAL, BULK_TERMINAL, DELETE_TERMINAL, TOTAL_TERMINALS,INCIDENT, SHOW_TERMINAL, SINGLE_INCIDENT} from './types'
import axios from 'axios'
const token=sessionStorage.getItem('token')
// export const terminals = (token) => dispatch =>  {
//     axios.get(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal`,{
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).
//     then((res)=> {
//         dispatch({
//             type : FETCH_TERMINALS,
//             payload: res.data.result
//         })
//     })
    
// };


export const showTerminal = (token,id) => dispatch => {

    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/atmterminal/single/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SHOW_TERMINAL,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}

export const showIncident = (token,id) => dispatch => {
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/single/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SINGLE_INCIDENT,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}


export const incident = (token,id) => dispatch => {
    console.log('recieving babame')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/single/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: INCIDENT,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}

// export const singleTerminal = (token, data) => dispatch =>  {
//     axios.post(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/single`,data,{
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }).
//     then((res)=> {
//         dispatch({
//             type : SINGLE_TERMINAL,
//             payload: res.data.result
//         })
//     })
    
// };

// export const bulkTerminal = () => dispatch =>  {
//     axios.post(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/bulk`).
//     then((res)=> {
//         console.log(res.data)
//         dispatch({
//             type : BULK_TERMINAL,
//             payload: res.data.result
//         })
//     })
    
// };


// export const updateTerminal = (token,id) => dispatch => {
//     console.log(id)
//     axios.get(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/${id}`,{
//         headers:{
//             Authorization : `Bearer ${token}`
//         }
//     }).
//     then((res)=> {
//         dispatch({
//             type: UPDATE_TERMINAL,
//             payload: res.data.result
//         })
//     }).
//     catch((err) => {
//         console.log(err)
//     })
// }


// export const deleteTerminal = (token, id) => dispatch => {
//     axios.delete(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/${id}`, {
//         headers: {
//             Authorization : `Bearer ${token}`
//         }
//     }).
//     then((res) => {
//         console.log(res.data.result)
//         dispatch({
//             type: DELETE_TERMINAL,
//             payload: res.data
//         })
//     })
// }