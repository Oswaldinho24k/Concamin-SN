import firebase from '../../firebase';

const db = firebase.database().ref("dev").child("users");

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

function getUserSuccess(user){
    return {
        type:GET_USER_SUCCESS,
        user
    }
}

export const getUser = (userId) => (dispatch, getState) => {
    const user = getState().users.object[userId];
    if(user !== undefined) return;
    db.child(userId).on("value", snap=>{
       //let user = snap.val();
        dispatch(getUserSuccess(snap.val()));
    });
};