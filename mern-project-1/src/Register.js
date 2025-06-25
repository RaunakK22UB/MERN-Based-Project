// src/Register.js
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "./config";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.name) newErrors.name = "Name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (validate()) {
            const body = {
                username: formData.username,
                password: formData.password,
                name: formData.name
            };
            try {
                const response = await axios.post(`${serverEndpoint}/auth/register`, body);
                setMessage(response.data.message);
                setFormData({ username: '', password: '', name: '' });
                navigate("/dashboard");
            } catch (error) {
                console.log(error);
                setMessage(`Hey ${formData.name} Registration Failed, Email Id Already Exists!!,Please Tryagain!!`);
            }
        }
    };

    return (
        <div className="container text-center">
            <h1>Register</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
