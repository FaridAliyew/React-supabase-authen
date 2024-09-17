import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import img from '../img/img.png'
import { tailChase } from 'ldrs'

function SignUp() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

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
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName
                    }
                }
            })
            if (error) throw error;
            alert("Check your email for verification link");
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='signup-container'>
            <div className='signup'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name='fullName'
                        placeholder='Full Name'
                        onChange={handleChange} />
                    <label>Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email' onChange={handleChange} />
                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password' onChange={handleChange} /> <br />
                    <button type='submit' disabled={loading}>
                        {loading ? <l-tail-chase size="25" speed="1.75" color="white"></l-tail-chase> : 'Sign Up'}
                    </button> <br />
                    <span style={{ display: 'block', textAlign: 'center' }}>
                        Already have an account? <Link to="/" style={{ color: 'green', textDecoration: 'none' }}>Login</Link>
                    </span>
                </form>
                <div className='img-container'>
                    <img src={img} width={450} alt="signup" />
                </div>
            </div>
        </div>
    )
}

export default SignUp;
