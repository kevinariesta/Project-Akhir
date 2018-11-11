import axios from 'axios';
import { API_URL_1 } from '../supports/api-url';

export const onLogin = (user) => {
    return(dispatch) => { 
         axios.get(API_URL_1 + '/login', {
             params: {
                 email: user.email,
                 password: user.password
             }
         }).then((res) => {
             dispatch ({ 
                 type: "USER_LOGIN_SUCCESS",
                 payload: { username: res.data[0].username, email: res.data[0].email, error: "" }
             });
             dispatch ({
                 type: "COOKIES_CHECKED"
             });
         }).catch((err) => {
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
};

export const cookieChecked = () => {
    return { 
        type: "COOKIES_CHECKED"
    };
};

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
            dispatch ({
                type: "COOKIES_CHECKED"
            });
        }).catch((err) => {
            alert('Register Error!!');
            console.log(err);
        })     
    }
};

export const keepLogin = (email) => {
    return(dispatch) => { 
         axios.get(API_URL_1 + '/keeplogin', {
             params: {
                 email: email
             }
         }).then((res) => {
             dispatch ({ 
                 type: "USER_LOGIN_SUCCESS",
                 payload: { username: res.data[0].username, email: res.data[0].email, error: "" }
             });
             dispatch ({
                 type: "COOKIES_CHECKED"
             });
         }).catch((err) => {
             console.log(err);
             dispatch ({
                 type: "USER_LOGIN_FAIL"
             });
         })
     }
 };

 export const EditUserData = (user) => {
     return (dispatch) => {
        axios.put(API_URL_1 + `/userdata/${user.id}`, user)
        .then((res) => {
            alert('Edit Profile Success');
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: res.data[0].username, email: res.data[0].email, error: "" }
            });
            dispatch ({
                type: "COOKIES_CHECKED"
            });
        })
        .catch((err) => {
            alert('Error Editing Profile');
            console.log(err);
        })
     }
 }