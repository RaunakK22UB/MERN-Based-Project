import { useState } from "react";
import axios from "axios";
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';


function Login({updateUserDetails}) {
  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const name = e.target.name;  
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (formData.username.length === 0) {
            isValid = false;
            newErrors.username = "Username is mandatory";
        }

        if (formData.password.length === 0) {
            isValid = false;
            newErrors.password = "Password is mandatory";
        }

        setErrors(newErrors);
        return isValid;
    };
//----------------------------------here we are going to add our server end points  going to use axios to make the api calls
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            //--------------------------------------This code was used to test the login functionality without server
            // if (formData.username === 'admin' && formData.password === 'admin') {
            //     updateUserDetails({
            //         name:'john cena',
            //         email:'john@gmail.com'
            //     });
            //     setMessage('Valid Credentials');
            // } else {
            //     setMessage('Invalid Credentails');
            // }

            // we can use axios by promise and async await , we wil use async await
            const body ={
                username: formData.username,
                password: formData.password 
            };
            const config={
                withCredentials: true // this is important to send cookies with the request  // this telling the browser to include cookies in the request
            };
             try{
                const response = await axios.post('http://localhost:5000/auth/login',body,config); // This make sure that cookies are sent with the request // response varible will contain the response from the server, same response which we have seen in postman
          
             updateUserDetails(response.data.user); // update the user details in the App component
               console.log(response.data);
            }catch(error) {
              console.log(error);
              setErrors({message: 'something went wrong'});
        }
        }
    };

    const handleGoogleSuccess = async (authResponse) =>{

        try{
            const response=await axios.post('http://localhost:5000/auth/google-auth',{
                idToken : authResponse.credential
            },{
                withCredentials: true
            });
            updateUserDetails(response.data.user);
            //  navigate("/dashboard");

        }catch(e){
            console.log(e);
            setErrors({message:"Error processing the google auth, try again"})
        }
                    
    };

    const handleGoogleError = async (error)=>{
        console.log(error);
        setErrors({message: "Error in googl authorization flow, try again"})
    }

    return (
        <div className="container text-center">
            {message && (message)}
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && (errors.username)}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && (errors.password)}
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
            <h1>OR</h1>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError}/>
            </GoogleOAuthProvider>
        </div>
    );
}


export default Login;


//  ----------------------------------------------------------Full Overview: What this app does
// It checks if the user is already logged in.

// If yes ➝ It shows Dashboard.

// If not ➝ It shows Home or Login page.

// It also allows you to log in, and then redirects to Dashboard