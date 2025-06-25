import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {serverEndpoint} from "../config"
import { useDispatch } from "react-redux";
import { CLEAR_USER } from "../redux/user/actions";

// function Logout({updateUserDetails}){  aging remove props frpm here
function Logout(){
    
const navigate = useNavigate();
 const dispatch = useDispatch();   // using dispatch here instead of props 
const handleLogout = async ()=>{
 try {
     await axios.post(`${serverEndpoint}/auth/logout`, {}, {
         withCredentials: true // this is important to send cookies with the request
     });
    //  updateUserDetails(null); // Clear user state...........here as well use REDUX dispatch
     dispatch({
           type: CLEAR_USER,
           
        });

 }catch (error) {
     console.error('Logout faicled:', error);
     navigate('/error')
 }
};
    useEffect(() => {
        handleLogout();
    }, []);

}
export default Logout;