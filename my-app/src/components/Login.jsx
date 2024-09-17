import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link, useNavigate } from 'react-router-dom'
import img from '../img/img.png'
import { tailChase } from 'ldrs'

function Login({ setToken }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [loginError, setLoginError] = useState(""); 

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        tailChase.register();  
    }, []);

    const handleChange = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: ""
        }));

        setLoginError(""); 
    }

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            formIsValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });
            if (error) {
                if (error.message === "Invalid login credentials") {
                    setLoginError("Invalid login credentials"); 
                }
                throw error;
            }
            setToken(data);
            navigate('/homepage');
        } catch (error) {
            console.error(error.message); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-container'>
            <div className='login'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1>Welcome Back</h1>
                    <label>Email address</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Enter your email'
                        onChange={handleChange}
                        value={formData.email} />
                    {errors.email && <div className='error-msg'>{errors.email}</div>}

                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter your password'
                        onChange={handleChange}
                        value={formData.password}
                    />
                    {errors.password && <div className='error-msg'>{errors.password}</div>}
                    {loginError && <div className='error-msg'>{loginError}</div>} 

                    <br />
                    <button type='submit' disabled={loading}>
                        {loading ? <l-tail-chase size="25" speed="1.75" color="white"></l-tail-chase> : 'Login'}
                    </button>
                    <span style={{ display: 'block', textAlign: 'center' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'green', textDecoration: 'none' }}>Sign Up</Link>
                    </span>
                </form>
                <div className='img-container'>
                    <img src={img} alt="nature" />
                </div>
            </div>
        </div>
    )
}

export default Login;
