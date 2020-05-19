import {FETCH_TERMINALS, SINGLE_VENDOR, BULK_TERMINAL, DELETE_TERMINAL, TOTAL_TERMINALS, SINGLE_TERMINAL, SHOW_TERMINAL, ISSUES} from './types'
import axios from 'axios'
const token=sessionStorage.getItem('token')
export const terminals = (token) => dispatch =>  {
    axios.get(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type : FETCH_TERMINALS,
            payload: res.data.result
        })
    })
    
};


export const showTerminal = (token,id) => dispatch => {
    console.log(id)
    axios.get(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/${id}`,{
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

export const singleTerminal = (token, data) => dispatch =>  {
    axios.post(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/single`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type : SINGLE_TERMINAL,
            payload: res.data.result
        })
    })
    
};

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


export const deleteTerminal = (token, id) => dispatch => {
    axios.delete(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/${id}`, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).
    then((res) => {
        console.log(res.data.result)
        dispatch({
            type: DELETE_TERMINAL,
            payload: res.data
        })
    })
}


export const singleVendor = (token,id) => dispatch => {
    console.log('calling action')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SINGLE_VENDOR,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}


export const singleIssue = (token,id) => dispatch => {
    console.log('calling action')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/issue/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: ISSUES,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}