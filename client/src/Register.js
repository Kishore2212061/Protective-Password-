import React, { useState } from 'react';
import axios from './api'; 

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fixedValue, setFixedValue] = useState('');
    const [trigFunction, setTrigFunction] = useState('sin');
    const [keyValue1, setKeyValue1] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/auth/register', {
                username,
                password,
                fixedValue: parseFloat(fixedValue),
                trigFunction,
                keyValue1: parseFloat(keyValue1),
            });
            alert('Registration successful!');
            // Reset the form fields
            setUsername('');
            setPassword('');
            setFixedValue('');
            setTrigFunction('sin');
            setKeyValue1('');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed: ' + (error.response ? error.response.data.error : 'An unexpected error occurred'));
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '300px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#218838',
        },
        loadingButton: {
            backgroundColor: '#6c757d',
            cursor: 'not-allowed',
            
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    required
                />
               
                <input
                    type="number"
                    value={fixedValue}
                    onChange={(e) => setFixedValue(e.target.value)}
                    placeholder="Fixed Value"
                    style={styles.input}
                    required
                />
                <select
                    value={trigFunction}
                    onChange={(e) => setTrigFunction(e.target.value)}
                    style={styles.input}
                >
                    <option value="sin">Sin</option>
                    <option value="cos">Cos</option>
                    <option value="tan">Tan</option>
                </select>
                <input
                    type="number"
                    value={keyValue1}
                    onChange={(e) => setKeyValue1(e.target.value)}
                    placeholder="Key Value 1"
                    style={styles.input}
                    required
                />
                <button 
                    type="submit" 
                    style={loading ? { ...styles.button, ...styles.loadingButton } : styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = loading ? styles.loadingButton.backgroundColor : styles.button.backgroundColor}
                    disabled={loading} 
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Register;
