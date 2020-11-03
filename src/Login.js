import React from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';

function Login() {
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    // use history for the user
    const history= useHistory();

    const signIn = e =>{
        e.preventDefault();
        // implementing sign in using use history
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            history.push('/');
        })
        .catch((err)=> alert(err.message))

    }
    const register = e =>{
        e.preventDefault();
        // firebase
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) =>{
            console.log(auth);

        // use history to redirect to home page after create account
        if(auth){
            history.push('/')
        }
        })
        .catch((err) => alert(err.message) )

    }

    return (
        <div className="login">
            <Link to='/'>
            <img className="login__logo" 
            src='data:image/png;base64,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'/>
            </Link>
        <div className="login__container">
            <h1>Sign In</h1>

            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange={e=> setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" value={password} onChange={ e=> setPassword(e.target.value)
                }/>

                <button  type='submit'onClick={signIn}
                className="login__signinbutton">Sign In</button>
            </form>
            <p>By signing in you are agreeing to Amazon's  FAKE CLONE
                Conditions of use and sale.Please see our terms and conditions please
            </p>
            <button onClick={register}
            className="login__registerbutton">Create your 
            Amazon account</button>
        </div>

        </div>
    )
}

export default Login;
