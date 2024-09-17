import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage({ token }) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='home-container'>
            <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
            <div className='card-container'>
                {data.map((item) => (
                    <div className='card' key={item.id}>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomePage;
