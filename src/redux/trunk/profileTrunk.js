import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, updateProfileField } from "../slices/profileSlice";

const API_URL = `http://yume:3004/api/profile`

export const fetchProfile = ()=> async (dispatch)=>{
    dispatch(fetchProfileStart());

    try{
        const respones = await  fetch(`${API_URL}/@me` , {
            headers :{
                'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })

        if(!respones.ok){
            throw new Error('Failed to fetch profile')
        }
        const data = await respones.json();
        console.log(data)
        dispatch(fetchProfileSuccess(data))
    }
    catch(error){
        dispatch(fetchProfileFailure(error.message))
    }
}