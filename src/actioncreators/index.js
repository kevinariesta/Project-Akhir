import axios from 'axios';
import { API_URL_1 } from '../supports/api-url';

export const onLogin = (user) => {
    return(dispatch) => { 
         axios.get(API_URL_1 + '/login', {
             params: {
                 email: user.email,
                 password: user.password
             }
         }).then((user) => {
             dispatch ({ 
                 type: "USER_LOGIN_SUCCESS",
                 payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
             });
         }).catch(err => {
             console.log(err);
             dispatch ({
                 type: "USER_LOGIN_FAIL"
             });
         })
     }
 };

export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    };
}

export const onRegister = (user) => {
    return (dispatch) => {
        axios.post(API_URL_1 + '/register', user)
        .then((res) => {
            alert('Register Success!!');
            // console.log(res);
            dispatch ({ 
                type: "USER_LOGIN_SUCCESS",
                payload: { username: res.data.username, email: res.data.email, error: "" }
            });
        }).catch((err) => {
            alert('Register Error!!');
            console.log(err);
        })     
    }
}

export const keepLogin = (email) => {
    return(dispatch) => { 
         axios.get(API_URL_1 + '/users', {
             params: {
                 email: email,
             }
         }).then(user => {
             dispatch ({ 
                 type: "USER_LOGIN_SUCCESS",
                 payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
             });
         }).catch(err => {
             console.log(err);
             dispatch ({
                 type: "USER_LOGIN_FAIL"
             });
         })
     }
 };