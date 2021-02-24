import React from 'react';
import { Link } from 'react-router-dom';

function SignUp(props) {
    return (
        <>
            <Link to='/'>Home</Link>
            <h1>Sign Up</h1>
            <p>
                Alredy have an account? <Link to='/log-in'>Log in!</Link>
            </p>
        </>
    );
}

export default SignUp;