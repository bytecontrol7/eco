import { LOGIN, REGISTER} from './types';
import axios from 'axios'

export const login = (loginData) => dispatch  => {
    axios.post(`http://127.0.0.1:8000/api/login`, loginData).
    then((res) => {
        console.log(login)
        dispatch({
            type: LOGIN,
            payload: res.data.token
        })
        
        
    }).
    catch((err) => {
        console.log(err)
    })

    
}


export const register = (registerData) => dispatch  => {
    axios.post(` http://127.0.0.1:8000/api/register`, registerData).
    then((res) => {
        console.log(res.data)
        dispatch({
            type: REGISTER,
            payload: res.data.storeUser
        })
    }).
    catch((err) => {
        console.log(err)
    })

    
}
