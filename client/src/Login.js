import React, { useState } from 'react';
import axios from './api'; // Ensure this points to your Axios instance

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dynamicPassword, setDynamicPassword] = useState('');
    const [fixedValue, setFixedValue] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [trigFunction, setTrigFunction] = useState('sin');

    const calculateDynamicPassword = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const digitSum = password.split('').reduce((sum, char) => {
            const charCode = char.toLowerCase().charCodeAt(0); // Get the character code
            if (charCode >= 97 && charCode <= 122) { // Check if it's between 'a' (97) and 'z' (122)
                return sum + (charCode - 96); 
            } 
            return sum; 
        }, 0);
        console.log("digit"+digitSum)
        const angle = currentHour + parseFloat(keyValue);
        console.log(angle+"vsf")
        let trigResult;
        switch (trigFunction) {
            case 'sin':
                trigResult = Math.sin(angle);
                break;
            case 'cos':
                trigResult = Math.cos(angle);
                break;
            case 'tan':
                trigResult = Math.tan(angle);
                break;
            default:
                trigResult = Math.sin(angle);
        }
    
        const calculatedPassword = (digitSum * Math.sin(parseFloat(fixedValue)) * trigResult).toFixed(3);
        console.log(calculatedPassword)
        console.log(calculatedPassword)

        console.log(calculatedPassword)

        console.log(calculatedPassword)

        console.log(calculatedPassword)
        console.log(calculatedPassword)

        setDynamicPassword(calculatedPassword); // Set the calculated dynamic password
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Username:', username);
            console.log('Dynamic Password:', dynamicPassword);
            console.log('Key Value:', keyValue);
            const res = await axios.post('/auth/login', {
                username,
                password,
                dynamicPassword: dynamicPassword, 
                keyValue,
            fixedValue,
            trigFunction
            });

            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.error || 'An error occurred'));
        }
    };

    // Inline CSS styles
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
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleLogin}>
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
                <input
                    type="number"
                    value={keyValue}
                    onChange={(e) => setKeyValue(e.target.value)}
                    placeholder="Key Value"
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
                    type="text"
                    value={dynamicPassword}
                    readOnly
                    placeholder="Dynamic Password"
                    style={styles.input}
                />
                <button 
                    type="button" 
                    style={styles.button} 
                    onClick={calculateDynamicPassword}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Calculate Dynamic Password
                </button>
                <button 
                    type="submit" 
                    style={styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
